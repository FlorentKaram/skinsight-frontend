import axios, { AxiosResponse } from "axios";
import { PatientUser, ProfessionalUser } from "../models/user.model";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const authServices = {
  loginService: (email: string, password: string): Promise<any> => {
    return axiosInstance.post("auth/login", {
      email,
      password,
    });
  },

  logoutService: (): Promise<any> => {
    return axiosInstance.post("auth/logout");
  },

  patientRegisterService: (patient: PatientUser) => {
    return axiosInstance
      .post("auth/register", {
        ...patient,
      })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  },

  professionalRegisterService: (professional: ProfessionalUser) => {
    return axiosInstance
      .post("auth/register", {
        ...professional,
      })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  },

  getAccessToken: () => {
    return axiosInstance.post("auth/refresh");
  },
};
