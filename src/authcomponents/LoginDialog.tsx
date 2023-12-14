import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import { AuthType } from "./auth.model";

interface ChildProps {
  handleClose: () => void;
  setAuthType: React.Dispatch<React.SetStateAction<AuthType>>;
}

function LoginDialog({ handleClose, setAuthType }: ChildProps) {
  return (
    <>
      <DialogTitle>Connexion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            autoFocus
            fullWidth
            type="email"
            id="standard-basic"
            label="Email"
            variant="standard"
          />
          <TextField
            fullWidth
            type="password"
            id="standard-basic"
            label="Mot de passe"
            variant="standard"
          />
          <Box sx={{ mt: 1 }}>
            <Typography component="span" sx={{ fontSize: "0.9em" }}>
              Pas encore de compte ? &nbsp;
              <Typography
                component="span"
                color="primary"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setAuthType(AuthType.REGISTER);
                }}
              >
                Inscrivez-vous
              </Typography>
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained" onClick={handleClose}>
          Se connecter
        </Button>
      </DialogActions>
    </>
  );
}

export default LoginDialog;
