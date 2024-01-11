export interface UserData {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
}

export interface User extends UserData {
  email: string;
  password: string;
  sex: Sex;
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
