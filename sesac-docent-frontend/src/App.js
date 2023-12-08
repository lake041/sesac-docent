import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RootLayout from "./components/layout/RootLayout";
import AdminLayout from "./components/layout/AdminLayout";
import AdminSupport from "./pages/admin/AdminSupport";
import AdminBoard from "./pages/admin/AdminBoard";
import AdminInfo from "./pages/admin/AdminInfo";
import AdminHome from "./pages/admin/AdminHome";
import AdminUser from "./pages/admin/AdminUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "user", element: <AdminUser /> },
      { path: "support", element: <AdminSupport /> },
      { path: "board", element: <AdminBoard /> },
      { path: "info", element: <AdminInfo /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
