import { ObjectSchema, date, mixed, number, object, string } from "yup";
import { PatientUser, ProfessionalUser, Role, Sex } from "../models/user.model";

export const loginValidationSchema = object({
  email: string().email("Email non valide").required("Email requis"),
  password: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Mot de passe requis"),
});

export const patientRegisterValidationSchema: ObjectSchema<PatientUser> =
  object({
    userId: string().defined(),
    role: mixed<Role>().oneOf(Object.values(Role)).defined(),
    lastName: string().required("Nom requis"),
    firstName: string().required("Prénom requis"),
    dateOfBirth: date().required("Date de naissance requise"),
    sex: mixed<Sex>().oneOf(Object.values(Sex)).required("Sexe requis"),
    address: string().required("Adresse requise"),
    city: string().required("Ville requise"),
    zipCode: number().required("Code postal requis"),
    secuNumber: number()
      .typeError("Seul les nombres sont acceptés")
      .required("Numéro de sécurité sociale requis"),
    email: string().email("Email non valide").required("Email requis"),
    password: string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Mot de passe requis"),
  });

export const professionalRegisterValidationSchema: ObjectSchema<ProfessionalUser> =
  object({
    userId: string().defined(),
    role: mixed<Role>().oneOf(Object.values(Role)).defined(),
    lastName: string().required("Nom requis"),
    firstName: string().required("Prénom requis"),
    dateOfBirth: date().required("Date de naissance requise"),
    sex: mixed<Sex>().oneOf(Object.values(Sex)).required("Sexe requis"),
    address: string().required("Adresse requise"),
    city: string().required("Ville requise"),
    zipCode: number().required("Code postal requis"),
    rppsNumber: number()
      .typeError("Seul les nombres sont acceptés")
      .required("Numéro RPPS requis"),
    email: string().email("Email non valide").required("Email requis"),
    password: string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Mot de passe requis"),
  });
