import { ReactElement, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Role } from "../../models/user.model";
import { authServices, axiosInstance } from "../../services/auth.services";
import { useLocalStorage } from "./useLocalStorage";
import { InternalAxiosRequestConfig } from "axios";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  // const [user, setUser] = useState<UserCookie | null>({
  //   userId: "e8cb6c59-0001-4ef3-a2ab-b62c764e3020",
  //   role: Role.PATIENT,
  //   firstName: "",
  //   lastName: "",
  //   access_token: "",
  // });

  const [user, setUser] = useLocalStorage("user", {
    userId: "",
    role: Role.PATIENT,
    firstName: "",
    lastName: "",
    access_token: "",
  });
  const navigate = useNavigate();

  //Intercept all requests and provide the token if it exists
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (user && user.access_token) {
        config.headers["Authorization"] = `Bearer ${user.access_token}`;
      }
      return config;
    },
    (error: Error) => {
      return Promise.reject(error);
    }
  );

  // Login
  const login = async (email: string, password: string) => {
    authServices
      .loginService(email, password)
      .then((response) => {
        // Set user context
        setUser(response.data);
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
