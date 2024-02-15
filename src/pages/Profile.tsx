import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { PatientUser, Role, Sex } from "../models/user.model";
import ProfileInfoField from "../globalcomponents/ProfileInfoField";
import { useAuth } from "../router/hooks/useAuth";
import { userServices } from "../services/user.services";
import { useQuery } from "react-query";

function Profile() {
  const { user } = useAuth();
  const [patientUser, setPatientUser] = useState<PatientUser>({
    userId: "1",
    email: "",
    password: "",
    role: Role.PATIENT,
    firstName: "John",
    lastName: "",
    dateOfBirth: new Date(),
    sex: Sex.MALE,
    address: "",
    zipCode: 0,
    city: "",
    secuNumber: 0,
  });

  const { isLoading, error, data } = useQuery("user", () =>
    userServices.getById(user?.userId ?? "").then((res) => {
      return res.data as PatientUser;
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: ";

  return data ? (
    <Box>
      <h2>Mes informations</h2>
      <Box display="flex">
        <Box>
          <Box>Nom: {data.lastName}</Box>
          <Box>Prénom: {data.firstName}</Box>
          <Box>
            Date de naissance:{" "}
            {new Date(data.dateOfBirth).toLocaleDateString("fr-FR")}
          </Box>
          <Box>Sexe: {data.sex}</Box>
          <Box>Adresse mail: {data.email}</Box>
          <Box>Adresse: {data.address}</Box>
          <Box>Code postal: {data.zipCode}</Box>
          <Box>Ville: {data.city}</Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box>Vous n'êtes pas connecté</Box>
  );
}

export default Profile;
