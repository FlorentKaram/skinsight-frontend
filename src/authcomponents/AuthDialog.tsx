import React from "react";
import Dialog from "@mui/material/Dialog";
import LoginDialog from "./LoginDialog";
import PatientRegisterDialog from "./PatientRegisterDialog";
import ProfessionalRegisterDialog from "./ProfessionalRegisterDialog";
import { AuthType, Role } from "../models/user.model";

interface ChildProps {
  open: boolean;
  role: Role;
  authType: AuthType;
  setAuthType: React.Dispatch<React.SetStateAction<AuthType>>;
  handleClose: () => void;
}

function AuthDialog({
  open,
  role,
  authType,
  setAuthType,
  handleClose,
}: ChildProps) {
  return (
    <Dialog open={open}>
      {authType === AuthType.LOGIN ? (
        <LoginDialog handleClose={handleClose} setAuthType={setAuthType} />
      ) : role === Role.PATIENT ? (
        <PatientRegisterDialog
          handleClose={handleClose}
          setAuthType={setAuthType}
        />
      ) : (
        <ProfessionalRegisterDialog
          handleClose={handleClose}
          setAuthType={setAuthType}
        />
      )}
    </Dialog>
  );
}

export default AuthDialog;
