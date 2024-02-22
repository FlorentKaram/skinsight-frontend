import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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

const PATIENT_ROUTES: ReactElement[] = [
  <MyRequests />,
  <MyAppointments />,
  <Profile />,
];

const GENERALIST_ROUTES: ReactElement[] = [
  <MyRequests />,
  <MyAppointments />,
  <Profile />,
];

const DERMATOLOGIST_ROUTES: ReactElement[] = [
  <MyRequests />,
  <MyAppointments />,
  <Profile />,
];

export const AuthorizedRoute = ({
  children,
}: {
  children: ReactElement;
}): ReactElement | undefined => {
  const { user } = useAuth();
  console.log(children, PATIENT_ROUTES, PATIENT_ROUTES.includes(children));

  switch (user!.role) {
    case Role.PATIENT:
      if (PATIENT_ROUTES.find((route) => route.type === children.type)) {
        return children;
      }
      break;
    case Role.GENERALIST:
      if (GENERALIST_ROUTES.find((route) => route.type === children.type)) {
        return children;
      }
      break;
    case Role.DERMATOLOGIST:
      if (DERMATOLOGIST_ROUTES.find((route) => route.type === children.type)) {
        return children;
      }
      break;
    default:
      return <Navigate to="/" />;
  }
};
