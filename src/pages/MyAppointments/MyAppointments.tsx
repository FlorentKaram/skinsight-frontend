import { Box, List } from "@mui/material";
import { Appointment } from "../../models/appointment.model";
import { useQuery } from "react-query";
import { Role } from "../../models/user.model";
import { useAuth } from "../../router/hooks/useAuth";
import { appointmentsServices } from "../../services/appointments.service";
import Appointement from "./Appointement";

function MyAppointments() {
  const { user } = useAuth();

  // Fetch requests
  const { isLoading, error, data } = useQuery(
    "appointments",
    (): Promise<Appointment[]> | null => {
      switch (user!.role) {
        case Role.PATIENT:
          return appointmentsServices
            .getAppointmentsByPatient(user!.userId)
            .then((res) => res.data);
        case Role.DERMATOLOGIST:
          return appointmentsServices
            .getAppointmentsByDermatologist(user!.userId)
            .then((res) => res.data);
        default:
          return Promise.resolve([]);
      }
    }
  );

  if (isLoading) return "Loading appointments...";

  if (error) return "An error has occurred: ";

  return (
    data && (
      <Box>
        <h2>Historique</h2>
        <List sx={{ height: 310, overflow: "auto" }}>
          {data.map((appointment) => (
            <Appointement appointment={appointment} key={appointment.id} />
          ))}
        </List>
      </Box>
    )
  );
}

export default MyAppointments;
