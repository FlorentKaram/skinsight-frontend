import { IconButton } from "@mui/material";
import React from "react";
import {
  Consultation,
  ConsultationForm,
} from "../../../models/consultation.model";
import VisibilityIcon from "@mui/icons-material/Visibility";
interface ChildProps {
  consultation: Consultation;
  setConsultationSelected: React.Dispatch<
    React.SetStateAction<ConsultationForm | undefined>
  >;
  handleClickOpenVisualizationDialog: () => void;
}
function VisualizeRequestButton({
  consultation,
  setConsultationSelected,
  handleClickOpenVisualizationDialog,
}: ChildProps) {
  return (
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
  );
}

export default VisualizeRequestButton;
