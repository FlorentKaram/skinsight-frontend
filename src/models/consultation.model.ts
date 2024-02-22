export interface ConsultationForm {
  object: string;
  description: string;
  evolution: boolean;
  file: string;
  patientId: string;
}

export interface Consultation extends ConsultationForm {
  id: string;
  doctor: string;
  patient: string;
  status: string;
}
