'use client'

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";

import BlogCard from "@/app/_components/card/BlogCard";

const Blogs = () => {
  const router = useRouter();
  const blogData = [
    {
      image: "https://zciclyqzxathornwysqe.supabase.co/storage/v1/object/public/blog-images/79bea811-9ea8-4680-afcd-a05374a65e5d/1722956072526_0.jpg",
      title: "Crafting the Perfect First Impression Text Message",
      description: "An insightful guide to creating the perfect first impression via text.",
      author: "Brian Tam",
      date: "May 10, 2024",
      _id: "b1"
    },
    {
      image: "https://zciclyqzxathornwysqe.supabase.co/storage/v1/object/public/blog-images/79bea811-9ea8-4680-afcd-a05374a65e5d/1722956072526_0.jpg",
      title: "How to Master the Art of Conversations",
      description: "Learn the techniques to become a great conversationalist.",
      author: "Jane Doe",
      date: "June 15, 2024",
      _id: "b2"
    },
    {
      image: "https://zciclyqzxathornwysqe.supabase.co/storage/v1/object/public/blog-images/79bea811-9ea8-4680-afcd-a05374a65e5d/1722956072526_0.jpg",
      title: "The Psychology of First Impressions",
      description: "An analysis of how first impressions affect relationships.",
      author: "John Smith",
      date: "July 21, 2024",
      _id: "b3"
    }
  ];

  const handleNavigate = (id: string) => {
    router.push(`blogs/${id}`);
  };

  return (
    <Box sx={{
      textAlign: "center",
      margin: "50px 20px"
    }} >
      <Typography variant="h3" fontWeight={500}>Starbucks Blogs</Typography>
      <Grid container spacing={4} justifyContent="center" maxWidth={"1100px"} m="60px auto 0">
        {blogData.map((blog, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 12, md: 6 }}
          >
            <BlogCard
              image={blog.image}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={blog.date}
              onClick={() => handleNavigate(blog.title)}
            />
          </Grid>
        ))}
      </Grid>
    </Box >
  );
};

export default Blogs;
