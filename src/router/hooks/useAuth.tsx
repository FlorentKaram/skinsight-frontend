import { ReactElement, useContext, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../contexts/AuthContext";
import { loginService } from "../../services/auth.services";

// const httpHost = process.env.REACT_APP_HTTP_HOST;

export interface JwtState {
  token: string;
  sub: number | null;
  iat: number | null;
  exp: number | null;
  scopes: number | null;
}

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (email: string, password: string) => {
    loginService(email, password).then((data: any) => {
      //TODO
      const token = data.access_token;
      const jwtData = jwtDecode(token) as JwtState;
      console.log(data);
    });
  };

  const logout = async () => {
    fetch(`${process.env.REACT_APP_API_URL}auth/patient/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer {token}",
      },
    }).then(() => {
      setUser(null);
    });
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
