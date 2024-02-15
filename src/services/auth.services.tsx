import axios from "axios";
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
      .post("auth/patient/register", {
        ...patient,
      })
      .then((response) => {
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
  },

  professionalRegisterService: (professional: ProfessionalUser) => {
    return axiosInstance
      .post("auth/professional/register", {
        ...professional,
      })
      .then((response) => {
        return response.data;
      })
      .catch(function (error: any) {
        console.log(error);
      });
  },

  getAccessToken: () => {
    return axiosInstance.post("auth/refresh");
  },
};
