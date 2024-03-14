import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { actions } from "../actions";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlogs";

function CreateBlog() {
  const { state, dispatch } = useBlog();
  const { blogId } = useParams();
  const { auth } = useAuth();
  const [previewImg, setPreviewImg] = useState();
  const [oldImg, setOldImg] = useState();
  const navigate = useNavigate();
  const { api } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
      );
      const fields = ["title", "tags", "content"];
      fields.forEach((field) => setValue(field, response.data[field]));
      setOldImg(response.data.thumbnail);
    };
    if (blogId) {
      fetchBlog();
    }
  }, []);

  const fileUploaderRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploaderRef.current.click();
    const [file] = fileUploaderRef.current.files;
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const submitForm = async (formData) => {
    const updateFormData = new FormData();
    for (const file of fileUploaderRef.current.files) {
      updateFormData.append("thumbnail", file);
    }
    Object.entries(formData).map(([key, value]) => {
      if (typeof value === "string") {
        updateFormData.append(`${key}`, value);
      }
    });
    try {
      let response;
      if (blogId) {
        response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`,
          updateFormData
        );
        dispatch({
          type: actions.blog.DATA_EDITED,
          data: response.data,
        });
      } else {
        response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/`,
          updateFormData
        );
        dispatch({
          type: actions.blog.DATA_CREATED,
          data: response.data.blog,
        });
      }

      if (response.status === 201 || response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  console.log(oldImg);

  return (
    <form className="createBlog" onSubmit={handleSubmit(submitForm)}>
      <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4 relative">
        {(previewImg || oldImg) && (
          <img
            src={
              previewImg
                ? previewImg
                : import.meta.env.VITE_SERVER_BASE_URL +
                  "/uploads/blog/" +
                  oldImg
            }
            alt=""
            className=" absolute w-full object-cover h-[150px] z-0"
          />
        )}
        <input
          type="file"
          id="upload-img"
          className="hidden"
          ref={fileUploaderRef}
          onChange={(e) => handleImageUpload(e)}
        />
        <label
          htmlFor="upload-img"
          className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer relative z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p>Upload Your Image</p>
        </label>
      </div>
      <div className="mb-6">
        <input
          {...register("title")}
          type="title"
          id="title"
          name="title"
          placeholder="Enter your blog title"
        />
      </div>

      <div className="mb-6">
        <input
          {...register("tags")}
          type="tags"
          id="tags"
          name="tags"
          placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
        />
      </div>

      <div className="mb-6">
        <textarea
          {...register("content")}
          id="content"
          name="content"
          placeholder="Write your blog content"
          rows="8"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
      >
        {blogId ? "Save Edited" : "Create Blog"}
      </button>
    </form>
  );
}

export default CreateBlog;
