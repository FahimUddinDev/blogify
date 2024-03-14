import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function SidebarCard() {
  const { api } = useAxios();
  const [popularBlog, setPopularBlog] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
      );
      if (response.status === 200) {
        setPopularBlog(response.data.blogs);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {popularBlog?.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            {" "}
            <li className="mt-4">
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {blog.title}
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <a href="./profile.html">
                  {blog?.author?.firstName + " " + blog?.author?.lastName} Hasan
                </a>
                <span>·</span> {blog?.likes?.length} Likes
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SidebarCard;
