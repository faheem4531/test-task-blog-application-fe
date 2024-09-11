"use client";

import BlogForm from '@/app/_components/form/BlogForm';

// react/next imports
import { useParams } from "next/navigation";

const BelogsDetails = () => {
  const { id } = useParams();

  return (
    <>
      <BlogForm status="update"/>
    </>
  );
};

export default BelogsDetails;
