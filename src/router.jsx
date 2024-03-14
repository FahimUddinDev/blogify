import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Search from "./component/Search";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Home from "./pages/home";

// import {
//   createContactAction,
//   deleteContactAction,
//   editContactAction,
//   updateContactFavorite,
// } from "./actions/contactsActions";
// import { getContactLoader, getContactsLoader } from "./loaders/contactsLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    // loader: getContactsLoader,
    // action: createContactAction,
    children: [
      {
        // errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/blog/:blogId",
            element: <Blog />,
            // loader: getContactLoader,
            // action: updateContactFavorite,
          },
          {
            path: "/create-blog",
            element: <CreateBlog />,
            // loader: getContactLoader,
            // action: editContactAction,
          },
          {
            path: "/edit/:blogId",
            element: <CreateBlog />,
            // loader: getContactLoader,
            // action: editContactAction,
          },
          {
            path: "/login",
            element: <Login />,
            // loader: getContactLoader,
            // action: editContactAction,
          },
          {
            path: "/register",
            element: <Register />,
            // loader: getContactLoader,
            // action: editContactAction,
          },
          {
            path: "/profile/:authorId",
            element: <Profile />,
            // loader: getContactLoader,
            // action: editContactAction,
          },
          {
            path: "/search",
            element: <Search />,
            // loader: getContactLoader,
            // action: editContactAction,
          },
        ],
      },
    ],
  },
]);

export default router;
