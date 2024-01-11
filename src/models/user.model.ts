export interface User {
  id: string;
  role: Role;
  sex: Sex;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  zipCode: string;
  secuNumber: string | undefined;
  rppsNumber: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

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
