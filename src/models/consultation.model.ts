export interface ConsultationForm {
  object: string;
  description: string;
  evolution: boolean;
  file: string;
}

export interface Consultation extends ConsultationForm {
  id: string;
  date: string;
  doctor: string;
  patient: string;
  status: string;
}
