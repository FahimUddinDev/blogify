import moment from "moment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { actions } from "../actions";
import threeDot from "../assets/icons/3dots.svg";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlogs";

function BlogCard({ blog }) {
  const { state, dispatch } = useBlog();
  const [menu, setMenu] = useState(false);
  const blogDate = moment(blog?.createdAt).format("MMM DD YYYY");
  const { auth } = useAuth();
  const { api } = useAxios();

  const deleteBlog = async () => {
    try {
      let response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`
      );
      if (response.status === 200) {
        dispatch({
          type: actions.blog.BLOG_DELETED,
          data: blog.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="blog-card">
      <Link to={`/blog/${blog?.id}`}>
        <img
          className="blog-thumb"
          src={
            import.meta.env.VITE_SERVER_BASE_URL +
            "/uploads/blog/" +
            blog?.thumbnail
          }
          alt=""
        />
      </Link>
      <div className="mt-2 relative">
        <Link to={`/blog/${blog?.id}`}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">
            <p>{blog?.title}</p>
          </h3>
        </Link>
        <Link to={`/blog/${blog?.id}`}>
          <p className="mb-6 text-base text-slate-500 mt-1">{blog?.content}</p>
        </Link>

        {/* Meta Information */}

        <div className="flex justify-between items-center">
          <Link to={`/profile/${blog?.author?.id}`}>
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white rounded-full overflow-hidden">
                {blog?.author?.avatar ? (
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/avatar/${blog?.author?.avatar}`}
                    alt=""
                  />
                ) : (
                  <span className="">{blog?.author?.firstName[0]}</span>
                )}
              </div>

              <div>
                <h5 className="text-slate-500 text-sm">
                  {blog?.author?.firstName + " " + blog?.author?.lastName}
                </h5>
                <div className="flex items-center text-xs text-slate-700">
                  <span>{blogDate}</span>
                </div>
              </div>
            </div>
          </Link>
          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{blog?.likes?.length} Likes</span>
          </div>
        </div>

        {/* action dot */}
        {auth?.user?.id === blog?.author?.id && (
          <div className="absolute right-0 top-0">
            <button
              onClick={() => {
                setMenu((prev) => !prev);
              }}
            >
              <img src={threeDot} alt="3dots of Action" />
            </button>

            {/* Action Menus Popup  */}
            <div className={`action-modal-container ${menu ? "" : "hidden"}`}>
              <Link
                to={`/edit/${blog?.id}`}
                className="action-menu-item hover:text-lwsGreen"
              >
                <img src={editIcon} alt="Edit" />
                Edit
              </Link>
              <button
                onClick={deleteBlog}
                className="action-menu-item hover:text-red-500"
              >
                <img src={deleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* action dot ends */}
      </div>
    </div>
  );
}

export default BlogCard;
