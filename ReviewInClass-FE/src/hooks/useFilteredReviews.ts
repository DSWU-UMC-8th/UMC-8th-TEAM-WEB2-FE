// hooks/useFilteredReviews.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ReviewCardProps } from "../types/review";
import { categoryMap, levelMap, periodMap } from "../utils/mapping";

interface Filters {
  category?: string;
  level?: string;
  period?: string;
  sort?: "latest" | "popular";
  order?: "asc" | "desc";
}

const useFilteredReviews = (filters: Filters) => {
  const mappedFilters = {
    category: categoryMap[filters.category ?? ""] || undefined,
    level: levelMap[filters.level ?? ""] || undefined,
    period: periodMap[filters.period ?? ""] || undefined,
    sort: filters.sort,
    order: filters.order,
  };

  return useQuery<ReviewCardProps[]>({
    queryKey: ["filteredReviews", mappedFilters],
    queryFn: async () => {
      const res = await axios.get("/api/reviews/filter", {
        params: mappedFilters,
      });

      return res.data.result.map((review: any) => ({
        rating: String(review.rating),
        createdAt: review.createdAt ?? "2024-01-01",
        studyPeriod: review.studyPeriod ?? "1달 이내",
        likeCount: review.likes,
        content: review.content,
        imageUrl: review.imageUrl ?? null,
        profileImage: review.profileImage ?? null,
        category: review.category ?? "",
        level: review.level ?? "",
        teacher: review.instructorName,
      }));
    },
    staleTime: 1000 * 60,
  });
};

export default useFilteredReviews;
