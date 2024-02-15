import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { PatientUser, Role, Sex } from "../models/user.model";
import ProfileInfoField from "../globalcomponents/ProfileInfoField";
import { useAuth } from "../router/hooks/useAuth";
import { userServices } from "../services/user.services";

function Profile() {
  const { user } = useAuth();
  const [patientUser, setPatientUser] = useState<PatientUser>({
    id: "1",
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

  useEffect(() => {
    if (user) {
      userServices.getById(user.id).then((res) => {
        setPatientUser(res);
      });
    }
  }, []);

  return patientUser ? (
    <Box>
      <h2>Mes informations</h2>
      <Box display="flex">
        <Box>
          <ProfileInfoField label="Nom" data={patientUser.lastName} />
          <Box>Prénom: {patientUser.firstName}</Box>
          <Box>Date de naissance: {patientUser.dateOfBirth.toISOString()}</Box>
          <Box>Sexe: {patientUser.sex}</Box>
          <Box>Adresse mail: {patientUser.email}</Box>
          <Box>Adresse: {patientUser.address}</Box>
          <Box>Code postal: {patientUser.zipCode}</Box>
          <Box>Ville: {patientUser.city}</Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <Box>Vous n'êtes pas connecté</Box>
  );
}

export default Profile;
