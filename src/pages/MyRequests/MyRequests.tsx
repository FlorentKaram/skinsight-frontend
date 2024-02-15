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
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateRequestDialog from "./CreateRequestDialog";
import { useQuery } from "react-query";
import { consulatationsServices } from "../../services/consultations.services";
import { ConsultationForm } from "../../models/consultation.model";
import VisualizeRequestDialog from "./VisualizeRequestDialog";

function MyRequests() {
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

  // Fetch data
  const { isLoading, error, data } = useQuery("consultations", () =>
    consulatationsServices.getConsultations().then((res) => {
      return res.data as ConsultationForm[];
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: ";

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
                onClick={handleClickOpenVisualizationDialog}
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
            <VisualizeRequestDialog
              open={openVisualizationDialog}
              handleClose={handleCloseVisualizationDialog}
              consultation={consultation}
            />
            <ListItemText primary={consultation.object} />
          </ListItem>
        ))}
      </List>
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
        />
      </Box>
    </Box>
  ) : null;
}

export default MyRequests;
