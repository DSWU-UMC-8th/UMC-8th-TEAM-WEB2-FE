import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../context/SearchContext";
import { getLatestReviews } from "../apis/mainPage";

function useSearchList(page: number) {
  const { search } = useSearch();

  return useQuery({
    queryKey: ["search", search, page],
    queryFn: async () => {
      const data = await getLatestReviews(page);
      const filteredReviews = data.result.content.filter((review) => {
        return !search || review.content.includes(search);
      });

      return filteredReviews;
    },
  });
}

export default useSearchList;
