import { User } from "../models/user.model";
import { axiosInstance } from "./auth.services";

export const userServices = {
  getMyInfo: (): Promise<any> => {
    return axiosInstance.get("users/me");
  },

  getById: (id: string): Promise<User> => {
    return axiosInstance.get(`users/${id}`).then((res) => res.data);
  },
};
