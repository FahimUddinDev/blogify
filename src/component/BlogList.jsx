import React from "react";
import { useBlog } from "../hooks/useBlogs";
import BlogCard from "./BlogCard";

function BlogList() {
  const { state } = useBlog();
  return (
    <>
      {state?.blogs?.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </>
  );
}

export default BlogList;
