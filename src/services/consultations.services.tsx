import { Consultation, ConsultationForm } from "../models/consultation.model";
import { Role } from "../models/user.model";
import { axiosInstance } from "./auth.services";

export const consulatationsServices = {
  // Créer une consultation
  createConsultation: (consultation: ConsultationForm): Promise<any> => {
    return axiosInstance.post("consultations", {
      ...consultation,
    });
  },

  getConsultationsByUser: (id: string, role: Role): Promise<Consultation[]> => {
    switch (role) {
      case Role.PATIENT:
        return consulatationsServices
          .getConsultationsByPatient(id)
          .then((res) => res.data);
      case Role.GENERALIST:
        return consulatationsServices
          .getConsultationsByGeneralist(id)
          .then((res) => res.data);
      case Role.DERMATOLOGIST:
        return consulatationsServices
          .getConsultationsByDermatologist(id)
          .then((res) => res.data);
      default:
        return Promise.resolve([]);
    }
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

  //Récupérer une nouvelle consultation pour un généraliste
  getNewConsultationForGeneralist: (id: string): Promise<any> => {
    return axiosInstance.post(`users/generalist/${id}/getConsultation`);
  },

  //Récupérer une nouvelle consultation pour un dermatologue
  getNewConsultationForDermatologist: (id: string): Promise<any> => {
    return axiosInstance.post(`users/dermatologist/${id}/getConsultation`);
  },

  //update consultation by id
  updateConsultation: (
    id: string,
    consultation: Consultation
  ): Promise<any> => {
    return axiosInstance.patch(`consultations/${id}`, {
      ...consultation,
    });
  },
};
