"use client";
// react/next imports
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// third party imports
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Typography,
} from "@mui/material";

// local imports
import AppLoader from "@/app/_components/loader/AppLoader";
import { getBlogById } from "@/app/_api/apiService";

const BelogsDetails = () => {
  const { id }: { id: string } = useParams();
  const [blog, setBlog] = useState<IBlog>({} as IBlog);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      getBlogById(id)
        .then((data) => {
          setBlog(data);
        })
        .catch((error) => {
          console.error("Error fetching blog details:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <AppLoader loading={loading}>
      <Container
        maxWidth="md"
        sx={{
          mt: 9,
          r: "1px solid grey",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -2px rgba(0, 0, 0, .1)",
          bgcolor: "#f3f3f3",
          borderRadius: "8px",
          padding: "15px 10px",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          variant="text"
          sx={{ mb: 2 }}
          onClick={() => window.history.back()}
        >
          Back to Blog List
        </Button>

        <CardMedia
          component="img"
          height="400"
          image={blog.coverImage}
          alt={blog.title}
          sx={{ borderRadius: 2, mb: 3 }}
        />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {blog.category}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {new Date(blog.createdAt).toLocaleDateString()}
        </Typography>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {blog.title}
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          {blog.author}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography
            variant="body1"
            paragraph
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </Box>
      </Container>
    </AppLoader>
  );
};

export default BelogsDetails;
