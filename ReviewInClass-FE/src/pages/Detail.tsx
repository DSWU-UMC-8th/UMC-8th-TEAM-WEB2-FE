import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/common/Banner/Banner";
import LectureReviewFilterBar, { type Filters } from "../components/LectureReviewFilterBar";
import { dummyReviews } from "../data/dummyReviews";
import ReviewCard from "../components/common/ReviewCard";
import RatingSummary from "../components/RatingSummary";
import type { Rates, ResponseLectureRatingDto } from "../types/mainLectures";
import { getLectureRating } from "../apis/mainPage";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const lectureId = Number(id);

  const [filters, setFilters] = useState<Filters>({
    sort: "latest",
    ratingRange: null,
  });
  const [filteredReviews, setFilteredReviews] = useState(dummyReviews);

  // 평점
  const [ratingData, setRatingData] = useState<Rates | null>(null);

  const handleSearch = (newFilters: Filters) => {
    const sort = newFilters.sort || "latest";
    const ratingRange = newFilters.ratingRange;
    setFilters({ sort, ratingRange });
  };

  useEffect(() => {
    // 리뷰 필터링
    let filtered = [...dummyReviews];

    if (filters.ratingRange !== null) {
      const [min, max] = filters.ratingRange;
      filtered = filtered.filter((r) => {
        const rating = Math.floor(Number(r.rating));
        return rating >= min && rating <= max;
      });
    }

    if (filters.sort === "latest") {
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filters.sort === "recommend") {
      filtered.sort((a, b) => b.likeCount - a.likeCount);
    }

    setFilteredReviews(filtered);
  }, [filters]);

  // 평점 데이터 api
  useEffect(() => {
    if (lectureId) {
      const fetchRating = async () => {
        try {
          const res: ResponseLectureRatingDto = await getLectureRating(lectureId);
          if (res.isSuccess && res.result) {
            setRatingData(res.result);
            console.error("평점 데이터 응답이 성공했습니다", res);
          } else {
            console.error("평점 데이터 응답이 유효하지 않습니다:", res);
          }
        } catch (error) {
          console.error("평점 데이터를 불러오는 데 실패했습니다:", error);
        }
      };

      fetchRating();
    }
  }, [lectureId]);

  return (
    <div>
      <Banner />
      <div className="max-w-[995px] mx-auto mt-[137px]">
        <RatingSummary
          average={ratingData?.averageRating ?? 0}
          totalReviews={ratingData?.reviewCount ?? 0}
          distribution={[
            { label: "아주 좋아요", count: ratingData?.ratingDistribution["5"] ?? 0 },
            { label: "맘에 들어요", count: ratingData?.ratingDistribution["4"] ?? 0 },
            { label: "보통이에요", count: ratingData?.ratingDistribution["3"] ?? 0 },
            { label: "그냥 그래요", count: ratingData?.ratingDistribution["2"] ?? 0 },
            { label: "별로예요", count: ratingData?.ratingDistribution["1"] ?? 0 },
          ]}
        />
      </div>

      <div className="px-8 py-6">
        <LectureReviewFilterBar
          onSearch={handleSearch}
          resultCount={filteredReviews.length}
        />
        <div className="space-y-4 mt-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))
          ) : (
            <p>조건에 맞는 리뷰가 없습니다</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
