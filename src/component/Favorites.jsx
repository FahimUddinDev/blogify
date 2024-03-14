import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function Favorites() {
  const { api } = useAxios();
  const [favoritesBlog, setFavoritesBlog] = useState();

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
      );
      if (response.status === 200) {
        setFavoritesBlog(response.data.blogs);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favorites ❤️
      </h3>

      <ul className="space-y-5 my-5">
        {favoritesBlog?.map((blog) => (
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

export default Favorites;
