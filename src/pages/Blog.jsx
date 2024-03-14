import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../actions";
import Comment from "../component/Comment";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlogs";

function Blog() {
  const { blogId } = useParams();
  const { state, dispatch } = useBlog();
  const [blog, setBlog] = useState();
  const { api } = useAxios();
  const { auth } = useAuth();
  useEffect(() => {
    const fetchBlog = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
      );
      if (response.status === 200) {
        setBlog(response.data);
      }
    };
    fetchBlog();
  }, []);
  const blogDate = moment(blog?.createdAt).format("MMM DD YYYY");

  function createMarkup(data) {
    return { __html: data };
  }

  const addLike = async () => {
    try {
      let response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/like`
      );

      dispatch({
        type: actions.blog.DATA_EDITED,
        data: { ...blog, likes: response.data.likes },
      });
      setBlog((prev) => ({ ...prev, likes: response.data.likes }));
    } catch (error) {
      console.log(error);
    }
  };

  const isLiked = blog?.likes?.find((id) => id.id === auth?.user?.id);
  const toggleFavorite = async () => {
    try {
      let response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/favourite`
      );
      setBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{blog?.title}</h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white rounded-full overflow-hidden">
              {blog?.author?.avatar ? (
                <img
                  src={
                    import.meta.env.VITE_SERVER_BASE_URL +
                    "/uploads/avatar/" +
                    blog?.author?.avatar
                  }
                  alt="author"
                  className=""
                />
              ) : (
                <span className="">{blog?.author?.firstName[0]}</span>
              )}
            </div>
            <h5 className="text-slate-500 text-sm">
              {blog?.author?.firstName + " " + blog?.author?.lastName}
            </h5>
          </div>
          <span className="text-sm text-slate-700 dot">{blogDate}</span>
          <button
            onClick={() => {
              if (!isLiked) {
                addLike();
              }
            }}
          >
            <span
              className={`text-sm ${
                isLiked ? "text-white" : "text-slate-700"
              } dot`}
            >
              {blog?.likes?.length} Likes
            </span>
          </button>
          <button
            onClick={() => {
              toggleFavorite();
            }}
            className=" w-5 h-5"
          >
            <svg
              className={
                blog?.isFavourite
                  ? "stroke-[#ff0044] fill-[#ff0044]"
                  : "stroke-slate-700 fill-transparent"
              }
              data-slot="icon"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              ></path>
            </svg>
          </button>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={
            import.meta.env.VITE_SERVER_BASE_URL +
            "/uploads/blog/" +
            blog?.thumbnail
          }
          alt=""
        />

        {/* Tags  */}
        <ul className="tags">
          {blog?.tags?.split(",").map((tag, index) => (
            <li key={tag + index}>{tag}</li>
          ))}
        </ul>

        {/* Content */}
        <div
          className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left"
          dangerouslySetInnerHTML={createMarkup(blog?.content)}
        ></div>
      </div>
      <Comment
        comments={blog?.comments}
        author={blog?.author}
        blogId={blogId}
        setBlog={setBlog}
      />
    </>
  );
}

export default Blog;
