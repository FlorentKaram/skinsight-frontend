import { ReactElement } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Role } from "../models/user.model";
import MyRequests from "../pages/MyRequests/MyRequests";
import MyAppointments from "../pages/MyAppointments/MyAppointments";
import Profile from "../pages/Profile";

export const AuthenticatedRoute = ({
  children,
}: {
  children: ReactElement;
}) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export const AuthorizedRoute = (): RouteObject[] | undefined => {
  const { user } = useAuth();
  switch (user!.role) {
    case Role.PATIENT:
      return [
        { element: <MyRequests />, path: "my-requests" },
        { element: <MyAppointments />, path: "my-appointments" },
        { element: <Profile />, path: "my-profile" },
      ];
    case Role.GENERALIST:
      return [
        { element: <MyRequests />, path: "my-requests" },
        { element: <MyAppointments />, path: "my-appointments" },
        { element: <Profile />, path: "my-profile" },
      ];
    case Role.DERMATOLOGIST:
      return [
        { element: <MyRequests />, path: "my-requests" },
        { element: <MyAppointments />, path: "my-appointments" },
        { element: <Profile />, path: "my-profile" },
      ];
  }
};
