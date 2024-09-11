import apiClient from "./apiClient";

export const getBlogs = async (
  page: number = 1,
  limit: number = 60
): Promise<BlogsApiResponse> => {
  try {
    const response = await apiClient.get("/blogs", {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error: any) {
    throw handleError(error, "Failed to fetch products");
  }
};

export const getBlogById = async (id: string): Promise<IBlog> => {
  try {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
  } catch (error: any) {
    throw handleError(error, "Failed to fetch product details");
  }
};

export const deleteBlogById = async (id: string): Promise<IBlog> => {
  try {
    const response = await apiClient.delete(`/blogs/${id}`);
    return response.data;
  } catch (error: any) {
    throw handleError(error, "Failed to fetch product details");
  }
};

export const uploadImage = async (formData: FormData): Promise<string> => {
  try {
    const response = await apiClient.post("/cloudinary/upload", formData);
    return response.data.secure_url;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to upload image");
  }
};

export const handleError = (error: any, defaultMessage: string): void => {
  if (error.response) {
    // Server responded with an error
    console.error("Error response data:", error.response.data);
    console.error("Error response status:", error.response.status);
    console.error("Error response headers:", error.response.headers);
    throw new Error(
      `${defaultMessage}: ${
        error.response.data.message ||
        error.response.statusText ||
        "Unknown error"
      }`
    );
  } else if (error.request) {
    // No response received
    console.error("Error request:", error.request);
    throw new Error(`${defaultMessage}: No response from server`);
  } else {
    // Other errors
    console.error("Error message:", error.message);
    throw new Error(`${defaultMessage}: ${error.message}`);
  }
};
