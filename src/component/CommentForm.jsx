import React, { useState } from "react";
import useAxios from "../hooks/useAxios";

function CommentForm({ blogId, setBlog }) {
  const [comment, setComment] = useState();

  const { api } = useAxios();

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("content ", comment);
    try {
      let response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/comment`,
        { content: comment }
      );
      setBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <textarea
        className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
        placeholder="Write a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="flex justify-end mt-4">
        <button
          onClick={submitForm}
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Comment
        </button>
      </div>
    </div>
  );
}

export default CommentForm;
