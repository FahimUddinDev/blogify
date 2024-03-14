import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import editBio from "../assets/icons/edit.svg";
import BlogCard from "../component/BlogCard";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { auth, setAuth } = useAuth();
  const { authorId } = useParams();
  const [author, setAuthor] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [bio, setBio] = useState();
  const [avatar, setAvatar] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();
  const [enableEdit, setEnableEdit] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${authorId}`
      );
      if (response.status === 200) {
        setAuthor(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setBio(response.data.bio);
      }
    };
    fetchProducts();
  }, []);

  // image edit

  const fileUploaderRef = useRef();

  const handlePictureUpdate = (e) => {
    if (e.target.value !== "") {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setAvatar(event.target.result);
      };
      imgReader.readAsDataURL(e.target.files[0]); //view
      setPreviewAvatar(() => e.target.files[0]);
      const [file] = e.target.files;
      if (file) {
        setPreviewAvatar(URL.createObjectURL(file));
      }
    }
  };

  const wonProfile = auth.user?.id === authorId;

  // update author

  const updateProfile = async () => {
    const formData = new FormData();
    if (fileUploaderRef?.current?.files) {
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("bio", bio);
    try {
      let response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        formData
      );

      if (response.status === 200) {
        setAuth({ ...auth, user: response.data.user });
        setEnableEdit(false);
        localStorage.setItem(
          "authData",
          JSON.stringify({ ...auth, user: response.data.user })
        );
      }
    } catch (error) {
      //   setError("root.random", {
      //     type: "random",
      //     message: `Something went wrong: ${error.message}`,
      //   });
      // }
    }
  };

  return (
    <div className="mx-auto max-w-[1020px] py-8">
      <div className="flex flex-col items-center py-8 text-center ">
        {/* profile image */}
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
          <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full overflow-hidden">
            {wonProfile && (
              <input
                type="file"
                id="upload-img"
                className="hidden"
                ref={fileUploaderRef}
                onChange={(e) => handlePictureUpdate(e)}
              />
            )}

            {author?.avatar ? (
              <img
                src={
                  previewAvatar
                    ? `  ${previewAvatar}`
                    : `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                        author?.avatar
                      }`
                }
                alt=""
              />
            ) : (
              <span className="">{author?.firstName[0]}</span>
            )}
          </div>
          {wonProfile && (
            <label
              onClick={() => {
                setEnableEdit(true);
              }}
              htmlFor="upload-img"
              className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            >
              <img src={editBio} alt="Edit" />
            </label>
          )}
        </div>
        {/* name , email */}
        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px] flex gap-3 justify-center">
            {enableEdit ? (
              <input
                style={{ width: lastName?.length * 20 + 20 + "px" }}
                onChange={(e) => {
                  e.target.style.width = e.target.value.length * 20 + 20 + "px";
                  setFirstName(e.target.value);
                }}
                type="text"
                value={firstName}
                disabled={!wonProfile}
                className="text-2xl font-semibold text-white lg:text-[28px] bg-transparent max-w-fit border-none outline-none focus:outline-none focus:border-none"
              />
            ) : (
              <p className="text-2xl font-semibold text-white lg:text-[28px] bg-transparent max-w-fit border-none outline-none focus:outline-none focus:border-none">
                {firstName}
              </p>
            )}
            {enableEdit ? (
              <input
                style={{ width: lastName?.length * 20 + 20 + "px" }}
                onChange={(e) => {
                  e.target.style.width = e.target.value.length * 20 + 20 + "px";
                  setLastName(e.target.value);
                }}
                type="text"
                value={lastName}
                disabled={!wonProfile}
                className="text-2xl font-semibold text-white lg:text-[28px] bg-transparent max-w-fit border-none outline-none focus:outline-none focus:border-none"
              />
            ) : (
              <p className="text-2xl font-semibold text-white lg:text-[28px] bg-transparent max-w-fit border-none outline-none focus:outline-none focus:border-none">
                {lastName}
              </p>
            )}
          </h3>
          <p className="leading-[231%] lg:text-lg">{author?.email}</p>
        </div>

        {/* bio */}
        <div className="mt-4 flex items-start gap-2 lg:mt-6 w-full ">
          <div className="flex-1 ">
            {enableEdit ? (
              <textarea
                type="text"
                placeholder="Edit Bio."
                value={bio ? bio : author?.bio}
                onChange={(e) => setBio(e.target.value)}
                id="edit-bio"
                className="leading-[188%] text-gray-400 lg:text-lg bg-transparent border-none outline-none focus:border-none focus:outline-none  no-scrollbar w-full text-center min-h-fit"
                disabled={!wonProfile}
              />
            ) : (
              <p className="leading-[188%] text-gray-400 lg:text-lg bg-transparent  w-full text-center min-h-fit">
                {author?.bio}
              </p>
            )}
          </div>
          {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
          {wonProfile && (
            <label
              htmlFor="edit-bio"
              onClick={() => {
                setEnableEdit(true);
              }}
              className="flex-center h-7 w-7 rounded-full"
            >
              <img src={editBio} alt="Edit" />
            </label>
          )}
        </div>
        {(author?.firstName !== firstName ||
          author?.lastName !== lastName ||
          author?.bio !== bio ||
          avatar) && (
          <button
            onClick={updateProfile}
            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200 mt-5"
          >
            Save change
          </button>
        )}
        <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
      </div>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">
        {wonProfile ? "Your Blogs" : `${author?.firstName} Blogs`}
      </h4>
      <div className="my-6 space-y-4">
        {author?.blogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
