import { ConsultationForm } from "../models/consultation.model";
import { axiosInstance } from "./auth.services";

export const consulatationsServices = {
  createConsultation: (consultation: ConsultationForm): Promise<any> => {
    return axiosInstance.post("consultations", {
      consultation,
    });
  },
};
