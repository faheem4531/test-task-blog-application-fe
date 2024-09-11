interface IBlog {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  briefContent: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface IBlogPayload {
  title: string;
  content: string;
  coverImage: string;
  briefContent: string;
  author: string;
  category: string;
}

// responses

interface BlogsApiResponse {
  data: IProduct[];
  page: number;
  limit: number;
  totalDocuments: number;
  totalPages: number;
}
