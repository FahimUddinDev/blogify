import React from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

function Comment({ comments, author, blogId, setBlog }) {
  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 ">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments?.length})
        </h2>
        <div className="flex items -center space-x-4">
          <div className="avater-img bg-indigo-600 text-white rounded-full overflow-hidden">
            {author?.avatar ? (
              <img
                src={
                  import.meta.env.VITE_SERVER_BASE_URL +
                  "/uploads/avatar/" +
                  author?.avatar
                }
                alt="author"
                className=""
              />
            ) : (
              <span className="">{author?.firstName[0]}</span>
            )}
          </div>
          <CommentForm blogId={blogId} setBlog={setBlog} />
        </div>
        {comments?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            blogId={blogId}
            setBlog={setBlog}
          />
        ))}
      </div>
    </section>
  );
}

export default Comment;
