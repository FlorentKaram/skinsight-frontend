import { Chip, ListItem, ListItemText, useTheme } from "@mui/material";
import { userServices } from "../../services/user.services";
import { Appointment } from "../../models/appointment.model";
import { useQuery } from "react-query";

interface ChildProps {
  appointment: Appointment;
}
function Appointement({ appointment }: ChildProps) {
  const theme = useTheme();
  const displayDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR");
  };

  //Fetch request
  const { isLoading, error, data } = useQuery("doctor", () =>
    userServices.getById(appointment.dermatologistId)
  );
  if (isLoading) return "Loading appointments...";

  if (error) return "An error has occurred: ";

  return (
    data && (
      <ListItem
        secondaryAction={<Chip label={displayDate(appointment.date)} />}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 2,
          my: 2,
        }}
      >
        <ListItemText primary={data.firstName} />
      </ListItem>
    )
  );
  return null;
}

export default Appointement;
