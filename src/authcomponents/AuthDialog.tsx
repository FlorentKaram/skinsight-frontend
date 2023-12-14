import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import LoginDialog from "./LoginDialog";
import { AuthType } from "./auth.model";
import RegisterDialog from "./RegisterDialog";

interface ChildProps {
  open: boolean;
  handleClose: () => void;
}

function AuthDialog({ open, handleClose }: ChildProps) {
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
  return (
    <React.Fragment>
      <Dialog open={open}>
        {authType === AuthType.LOGIN ? (
          <LoginDialog handleClose={handleClose} setAuthType={setAuthType} />
        ) : (
          <RegisterDialog handleClose={handleClose} setAuthType={setAuthType} />
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default AuthDialog;
