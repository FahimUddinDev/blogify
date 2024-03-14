import React, { useEffect, useRef, useState } from "react";
import { actions } from "../actions";
import BlogList from "../component/BlogList";
import Favorites from "../component/Favorites";
import SidebarCard from "../component/SidebarCard";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlogs";

function Home() {
  const { state, dispatch } = useBlog();

  const { api } = useAxios();

  const [page, setPage] = useState(state.currentPage || 0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    dispatch({ type: actions.blog.DATA_FETCHING });
    const fetchBlog = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=${page}`
        );
        if (response.status === 200) {
          if (response.data.blogs.length === 0) {
            setHasMore(false);
          } else {
            dispatch({
              type: actions.blog.DATA_FETCHED,
              data: [...response.data.blogs],
            });
            dispatch({
              type: actions.blog.CURRENT_PAGE,
              data: page + 1,
            });
            setPage((prevPage) => prevPage + 1);
          }
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.blog.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchBlog();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);

  if (state?.error) {
    return <div> Error in fetching Blogs {state?.error?.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <div className="space-y-3 md:col-span-5">
        <BlogList />
        {hasMore && <div ref={loaderRef}>Loading Blogs...</div>}
        {!hasMore && (
          <div>
            <span>The End </span>
          </div>
        )}
      </div>
      <div className="md:col-span-2 h-full w-full space-y-5">
        <SidebarCard />
        <Favorites />
      </div>
    </div>
  );
}

export default Home;
