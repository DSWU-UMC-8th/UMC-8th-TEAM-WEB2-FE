import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReviewCard from "../components/common/ReviewCard";
import ReviewFilterBar from "../components/ReviewFilterBar";
import type { Filters } from "../components/ReviewFilterBar";
import MiniBanner from "../components/common/Banner/MiniBanner";
import { LECTURE } from "../data/banner";
import useSearchList from "../hooks/useSearchList";
import NoResult from "../components/NoResult";
import { useSearch } from "../context/SearchContext";
import palette from "../styles/theme";
import Loading from "../components/Loading";

const Review = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get("sort") || "latest"; // 'latest' 또는 'popular'
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState<Filters>({
    category: "",
    level: "",
    period: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const toggleOrder = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  // 검색
  const { data: searchedReview = [], isLoading, isError } = useSearchList(currentPage);
  const { search } = useSearch();

  if (isLoading) return <Loading />;
  if (isError) return <div>에러</div>;
  if (searchedReview.length === 0) return <NoResult />;

  // 정렬
  const sortedReviews = [...searchedReview].sort((a, b) => {
    if (sortType === "latest") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === "desc" ? dateB - dateA : dateA - dateB;
    } else if (sortType === "popular") {
      return order === "desc" ? b.likeCount - a.likeCount : a.likeCount - b.likeCount;
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
    const matchCategory = !filters.category || review.category === filters.category;

    const matchLevel = !filters.level || review.level === filters.level;

    const reviewPeriodRank = periodPriority[review.studyPeriod] ?? Infinity;
    const filterPeriodRank = periodPriority[filters.period] ?? Infinity;

    const matchPeriod = !filters.period || reviewPeriodRank <= filterPeriodRank;

    return matchCategory && matchLevel && matchPeriod;
  });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

  return (
    <div className="px-8 py-6">
      {/* 검색어 유무에 따라 배너 or 메시지 */}
      {!search && <MiniBanner lectures={LECTURE.slice(0, 4)} />}
      {search && (
        <p className="text-center font-semibold text-[25px] leading-[33.66px] tracking-[-0.01em]">
          <span style={{ color: palette.secondary.secondaryDark }}>{search}</span>에 대한 {searchedReview.length}개의 검색 결과가 있습니다.
        </p>
      )}

      {/* 정렬 기능 포함된 필터바 */}
      <ReviewFilterBar onSearch={setFilters} sortType={sortType} order={order} onToggleOrder={toggleOrder} />

      <div className="space-y-4">
        {paginatedReviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {/* 이전 버튼 */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          style={{
            backgroundColor: currentPage === 1 ? "#E9E9E9" : "#CAE3A5", // gray200 or primaryLight
            color: currentPage === 1 ? "#B5B5B5" : "#6FA235", // gray500 or primaryDark
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
          className="px-3 py-1 rounded border"
        >
          &lt;
        </button>

        {/* 페이지 번호 */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              backgroundColor: "#ffffff",
              border: page === currentPage ? "1p x solid #6FA235" : "1px solid #CAE3A5",
              color: "#6FA235",
              fontWeight: page === currentPage ? "bold" : "normal",
            }}
            className="px-3 py-1 rounded"
          >
            {page}
          </button>
        ))}

        {/* 다음 버튼 */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          style={{
            backgroundColor: currentPage === totalPages ? "#E9E9E9" : "#CAE3A5",
            color: currentPage === totalPages ? "#B5B5B5" : "#6FA235",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
          className="px-3 py-1 rounded border"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Review;