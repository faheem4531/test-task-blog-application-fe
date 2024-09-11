"use client";

// local imports
import BlogForm from "@/app/_components/form/BlogForm";
import { Modes } from "@/app/_enums/blogEnums";

const Create = () => {
  return <BlogForm mode={Modes.CREATE} />;
};

export default Create;
