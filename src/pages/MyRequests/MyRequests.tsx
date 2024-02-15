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
import MyRequestsDialog from "./MyRequestsDialog";

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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <h2>Historique</h2>
      <List sx={{ height: 310, overflow: "auto" }}>
        {doctors.map((doctor, i) => (
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="view">
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
            <ListItemText primary={doctor} />
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
          onClick={handleClickOpen}
        >
          <Box sx={{ fontSize: 17, fontWeight: 600 }}>
            <p>DEPOSER UNE NOUVELLE PHOTO</p>
          </Box>
        </Button>
        <MyRequestsDialog open={open} handleClose={handleClose} />
      </Box>
    </Box>
  );
}

export default MyRequests;
