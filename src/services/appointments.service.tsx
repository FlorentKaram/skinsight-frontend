import { AppointmentForm } from "../models/appointment.model";
import { axiosInstance } from "./auth.services";

export const appointmentsServices = {
  // Créer une appointment
  createAppointment: (appointment: AppointmentForm): Promise<any> => {
    return axiosInstance.post("appointment", {
      ...appointment,
    });
  },

  // Récupérer une consultation
  getAppointment: (id: string): Promise<any> => {
    return axiosInstance.get(`appointment/${id}`);
  },

  //Récupérer les appointment d'un patient
  getAppointmentsByPatient: (id: string): Promise<any> => {
    return axiosInstance.get(`appointment/patient/${id}`);
  },

  //Récupérer les appointment d'un dermatologue
  getAppointmentsByDermatologist: (id: string): Promise<any> => {
    return axiosInstance.get(`appointment/dermatologist/${id}`);
  },
  // Récupérer toutes les appointment
  getAppointments: (): Promise<any> => {
    return axiosInstance.get("appointment");
  },
};
