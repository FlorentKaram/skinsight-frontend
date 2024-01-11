import { createBrowserRouter, defer } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/MainLayout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoutes";
import Home from "../pages/Home/Home";
import { AuthLayout } from "./AuthLayout";

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    loader: () => defer({ userPromise: getUserData() }),
    children: [
      {
        element: <App />,
        path: "/",
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "/",
            element: (
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
