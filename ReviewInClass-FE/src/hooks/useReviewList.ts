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
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const BASE_URL = "http://localhost:8080";

    if (!["latest", "popular", "filter"].includes(sortType)) return;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        let res;

        if (sortType === "latest") {
          res = await axios.get(`${BASE_URL}/api/reviews/latest`, {
            params: { page: currentPage },
          });
          setData(res.data?.result?.content ?? []);
          setTotalPages(res.data?.result?.totalPages ?? 1);
          setTotalCount(res.data?.result?.totalElements ?? 0);
        } else if (sortType === "popular") {
          res = await axios.get(`${BASE_URL}/api/reviews/popular`, {
            params: { page: currentPage },
          });
          setData(res.data?.result?.content ?? []);
          setTotalPages(res.data?.result?.totalPages ?? 1);
          setTotalCount(res.data?.result?.totalElements ?? 0); // ✅ 전체 수 저장
        } else {
          res = await axios.get(`${BASE_URL}/api/reviews/filter`, {
            params: {
              category: categoryMap[filters.category],
              level: levelMap[filters.level],
              period: periodMap[filters.period],
            },
          });
          const filtered = res.data?.result ?? [];
          setData(filtered);
          setTotalPages(1); // 고정
          setTotalCount(filtered.length); // ✅ 전체 수 직접 세기
        }

        } catch (e) {
            setError(true);
        } finally {
          setLoading(false);
        }
      };


    fetchData();
  }, [sortType, filters, currentPage]);

  return { data, isLoading, isError, totalPages, totalCount  };
};

export default useReviewList;
