import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../context/SearchContext";
import { getLatestReviews } from "../apis/mainPage";
import type { LatestContent } from "../types/mainLectures";

function useSearchList() {
  const { search } = useSearch();

  return useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      let page = 0;
      let allReviews: LatestContent[] = [];
      let totalPage = 1;

      while (page < totalPage) {
        const data = await getLatestReviews(page);
        const content: LatestContent[] = data.result.content;
        totalPage = data.result.totalPages;

        allReviews = allReviews.concat(content);
        page++;
      }

      return allReviews.filter((review) => review.content.includes(search));
    },

    staleTime: 5 * 60 * 1000,
  });
}

export default useSearchList;
