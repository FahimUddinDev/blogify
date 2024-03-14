import React from "react";
import { Link } from "react-router-dom";

function SearchBlog({ blog, closeModal }) {
  return (
    <Link
      to={`/blog/${blog.id}`}
      onClick={closeModal}
      className="flex gap-6 py-2"
    >
      <img
        className="h-28 object-contain"
        src={
          import.meta.env.VITE_SERVER_BASE_URL +
          "/uploads/blog/" +
          blog?.thumbnail
        }
        alt=""
      />
      <div className="mt-2">
        <h3 className="text-slate-300 text-xl font-bold">{blog?.title}</h3>
        {/* Meta Information */}
        <p className="mb-6 text-sm text-slate-500 mt-1">{blog?.content}</p>
      </div>
    </Link>
  );
}

export default SearchBlog;
