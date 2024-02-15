import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useState } from "react";

function MyAppointments() {
  const theme = useTheme();
  const [doctors] = useState<string[]>([
    "Dr Maboul",
    "Dr House",
    "Dr Who",
    "Dr Strange",
    "Dr Jekyll",
    "Dr Hyde",
    "Dr Dolittle",
    "Dr Watson",
  ]);
  return (
    <Box>
      <h2>Historique</h2>
      <List sx={{ height: 310, overflow: "auto" }}>
        {doctors.map((doctor, i) => (
          <ListItem
            secondaryAction={<Chip color="warning" label="En attente" />}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 2,
              my: 2,
            }}
            key={i}
          >
            <ListItemText primary={doctor} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default MyAppointments;
