import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/home" />;
  }
  return children;
};
