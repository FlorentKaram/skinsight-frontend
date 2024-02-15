import { createBrowserRouter, defer } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/MainLayout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoutes";
import Home from "../pages/Home/Home";
import { AuthLayout } from "./AuthLayout";
import MyRequests from "../pages/MyRequests/MyRequests";
import Profile from "../pages/Profile";
import MyAppointments from "../pages/MyAppointments";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <App />,
        path: "/",
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            element: (
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            ),
            children: [
              { element: <MyRequests />, path: "my-requests" },
              { element: <MyAppointments />, path: "my-appointments" },
              { element: <Profile />, path: "my-profile" },
            ],
          },
        ],
      },
    ],
  },
]);
