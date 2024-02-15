import { ReactElement, useContext, useMemo, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { authServices, axiosInstance } from "../../services/auth.services";
import { Role, UserCookie } from "../../models/user.model";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

// const httpHost = process.env.REACT_APP_HTTP_HOST;

export interface JwtState {
  token: string;
  sub: number | null;
  iat: number | null;
  exp: number | null;
  scopes: number | null;
}

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<UserCookie | null>({
    userId: "0",
    role: Role.PATIENT,
    firstName: "",
    lastName: "",
    access_token: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );
  const navigate = useNavigate();

  //Intercept all requests and provide the token if it exists
  axiosInstance.interceptors.request.use(
    (config) => {
      if (user && user.access_token) {
        config.headers["Authorization"] = `Bearer ${user.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //Intercept all responses and refresh the token if it's expired
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Access Token was expired

        if (
          err.response.status === 401 &&
          !originalConfig._retry &&
          isAuthenticated
        ) {
          originalConfig._retry = true;
          try {
            const response = await authServices.getAccessToken();
            const accessToken = response.data;
            if (user) {
              setUser({ ...user, access_token: accessToken });
            }
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            return axiosInstance(originalConfig);
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
      }
      return Promise.reject(err);
    }
  );

  // Login
  const login = async (email: string, password: string) => {
    authServices
      .loginService(email, password)
      .then((response) => {
        // Set user context
        setUser(response.data);
        setIsAuthenticated(true);
        navigate("/my-requests");
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  // Logout
  const logout = async () => {
    authServices.logoutService().then(() => {
      setUser(null);
    });
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
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
