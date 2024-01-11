import { Role, Sex, User } from "./user.model";

export const defaultUser: User = {
  id: "",
  role: Role.PATIENT,
  sex: Sex.MALE,
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: new Date(),
  address: "",
  city: "",
  zipCode: "",
  secuNumber: "",
  rppsNumber: "",
  createdAt: "",
  updatedAt: "",
};

export enum EMODE {
  SIGNIN = "SIGNIN",
  REGISTER = "REGISTER",
}
