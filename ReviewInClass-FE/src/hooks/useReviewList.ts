import { useEffect, useState } from "react";
import axios from "axios";
import type { Filters } from "../components/ReviewFilterBar";
import { categoryMap, levelMap, periodMap } from "../utils/filterMap";

const useReviewList = (
  sortType: string,
  filters: Filters,
  currentPage: number
) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        let res;
        if (sortType === "latest") {
          res = await axios.get("/api/reviews/latest", {
            params: { page: currentPage },
          });
        } else if (sortType === "popular") {
          res = await axios.get("/api/reviews/popular", {
            params: { page: currentPage },
          });
        } else {
          res = await axios.get("/api/reviews/filter", {
            params: {
              category: categoryMap[filters.category],
              level: levelMap[filters.level],
              period: periodMap[filters.period],
            },
          });
        }
        setData(Array.isArray(res.data) ? res.data : res.data.result);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortType, filters, currentPage]);

  return { data, isLoading, isError };
};

export default useReviewList;
