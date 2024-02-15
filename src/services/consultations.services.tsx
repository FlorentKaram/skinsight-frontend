import { ConsultationForm } from "../models/consultation.model";
import { axiosInstance } from "./auth.services";

export const consulatationsServices = {
  // Créer une consultation
  createConsultation: (consultation: ConsultationForm): Promise<any> => {
    return axiosInstance.post("consultations", {
      consultation,
    });
  },

  // Récupérer une consultation
  getConsultation: (id: string): Promise<any> => {
    return axiosInstance.get(`consultations/${id}`);
  },

  // Récupérer toutes les consultations
  getConsultations: (): Promise<any> => {
    return axiosInstance.get("consultations");
  },
};
