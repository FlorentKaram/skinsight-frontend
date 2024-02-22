import { AppointmentForm } from "../models/appointment.model";
import { axiosInstance } from "./auth.services";

export const appointmentsServices = {
  // Créer une appointment
  createAppointment: (appointment: AppointmentForm): Promise<any> => {
    return axiosInstance.post("appointments", {
      ...appointment,
    });
  },

  // Récupérer une consultation
  getAppointment: (id: string): Promise<any> => {
    return axiosInstance.get(`appointments/${id}`);
  },

  //Récupérer les appointments d'un patient
  getAppointmentsByPatient: (id: string): Promise<any> => {
    return axiosInstance.get(`appointments/patient/${id}`);
  },

  //Récupérer les appointments d'un dermatologue
  getAppointmentsByDermatologist: (id: string): Promise<any> => {
    return axiosInstance.get(`appointments/dermatologist/${id}`);
  },
  // Récupérer toutes les appointments
  getAppointments: (): Promise<any> => {
    return axiosInstance.get("appointments");
  },
};
