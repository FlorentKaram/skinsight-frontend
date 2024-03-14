export interface AppointmentForm {
  date: string;
  patientId: string;
}

export interface Appointment extends AppointmentForm {
  id: string;
  date: string;
  doctor: string;
  patientId: string;
  dermatologistId: string;
  consultationId: string;
}
