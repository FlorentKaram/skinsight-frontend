import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/MainLayout/MainLayout";
import { AuthenticatedRoute, AuthorizedRoute } from "./ProtectedRoutes";
import Home from "../pages/Home/Home";
import { AuthLayout } from "./AuthLayout";
import MyRequests from "../pages/MyRequests/MyRequests";
import Profile from "../pages/Profile";
import MyAppointments from "../pages/MyAppointments/MyAppointments";

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
              <AuthenticatedRoute>
                <MainLayout />
              </AuthenticatedRoute>
            ),
            children: AuthorizedRoute(),
          },
        ],
      },
    ],
  },
]);
