import React, { useState, useEffect } from "react";
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
  const urlSort = searchParams.get("sort"); // latest 또는 popular

  const [sortType, setSortType] = useState<"latest" | "popular">("latest"); // 초기값은 그냥 latest
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState<Filters>({
    category: "",
    level: "",
    period: "",
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (urlSort === "popular" || urlSort === "latest") {
      setSortType(urlSort);
    }
  }, [urlSort]);

  const { search } = useSearch();
  const isSearchMode = typeof search === "string" && search.trim() !== "";

  const searchResult = useSearchList(currentPage);
  const reviewResult = useReviewList(sortType, filters, currentPage, order);

  const {
    data: reviews = [],
    isLoading,
    isError,
    totalPages: _totalPages,
  } = isSearchMode ? searchResult : reviewResult;

  const totalPages = isSearchMode ? 1 : _totalPages;

  const reviewsPerPage = 5;

  const safeTotalPages =
    sortType === "latest" || sortType === "popular"
      ? totalPages
      : Math.ceil(reviews.length / reviewsPerPage);

  if (isLoading) return <Loading />;
  if (!reviews.length) return <NoResult />;
  // if (isError) return <div>에러 발생</div>;

  const periodPriority: { [key: string]: number } = {
    "일주일 이내": 1,
    "1달 이내": 2,
    "3달 이내": 3,
    "6달 이내": 4,
    "1년 이내": 5,
    "수강 미완료": 6,
  };

  const paginatedReviews =
    isSearchMode || sortType === "filter"
      ? reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)
      : reviews;

  const toggleOrder = () => {
    setOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  return (
    <div className="px-8 py-6">
      {!search && <MiniBanner lectures={LECTURE.slice(0, 4)} />}
      {search && (
        <p className="text-center font-semibold text-[25px] leading-[33.66px] tracking-[-0.01em]">
          <span style={{ color: palette.secondary.secondaryDark }}>{search}</span>에 대한{" "}
          {reviews.length}개의 검색 결과가 있습니다.
        </p>
      )}

      <ReviewFilterBar
        onSearch={(newFilters) => {
          setFilters(newFilters); // 필터 상태 저장
          setSortType("filter"); // 정렬 기준을 'filter'로 변경 (useReviewList에서 인식)
          setCurrentPage(1); // 새 검색이니까 페이지 1로 초기화
        }}
        sortType={sortType}
        order={order}
        onToggleOrder={toggleOrder}
        onChangeSortType={(type) => {
          setSortType(type); // ✅ 인기순, 최신순 반영
          setCurrentPage(1); // 페이지 초기화
        }}
      />

      <div className="space-y-4">
        {paginatedReviews.map((review) => (
          <ReviewCard
            key={review.reviewId}
            rating={review.rating}
            createdAt={review.createdAt ?? "날짜 없음"}
            studyPeriod={review.studyPeriod ?? "기간 정보 없음"}
            likeCount={review.likes ?? 0}
            content={review.content ?? "내용 없음"}
            imageUrl={review.imageUrl ?? ""}
            profileImage={review.profileImage ?? ""}
            category={review.category ?? "카테고리 없음"}
            level={review.level ?? "레벨 없음"}
            teacher={review.instructorName ?? "강사 정보 없음"}
            lectureId={review.lectureId ?? ""}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          className="px-3 py-1 rounded border"
          style={{
            backgroundColor: currentPage === 1 ? "#E9E9E9" : "#CAE3A5",
            color: currentPage === 1 ? "#B5B5B5" : "#6FA235",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          &lt;
        </button>

        {Array.from({ length: safeTotalPages }, (_, i) => i + 1)
          .filter((page) => page <= safeTotalPages)
          .map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className="px-3 py-1 rounded"
              style={{
                backgroundColor: "#ffffff",
                border: page === currentPage ? "1px solid #6FA235" : "1px solid #CAE3A5",
                color: "#6FA235",
                fontWeight: page === currentPage ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          ))}

        <button
          disabled={currentPage === safeTotalPages}
          onClick={() => {
            if (currentPage < safeTotalPages) setCurrentPage(currentPage + 1);
          }}
          className="px-3 py-1 rounded border"
          style={{
            backgroundColor: currentPage === safeTotalPages ? "#E9E9E9" : "#CAE3A5",
            color: currentPage === safeTotalPages ? "#B5B5B5" : "#6FA235",
            cursor: currentPage === safeTotalPages ? "not-allowed" : "pointer",
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Review;
