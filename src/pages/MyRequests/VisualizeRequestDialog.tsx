import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useQuery } from "react-query";
import { ConsultationForm } from "../../models/consultation.model";

interface ChildProps {
  open: boolean;
  handleClose: () => void;
  consultation: ConsultationForm;
}

function VisualizeRequestDialog({
  open,
  handleClose,
  consultation,
}: ChildProps) {
  return consultation ? (
    <Dialog open={open}>
      <DialogTitle>Préconsultation - {consultation.object}</DialogTitle>
      <DialogContent>{consultation.description}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fermer</Button>
        <Button variant="contained">Prendre rendez-vous</Button>
      </DialogActions>
    </Dialog>
  ) : null;
}

export default VisualizeRequestDialog;
