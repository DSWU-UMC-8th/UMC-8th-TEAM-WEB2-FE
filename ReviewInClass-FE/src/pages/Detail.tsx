import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/common/Banner/Banner";
import LectureReviewFilterBar, {
  type Filters,
} from "../components/LectureReviewFilterBar";
import ReviewCard from "../components/common/ReviewCard";
import RatingSummary from "../components/RatingSummary";
import type { Rates, ResponseLectureRatingDto } from "../types/mainLectures";
import type { Review } from "../types/detailPage";
import { getLectureRating } from "../apis/mainPage";
import { getLectureReviews } from "../apis/detailPage";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const lectureId = Number(id);

  const [filters, setFilters] = useState<Filters>({
    sort: "latest",
    ratingRange: null,
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const [ratingData, setRatingData] = useState<Rates | null>(null);

  const handleSearch = (newFilters: Filters) => {
    setCurrentPage(0); // 새 필터 적용 시 첫 페이지로 초기화
    setFilters({
      sort: newFilters.sort || "latest",
      ratingRange: newFilters.ratingRange,
    });
  };

  // 평점 정보 가져오기
  useEffect(() => {
    if (lectureId) {
      const fetchRating = async () => {
        try {
          const res: ResponseLectureRatingDto = await getLectureRating(
            lectureId
          );
          if (res.isSuccess && res.result) {
            setRatingData(res.result);
          }
        } catch (error) {
          console.error("평점 정보 로딩 실패:", error);
        }
      };

      fetchRating();
    }
  }, [lectureId]);

  // 리뷰 목록 가져오기
  useEffect(() => {
    if (!lectureId) return;

    const fetchReviews = async () => {
      try {
        const { sort, ratingRange } = filters;
        const res = await getLectureReviews(lectureId, {
          sort: sort === "latest" ? "createdAt" : "recommend",
          ratingMin: ratingRange?.[0],
          ratingMax: ratingRange?.[1],
          page: currentPage,
        });

        if (res.isSuccess) {
          setReviews(res.result.reviews);
          setTotalReviews(res.result.totalMatchingReviews);
          setTotalPage(res.result.totalPage);
        }
      } catch (error) {
        console.error("리뷰 목록 로딩 실패:", error);
      }
    };

    fetchReviews();
  }, [filters, lectureId, currentPage]);

  // 페이지 이동 핸들러
  const handlePageClick = (page: number) => {
    if (page >= 0 && page < totalPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Banner />
      <div className="max-w-[995px] mx-auto mt-[137px]">
        <RatingSummary
          average={ratingData?.averageRating ?? 0}
          totalReviews={ratingData?.reviewCount ?? 0}
          distribution={[
            {
              label: "아주 좋아요",
              count: ratingData?.ratingDistribution["5"] ?? 0,
            },
            {
              label: "맘에 들어요",
              count: ratingData?.ratingDistribution["4"] ?? 0,
            },
            {
              label: "보통이에요",
              count: ratingData?.ratingDistribution["3"] ?? 0,
            },
            {
              label: "그냥 그래요",
              count: ratingData?.ratingDistribution["2"] ?? 0,
            },
            {
              label: "별로예요",
              count: ratingData?.ratingDistribution["1"] ?? 0,
            },
          ]}
        />
      </div>

      <div className="px-8 py-6">
        <LectureReviewFilterBar
          onSearch={handleSearch}
          resultCount={totalReviews}
        />

        <div className="space-y-4 mt-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.reviewId}
                rating={review.rating.toString()}
                createdAt={review.createdAt}
                studyPeriod={review.period}
                likeCount={review.likes}
                content={review.content}
                imageUrl={review.imageUrl}
                profileImage={null}
                category={undefined}
                level={undefined}
                teacher={undefined}
              />
            ))
          ) : (
            <p>조건에 맞는 리뷰가 없습니다</p>
          )}
        </div>

        {/* ✅ 페이지네이션 UI */}
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-2 py-1 rounded bg-green-100 disabled:opacity-30"
          >
            {"<"}
          </button>
          {Array.from({ length: totalPage }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`px-3 py-1 rounded ${
                i === currentPage ? "bg-green-300 font-bold" : "bg-green-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage >= totalPage - 1}
            className="px-2 py-1 rounded bg-green-100 disabled:opacity-30"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
