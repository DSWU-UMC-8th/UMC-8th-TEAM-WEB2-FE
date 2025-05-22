import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../components/common/ReviewCard";
import { dummyReviews } from "../data/dummyReviews";
import ReviewFilterBar from "../components/ReviewFilterBar";
import type { Filters } from "../components/ReviewFilterBar";


const Review = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get("sort") || "latest"; // 'latest' 또는 'popular'
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState<Filters>({
    category: "",
    level: "",
    period: "",
  });

  const toggleOrder = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  // 정렬
  const sortedReviews = [...dummyReviews].sort((a, b) => {
    if (sortType === "latest") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === "desc" ? dateB - dateA : dateA - dateB;
    } else if (sortType === "popular") {
      return order === "desc"
        ? b.likeCount - a.likeCount
        : a.likeCount - b.likeCount;
    }
    return 0;
  });

  // 필터링 우선순위 기준
  const periodPriority: { [key: string]: number } = {
    "일주일 이내": 1,
    "1달 이내": 2,
    "3달 이내": 3,
    "6달 이내": 4,
    "1년 이내": 5,
  };

  // 필터링
  const filteredReviews = sortedReviews.filter((review) => {
    const matchCategory =
      !filters.category || review.category === filters.category;

    const matchLevel =
      !filters.level || review.level === filters.level;

    const reviewPeriodRank = periodPriority[review.studyPeriod] ?? Infinity;
    const filterPeriodRank = periodPriority[filters.period] ?? Infinity;

    const matchPeriod =
      !filters.period || reviewPeriodRank <= filterPeriodRank;

    return matchCategory && matchLevel && matchPeriod;
  });

  return (
    <div className="px-8 py-6">
      <ReviewFilterBar onSearch={setFilters} />

      <div className="flex justify-end mb-4">
        <button
          onClick={toggleOrder}
          className="text-sm text-gray-700 flex items-center"
        >
          {sortType === "latest"
            ? order === "desc"
              ? "최신순 🔽"
              : "오래된순 🔼"
            : order === "desc"
            ? "인기순 🔽"
            : "인기 낮은 순 🔼"}
        </button>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
};

export default Review;
