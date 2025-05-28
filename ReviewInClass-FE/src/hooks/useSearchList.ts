import { useQuery } from "@tanstack/react-query";
import { useSearch } from "../context/SearchContext";
import { getLatestReviews } from "../apis/mainPage";

function useSearchList() {
  const { search } = useSearch();

  return useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      const data = await getLatestReviews(0);
      const filteredReviews = data.result.content.filter((review) => {
        return !search || review.content.includes(search);
      });

      return filteredReviews;
    },
  });
}

export default useSearchList;
