import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { Appointment } from "../../models/appointment.model";
import { useQuery } from "react-query";
import { Role } from "../../models/user.model";
import { useAuth } from "../../router/hooks/useAuth";
import { appointmentsServices } from "../../services/appointments.service";

function MyAppointments() {
  const { user } = useAuth();
  const theme = useTheme();
  // Fetch requests
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
          return null;
      }
    }
  );

  if (isLoading) return "Loading appointments...";

  if (error) return "An error has occurred: ";

  return data ? (
    <Box>
      <h2>Historique</h2>
      <List sx={{ height: 310, overflow: "auto" }}>
        {data.map((appointment, i) => (
          <ListItem
            secondaryAction={<Chip color="warning" label="En attente" />}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 2,
              my: 2,
            }}
            key={i}
          >
            <ListItemText primary={appointment.date} />
          </ListItem>
        ))}
      </List>
    </Box>
  ) : null;
}

export default MyAppointments;
