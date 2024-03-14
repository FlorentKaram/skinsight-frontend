import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../pages/MainLayout/MainLayout";
import { AuthenticatedRoute, AuthorizedRoute } from "./ProtectedRoutes";
import Home from "../pages/Home/Home";
import { AuthLayout } from "./AuthLayout";
import Consultations from "../pages/MyRequests/Consultations";
import MyAppointments from "../pages/MyAppointments/MyAppointments";
import Profile from "../pages/Profile";
import Messages from "../pages/Messages/Messages";

export const router = createBrowserRouter(
  [
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
              children: [
                {
                  path: "my-requests",
                  element: (
                    <AuthorizedRoute>
                      <Consultations />
                    </AuthorizedRoute>
                  ),
                },
                {
                  path: "my-appointments",
                  element: (
                    <AuthorizedRoute>
                      <MyAppointments />
                    </AuthorizedRoute>
                  ),
                },
                {
                  path: "messages",
                  element: (
                    <AuthorizedRoute>
                      <Messages />
                    </AuthorizedRoute>
                  ),
                },
                {
                  path: "my-profile",
                  element: (
                    <AuthorizedRoute>
                      <Profile />
                    </AuthorizedRoute>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/dev",
  }
);
