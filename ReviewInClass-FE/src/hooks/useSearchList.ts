import { useQuery } from "@tanstack/react-query";
import { dummyReviews } from "../data/dummyReviews";
import { useSearch } from "../context/SearchContext";

function useSearchList() {
  const { search } = useSearch();

  return useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      const filteredReviews = dummyReviews.filter((review) => {
        return !search || review.content.includes(search);
      });

      return filteredReviews;
    },
  });
}

export default useSearchList;
