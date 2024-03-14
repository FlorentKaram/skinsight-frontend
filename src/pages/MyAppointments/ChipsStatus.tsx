import { Status } from "../../models/consultation.model";
import { Chip } from "@mui/material";

function ChipsStatus({ status }: { status: Status }) {
  const getString = (status: Status) => {
    switch (status) {
      case Status.PENDING:
        return "En attente";
      case Status.ANALYZED:
        return "Analysée";
      case Status.APPOINTMENT:
        return "Rendez-vous";
      case Status.DONE:
        return "Terminée";
    }
  };

  const getColor = (status: Status) => {
    switch (status) {
      case Status.PENDING:
        return "warning";
      case Status.ANALYZED:
        return "success";
      case Status.APPOINTMENT:
        return "info";
      case Status.DONE:
        return "success";
    }
  };

  return <Chip color={getColor(status)} label={getString(status)} />;
}

export default ChipsStatus;
