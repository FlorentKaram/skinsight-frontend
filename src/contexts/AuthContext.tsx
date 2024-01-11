import { createContext } from "react";
import { Role, UserData } from "../models/user.model";

interface AuthContextType {
  user: { data: UserData; token: string };
  setUser: (user: { data: UserData; token: string }) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultAuthContext = {
  id: "0",
  role: Role.PATIENT,
  firstName: "",
  lastName: "",
};

export const AuthContext = createContext<AuthContextType>({
  user: { data: defaultAuthContext, token: "" },
  setUser: () => {},
  login: async (email: string, password: string) => {},
  logout: async () => {},
});
