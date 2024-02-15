import { axiosInstance } from "./auth.services";

export const userServices = {

    getMyInfo: (): Promise<any> => {
        
        return axiosInstance.get("users/me");
    },

  getById: (id: string): Promise<any> => {
    return axiosInstance.get(`users/${id}`);
  },
};
