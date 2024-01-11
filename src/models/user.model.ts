export interface UserData {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export interface UserForm {
  email: string;
  password: string;
  sex: Sex;
  dateOfBirth: Date;
  address: string;
  city: string;
  zipCode: number;
}

interface UserMetaData {
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

interface SecuNumber {
  secuNumber: number | undefined;
}

interface RppsNumber {
  rppsNumber: number | undefined;
}

export type User = UserData & UserForm & SecuNumber & RppsNumber & UserMetaData;

export type PatientUser = UserData & UserForm & SecuNumber;

export type ProfessionalUser = UserData & UserForm & RppsNumber;

export enum Role {
  ADMIN = "ADMIN",
  DERMATOLOGIST = "DERMATOLOGIST",
  GENERALIST = "GENERALIST",
  PATIENT = "PATIENT",
}

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum AuthType {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}
