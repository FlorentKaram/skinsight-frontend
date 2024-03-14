import { Box, List, ListItem, ListItemText, useTheme } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  Consultation,
  ConsultationForm,
} from "../../models/consultation.model";
import { Role } from "../../models/user.model";
import { useAuth } from "../../router/hooks/useAuth";
import { consulatationsServices } from "../../services/consultations.services";
import CreateConsultationDialog from "./CreateConsultationDialog";
import VisualizeConsultationDialog from "./VisualizeConsultation.tsx/VisualizeConsultationDialog";
import ChipsStatus from "../MyAppointments/ChipsStatus";
import VisualizeRequestButton from "./VisualizeConsultation.tsx/VisualizeConsultationButton";
import GetConsultationButton from "./GetConsultationButton";

function Consultations() {
  const theme = useTheme();
  const { user } = useAuth();

  // Dialog
  const [openVisualizationDialog, setOpenVisualizationDialog] = useState(false);
  const handleClickOpenVisualizationDialog = () => {
    setOpenVisualizationDialog(true);
  };
  const handleCloseVisualizationDialog = () => {
    setOpenVisualizationDialog(false);
  };

  const [consultationSelected, setConsultationSelected] =
    useState<ConsultationForm>();

  // Fetch requests
  const { isLoading, error, data, refetch } = useQuery(
    "consultations",
    (): Promise<Consultation[]> | null =>
      consulatationsServices.getConsultationsByUser(user!.userId, user!.role),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: ";
  return user && data ? (
    <Box>
      <h2>Consultations</h2>
      <List sx={{ overflow: "auto", maxHeight: "47vh" }}>
        {data.map((consultation, i) => (
          <ListItem
            secondaryAction={
              <>
                <ChipsStatus status={consultation.status} />
                <VisualizeRequestButton
                  consultation={consultation}
                  setConsultationSelected={setConsultationSelected}
                  handleClickOpenVisualizationDialog={
                    handleClickOpenVisualizationDialog
                  }
                />
              </>
            }
            sx={{
              backgroundColor: theme.palette.secondary.main,
              borderRadius: 2,
              my: 2,
            }}
            key={i}
          >
            <ListItemText primary={consultation.object} />
          </ListItem>
        ))}
      </List>
      <VisualizeConsultationDialog
        open={openVisualizationDialog}
        handleClose={handleCloseVisualizationDialog}
        consultation={consultationSelected as Consultation}
        refetch={refetch}
      />
      {user.role === Role.PATIENT ? (
        <CreateConsultationDialog refetch={refetch} />
      ) : (
        <GetConsultationButton refetch={refetch} />
      )}
    </Box>
  ) : null;
}

export default Consultations;
