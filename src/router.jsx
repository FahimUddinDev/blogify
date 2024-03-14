import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import PrivateRoutes from "./component/PriveteRoute";
import Search from "./component/Search";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/blog/:blogId",
            element: <Blog />,
          },
          {
            path: "/create-blog",
            element: (
              <PrivateRoutes>
                <CreateBlog />
              </PrivateRoutes>
            ),
          },
          {
            path: "/edit/:blogId",
            element: (
              <PrivateRoutes>
                <CreateBlog />
              </PrivateRoutes>
            ),
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/profile/:authorId",
            element: (
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            ),
          },
          {
            path: "/search",
            element: <Search />,
          },
        ],
      },
    ],
  },
]);

export default router;
