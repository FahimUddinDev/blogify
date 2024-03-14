import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import Layout from "./component/Layout";
import Navbar from "./component/Navbar";
import BlogProvider from "./providers/BlogProvider";
import AuthProvider from "./providers/authProviders";

function Root() {
  return (
    <div className="bg-[#030317] text-white">
      <AuthProvider>
        <BlogProvider>
          <Navbar />
          <Layout>
            <Outlet />
          </Layout>
          <Footer />
        </BlogProvider>
      </AuthProvider>
    </div>
  );
}

export default Root;
