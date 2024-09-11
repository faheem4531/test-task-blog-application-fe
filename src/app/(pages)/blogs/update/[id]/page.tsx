"use client";

// react/next imports
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// local imports
import BlogForm from "@/app/_components/form/BlogForm";
import AppLoader from "@/app/_components/loader/AppLoader";
import { getBlogById } from "@/app/_api/apiService";
import { Modes } from "@/app/_enums/blogEnums";

const Edit = () => {
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
      <BlogForm mode={Modes.EDIT} />
    </AppLoader>
  );
};

export default Edit;
