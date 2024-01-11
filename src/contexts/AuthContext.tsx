import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../models/user.model";
import { defaultUser } from "../models/auth";

interface AuthContextType {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
}

const defaultAuthContext = {
  user: defaultUser,
  setUser: () => {},
  isConnected: true,
  setIsConnected: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
