import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../models/auth";

interface AuthContextType {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  isConnected: boolean;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
}

const defaultAuthContext = {
  users: [{ username: "cyril", password: "pwd" }],
  setUsers: () => {},
  isConnected: true,
  setIsConnected: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
