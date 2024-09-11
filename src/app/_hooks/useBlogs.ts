import { useEffect, useState, useCallback } from "react";
import { getBlogs } from "../_api/apiService";
import { API_LIMIT } from "../_utils/constants";

const useBlogs = (limit: number = API_LIMIT) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchBlogs = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    setError(null); // Reset error before fetching

    try {
      const response = await getBlogs(page, limit);
      const { data, totalPages } = response;

      setBlogs((prevProducts) =>
        page === 1 ? data : [...prevProducts, ...data]
      );
      setHasMore(page < totalPages);
    } catch (err: any) {
      console.error("Error fetching products:", err.message);
      setError(err.message); // Improved error message handling
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setBlogs([]);
    fetchBlogs(1, limit);
  }, [limit]);

  useEffect(() => {
    if (page > 1) {
      fetchBlogs(page, limit);
    }
  }, [page, limit]);

  const loadMoreBlogs = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { blogs, loading, error, loadMoreBlogs, hasMore };
};

export default useBlogs;
