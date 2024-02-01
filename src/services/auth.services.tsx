import { PatientUser, ProfessionalUser } from "../models/user.model";

export const loginService = async (email: string, password: string) => {
  return fetch(`${import.meta.env.VITE_API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    response.json();
  });
};

export const patientRegisterService = async (patient: PatientUser) => {
  return fetch(`${import.meta.env.VITE_API_URL}auth/patient/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...patient }),
  }).then((response) => {
    response.json();
  });
};

export const professionalRegisterService = async (
  professional: ProfessionalUser
) => {
  return fetch(`${import.meta.env.VITE_API_URL}auth/professional/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...professional }),
  }).then((response) => {
    response.json();
  });
};
