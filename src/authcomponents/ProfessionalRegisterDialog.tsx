import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Dialog, Typography } from "@mui/material";
import { AuthType } from "../models/user.model";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface ChildProps {
  handleClose: () => void;
  setAuthType: React.Dispatch<React.SetStateAction<AuthType>>;
}

function ProfessionalRegisterDialog({ handleClose, setAuthType }: ChildProps) {
  return (
    <>
      <DialogTitle>Inscription - Profesionnel</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <TextField
              autoFocus
              sx={{ width: "calc(50% - 1)", mr: 2 }}
              id="lastName"
              label="Nom"
              variant="standard"
            />
            <TextField
              sx={{ width: "calc(50% - 1)" }}
              id="firstname"
              label="Prénom"
              variant="standard"
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "47%", marginRight: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date de naissance"
                  slotProps={{
                    textField: {
                      variant: "standard",
                      id: "dateOfBirth",
                    },
                  }}
                  // value={value}
                  // onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </Box>
            <FormControl style={{ width: "calc(50% - 10px)", marginRight: 2 }}>
              <InputLabel id="sex">Age</InputLabel>
              <Select
                labelId="sex"
                id="sex"
                variant="standard"
                //   value={age}
                label="Age"
                //   onChange={handleChange}
              >
                <MenuItem value={"homme"}>Homme</MenuItem>
                <MenuItem value={"femme"}>Femme</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id="address"
              label="Adresse"
              fullWidth
              multiline
              rows={4}
              variant="standard"
            />
          </Box>
          <TextField
            fullWidth
            id="rppsNumber"
            label="RPPS"
            variant="standard"
          />
          <TextField fullWidth id="email" label="Email" variant="standard" />
          <TextField
            fullWidth
            id="password"
            label="Mot de passe"
            variant="standard"
          />
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography component="span" sx={{ fontSize: "0.9em" }}>
            Déjà un compte ? &nbsp;
            <Typography
              component="span"
              color="primary"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setAuthType(AuthType.LOGIN);
              }}
            >
              Connectez-vous
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button variant="contained" type="submit">
          S'inscrire
        </Button>
      </DialogActions>
    </>
  );
}

export default ProfessionalRegisterDialog;
