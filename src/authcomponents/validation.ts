import { date, mixed, number, object, string } from "yup";
import { Sex } from "../models/user.model";

export const loginValidationSchema = object({
  email: string().email("Email non valide").required("Email requis"),
  password: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe requis"),
});

export const patientRegisterValidationSchema = object({
  lastName: string().required("Nom requis"),
  firstName: string().required("Prénom requis"),
  dateOfBirth: date().required("Date de naissance requise"),
  sex: mixed<Sex>().oneOf(Object.values(Sex)).required("Sexe requis"),
  address: string().required("Adresse requise"),
  secuNumber: number()
    .typeError("Seul les nombres sont acceptés")
    .required("Numéro de sécurité sociale requis"),
  email: string().email("Email non valide").required("Email requis"),
  password: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe requis"),
});

export const professionalRegisterValidationSchema = object({
  lastName: string().required("Nom requis"),
  firstName: string().required("Prénom requis"),
  dateOfBirth: date().required("Date de naissance requise"),
  sex: mixed<Sex>().oneOf(Object.values(Sex)).required("Sexe requis"),
  address: string().required("Adresse requise"),
  rppsNumber: string().required("Numéro RPPS requis"),
  email: string().email("Email non valide").required("Email requis"),
  password: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe requis"),
});
