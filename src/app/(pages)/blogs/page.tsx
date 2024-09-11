"use client";
import { useRouter } from "next/navigation";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ThreeDots } from "react-loader-spinner";

import BlogCard from "@/app/_components/card/BlogCard";
import useBlogs from "@/app/_hooks/useBlogs";
import FlatList from "@/app/_components/flatlist/FlatList";

const Blogs = () => {
  const router = useRouter();
  const { blogs, loading, error, loadMoreBlogs, hasMore } = useBlogs();

  const handleNavigate = (id: string) => {
    router.push(`blogs/${id}`);
  };

  return (
    <Box sx={{ textAlign: "center", margin: "50px 20px" }}>
      <Typography variant="h3" fontWeight={500}>
        Starbucks Blogs
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        maxWidth={"1100px"}
        m="60px auto 0"
      >
        <FlatList
          data={blogs}
          renderItem={(item) => (
            <BlogCard
              image={item.coverImage}
              title={item.title}
              description={item.briefContent}
              author={item.author}
              date={item.createdAt}
              onClick={() => handleNavigate(item._id)}
            />
          )}
          loadMore={loadMoreBlogs}
          hasMore={hasMore}
          loader={
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#29343b"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          }
          endMessage={<Typography>No more products</Typography>}
          emptyMessage={<Typography>No products found</Typography>}
          keyExtractor={(item) => item._id}
          loading={loading}
          error={error ? true : false}
        />
      </Grid>
    </Box>
  );
};

export default Blogs;
