import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../components/common/ReviewCard";
import ReviewFilterBar from "../components/ReviewFilterBar";
import type { Filters } from "../components/ReviewFilterBar";
import MiniBanner from "../components/common/Banner/MiniBanner";
import { LECTURE } from "../data/banner";
import useReviewList from "../hooks/useReviewList";
import useSearchList from "../hooks/useSearchList";
import NoResult from "../components/NoResult";
import { useSearch } from "../context/SearchContext";
import palette from "../styles/theme";
import Loading from "../components/Loading";

const Review = () => {
  const [searchParams] = useSearchParams();
  const sortType = searchParams.get("sort") || "latest";
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState<Filters>({
    category: "",
    level: "",
    period: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const { search } = useSearch();
  const isSearchMode = typeof search === "string" && search.trim() !== "";

const searchResult = useSearchList(currentPage);
const reviewResult = useReviewList(sortType, filters, currentPage);


const {
  data: reviews = [],
  isLoading,
  isError,
} = isSearchMode ? searchResult : reviewResult;

  if (isLoading) return <Loading />;
  if (isError) return <div>에러 발생</div>;
  if (!reviews.length && isSearchMode) return <NoResult />;

  const periodPriority: { [key: string]: number } = {
    "일주일 이내": 1,
    "1달 이내": 2,
    "3달 이내": 3,
    "6달 이내": 4,
    "1년 이내": 5,
    "수강 미완료": 6,
  };

  // 정렬
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === "latest") {
      return order === "desc"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortType === "popular") {
      return order === "desc" ? b.likes - a.likes : a.likes - b.likes;
    }
    return 0;
  });

  // 필터링
  const filteredReviews = sortedReviews.filter((review) => {
    const matchCategory =
      !filters.category || review.category === filters.category;
    const matchLevel = !filters.level || review.level === filters.level;
    const reviewPeriodRank = periodPriority[review.studyPeriod] ?? Infinity;
    const filterPeriodRank = periodPriority[filters.period] ?? Infinity;
    const matchPeriod =
      !filters.period || reviewPeriodRank <= filterPeriodRank;
    return matchCategory && matchLevel && matchPeriod;
  });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const toggleOrder = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="px-8 py-6">
      {!search && <MiniBanner lectures={LECTURE.slice(0, 4)} />}
      {search && (
        <p className="text-center font-semibold text-[25px] leading-[33.66px] tracking-[-0.01em]">
          <span style={{ color: palette.secondary.secondaryDark }}>{search}</span>
          에 대한 {reviews.length}개의 검색 결과가 있습니다.
        </p>
      )}

      <ReviewFilterBar
        onSearch={setFilters}
        sortType={sortType}
        order={order}
        onToggleOrder={toggleOrder}
      />

      <div className="space-y-4">
        {paginatedReviews.map((review) => (
          <ReviewCard
          key={review.reviewId}
          rating={review.rating}
          createdAt={review.createdAt || "날짜 없음"}
          studyPeriod={review.studyPeriod || "기간 정보 없음"}
          likeCount={review.likes}
          content={review.content}
          imageUrl={review.imageUrl}
          profileImage={review.profileImage}
          category={review.category || "카테고리 없음"}
          level={review.level || "레벨 없음"}
          teacher={review.instructorName}
        />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 rounded border"
          style={{
            backgroundColor: currentPage === 1 ? "#E9E9E9" : "#CAE3A5",
            color: currentPage === 1 ? "#B5B5B5" : "#6FA235",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className="px-3 py-1 rounded"
            style={{
              backgroundColor: "#ffffff",
              border:
                page === currentPage
                  ? "1px solid #6FA235"
                  : "1px solid #CAE3A5",
              color: "#6FA235",
              fontWeight: page === currentPage ? "bold" : "normal",
            }}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 rounded border"
          style={{
            backgroundColor: currentPage === totalPages ? "#E9E9E9" : "#CAE3A5",
            color: currentPage === totalPages ? "#B5B5B5" : "#6FA235",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Review;
