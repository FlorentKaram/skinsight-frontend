import { ConsultationForm } from "../models/consultation.model";
import { axiosInstance } from "./auth.services";

export const consulatationsServices = {
  // Créer une consultation
  createConsultation: (consultation: ConsultationForm): Promise<any> => {
    return axiosInstance.post("consultations", {
      ...consultation,
    });
  },

  // Récupérer une consultation
  getConsultation: (id: string): Promise<any> => {
    return axiosInstance.get(`consultations/${id}`);
  },

  //Récupérer les consultations d'un patient
  getConsultationsByPatient: (id: string): Promise<any> => {
    return axiosInstance.get(`consultations/patient/${id}`);
  },

  //Récupérer les consultations d'un généraliste
  getConsultationsByGeneralist: (id: string): Promise<any> => {
    return axiosInstance.get(`consultations/generalist/${id}`);
  },

  //Récupérer les consultations d'un dermatologue
  getConsultationsByDermatologist: (id: string): Promise<any> => {
    return axiosInstance.get(`consultations/dermatologist/${id}`);
  },

  // Récupérer toutes les consultations
  getConsultations: (): Promise<any> => {
    return axiosInstance.get("consultations");
  },
};
