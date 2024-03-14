import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../assets/icons/search.svg";
import logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";
import Portal from "./Portal";
import Search from "./Search";
import Logout from "./auth/Logout";

function Navbar() {
  const { auth, setAuth } = useAuth();
  const [searchModal, setSearchModal] = useState(false);
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    setAuth(authData);
  }, []);

  return (
    <header>
      <nav className="container">
        {/* Logo */}
        <div>
          <Link to="/">
            <img className="w-32" src={logo} alt="lws" />
          </Link>
        </div>

        {/* Actions - Login, Write, Home, Search  */}
        {/* Notes for Developers  */}
        {/* For Logged in User - Write, Profile, Logout Menu  */}
        {/* For Not Logged in User - Login Menu  */}
        <div>
          <ul className="flex items-center space-x-5">
            {auth?.user && (
              <li>
                <Link
                  to="/create-blog"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              </li>
            )}

            <li>
              <button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setSearchModal((prev) => !prev)}
              >
                <img src={searchIcon} alt="Search" />
                <span>Search</span>
              </button>
            </li>
            {auth?.user ? (
              <Logout />
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              </li>
            )}

            {auth?.user && (
              <li>
                {/* Circular Div with background color */}
                <Link
                  to={`/profile/${auth?.user?.id}`}
                  className="flex items-center"
                >
                  <div className="avater-img bg-orange-600 text-white overflow-hidden">
                    {auth?.user?.avatar ? (
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_BASE_URL
                        }/uploads/avatar/${auth?.user?.avatar}`}
                        alt="user"
                      />
                    ) : (
                      <span className="">{auth?.user?.firstName[0]}</span>
                    )}

                    {/* User's first name initial */}
                  </div>

                  {/* Logged-in user's name */}
                  <p>
                    <span className="text-white ml-2">
                      {auth?.user?.firstName} {auth?.user?.lastName}
                    </span>
                  </p>
                </Link>
                {/* Profile Image */}
              </li>
            )}
          </ul>
        </div>
      </nav>
      {searchModal && (
        <Portal onClose={() => setSearchModal(false)}>
          <Search close={() => setSearchModal(false)} />
        </Portal>
      )}
    </header>
  );
}

export default Navbar;
