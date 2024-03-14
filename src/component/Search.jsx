import React, { useState } from "react";
import closeIcon from "../assets/icons/close.svg";
import useAxios from "../hooks/useAxios";
import SearchBlog from "./SearchBlog";

function Search({ close }) {
  const [search, setSearch] = useState();
  const [blogs, setBlogs] = useState();
  const { api } = useAxios();

  const fetchSearchBlog = async (e) => {
    e.preventDefault();
    const response = await api.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${search}`
    );
    if (response.status === 200) {
      setBlogs(response.data.data);
    }
  };

  return (
    <section
      className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50"
      role="dialog"
      aria-modal="true"
    >
      {/* Search Container */}
      <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        {/*  Search  */}
        <div>
          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
            Search for Your Desire Blogs
          </h3>
          <form
            action=""
            onSubmit={(e) => {
              fetchSearchBlog(e);
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Start Typing to Search"
              className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
            />
          </form>
        </div>

        {/* Search Result */}
        <div className="">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {blogs?.map((blog) => (
              <SearchBlog closeModal={close} key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        <button onClick={close}>
          <img
            src={closeIcon}
            alt="Close"
            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
          />
        </button>
      </div>
    </section>
  );
}

export default Search;
