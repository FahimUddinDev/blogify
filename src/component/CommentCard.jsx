import React from "react";
import commentIcon from "../assets/icons/delete.svg";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

function CommentCard({ comment, blogId, setBlog }) {
  const { api } = useAxios();
  const { auth } = useAuth();
  const deleteComment = async () => {
    try {
      let response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/comment/${
          comment.id
        }`
      );
      if (response.status === 200) {
        setBlog(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-start space-x-4 my-8">
      <div className="avater-img bg-indigo-600 text-white rounded-full overflow-hidden">
        {comment?.author?.avatar ? (
          <img
            src={
              import.meta.env.VITE_SERVER_BASE_URL +
              "/uploads/avatar/" +
              comment?.author?.avatar
            }
            alt="author"
            className=""
          />
        ) : (
          <span className="">{comment?.author?.firstName[0]}</span>
        )}
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <h5 className="text-slate -500 font-bold">
            {comment?.author?.firstName + " " + comment?.author?.lastName}
          </h5>
          {auth?.user?.id === comment?.author?.id && (
            <button
              onClick={deleteComment}
              className=" opacity-80 hover:opacity-100 transition-all duration-300"
            >
              {" "}
              <img src={commentIcon} alt="" className="" />
            </button>
          )}
        </div>
        <p className="text-slate-300">{comment?.content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
