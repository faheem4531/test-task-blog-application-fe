// react imports
import { useEffect, useState, useCallback } from "react";

// third party imports
import { toast } from "react-toastify";

// local imports
import { getBlogs, deleteBlogById } from "../_api/apiService";
import { API_LIMIT } from "../_utils/constants";

const useBlogs = (limit: number = API_LIMIT) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch blogs with pagination
  const fetchBlogs = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    setError(null); // Reset error before fetching

    try {
      const response = await getBlogs(page, limit);
      const { data, totalPages } = response;

      setBlogs((prevBlogs) => (page === 1 ? data : [...prevBlogs, ...data]));
      setHasMore(page < totalPages);
    } catch (err: any) {
      console.error("Error fetching blogs:", err.message);
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

  // Delete a blog by ID and refetch the data
  const deleteBlog = async (id: string) => {
    setLoading(true);
    setError(null);
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));

    try {
      await deleteBlogById(id);
      toast.success("Blog deleted successfully");
    } catch (err: any) {
      console.error("Error deleting blog:", err.message);
      toast.error("Failed to delete blog");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { blogs, loading, error, loadMoreBlogs, hasMore, deleteBlog };
};

export default useBlogs;
