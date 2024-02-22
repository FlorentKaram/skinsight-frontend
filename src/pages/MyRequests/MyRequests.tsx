import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  Consultation,
  ConsultationForm,
} from "../../models/consultation.model";
import { Role } from "../../models/user.model";
import { useAuth } from "../../router/hooks/useAuth";
import { consulatationsServices } from "../../services/consultations.services";
import CreateRequestDialog from "./CreateRequestDialog";
import VisualizeRequestDialog from "./VisualizeRequestDialog";

function MyRequests() {
  const theme = useTheme();
  const { user } = useAuth();

  // Dialog
  const [openCreationDialog, setOpenCreationDialog] = useState(false);
  const handleClickOpenCreationDialog = () => {
    setOpenCreationDialog(true);
  };
  const handleCloseCreationDialog = () => {
    setOpenCreationDialog(false);
  };
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
    (): Promise<Consultation[]> | null => {
      switch (user!.role) {
        case Role.PATIENT:
          return consulatationsServices
            .getConsultationsByPatient(user!.userId)
            .then((res) => res.data);
        case Role.GENERALIST:
          return consulatationsServices
            .getConsultationsByGeneralist(user!.userId)
            .then((res) => res.data);
        case Role.DERMATOLOGIST:
          return consulatationsServices
            .getConsultationsByDermatologist(user!.userId)
            .then((res) => res.data);
        default:
          return null;
      }
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: ";
  console.log(data);
  return data ? (
    <Box>
      <h2>Historique</h2>
      <List sx={{ height: 310, overflow: "auto" }}>
        {data.map((consultation, i) => (
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="view"
                onClick={() => {
                  setConsultationSelected(consultation);
                  handleClickOpenVisualizationDialog();
                }}
              >
                <VisibilityIcon />
              </IconButton>
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
      <VisualizeRequestDialog
        open={openVisualizationDialog}
        handleClose={handleCloseVisualizationDialog}
        consultation={consultationSelected as ConsultationForm}
      />
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={[
            {
              backgroundColor: theme.palette.primary.main,
              borderRadius: "5px",
              px: 9,
              py: 1,
              color: theme.palette.common.white,
              mt: 4,
            },
          ]}
          onClick={handleClickOpenCreationDialog}
        >
          <Box sx={{ fontSize: 17, fontWeight: 600 }}>
            <p>DEPOSER UNE NOUVELLE PHOTO</p>
          </Box>
        </Button>
        <CreateRequestDialog
          open={openCreationDialog}
          handleClose={handleCloseCreationDialog}
          refetch={refetch}
        />
      </Box>
    </Box>
  ) : null;
}

export default MyRequests;
