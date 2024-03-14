export interface ConsultationForm {
  object: string;
  description: string;
  evolution: boolean;
  files: string[];
  patientId: string;
  advice?: string;
  criticality?: Criticality;
}

export interface Consultation extends ConsultationForm {
  id: string;
  dermatologistId: string;
  patientId: string;
  genelasitId: string;
  status: Status;
}

export enum Status {
  PENDING = "PENDING",
  ANALYZED = "ANALYZED",
  APPOINTMENT = "APPOINTMENT",
  DONE = "DONE",
}

export enum Criticality {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}
