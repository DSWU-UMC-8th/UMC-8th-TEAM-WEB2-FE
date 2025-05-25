import React, { useState, useEffect } from "react";
import Banner from "../components/common/Banner/Banner";
import LectureReviewFilterBar, {
  type Filters,
} from "../components/LectureReviewFilterBar";
import { LECTURE } from "../data/banner";
import { dummyReviews } from "../data/dummyReviews";
import ReviewCard from "../components/common/ReviewCard";
import RatingSummary from "../components/RatingSummary";

const Detail = () => {
  const [filters, setFilters] = useState<Filters>({
    sort: "latest",
    ratingRange: null,
  });
  const [filteredReviews, setFilteredReviews] = useState(dummyReviews);

  const handleSearch = (newFilters: Filters) => {
    const sort = newFilters.sort || "latest";
    const ratingRange = newFilters.ratingRange;
    setFilters({ sort, ratingRange });
  };

  useEffect(() => {
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
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filters.sort === "recommend") {
      filtered.sort((a, b) => b.likeCount - a.likeCount);
    }

    setFilteredReviews(filtered);
  }, [filters]);

  return (
    <div>
      <Banner lectures={LECTURE.slice(0, 4)} />
      <div className="max-w-[995px] mx-auto mt-[137px]">
        <RatingSummary
          average={4.25}
          totalReviews={25}
          distribution={[
            { label: "아주 좋아요", count: 23 },
            { label: "맘에 들어요", count: 2 },
            { label: "보통이에요", count: 0 },
            { label: "그냥 그래요", count: 0 },
            { label: "별로예요", count: 0 },
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
