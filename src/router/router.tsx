import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/MainLayout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoutes";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
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
]);
