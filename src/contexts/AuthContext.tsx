import { createContext } from "react";
import { Role, UserCookie } from "../models/user.model";

interface AuthContextType {
  user: UserCookie | null;
  setUser: (user: UserCookie) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultAuthContext = {
  userId: "0",
  role: Role.PATIENT,
  firstName: "",
  lastName: "",
};

export const AuthContext = createContext<AuthContextType>({
  user: { ...defaultAuthContext, access_token: "" },
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
});
