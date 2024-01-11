import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { loginValidationSchema } from "./validation";
import { AuthType } from "../models/user.model";

interface ChildProps {
  handleClose: () => void;
  setAuthType: React.Dispatch<React.SetStateAction<AuthType>>;
}

function LoginDialog({ handleClose, setAuthType }: ChildProps) {
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            required
            type="email"
            id="email"
            label="Email"
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            required
            type="password"
            id="password"
            label="Mot de passe"
            variant="standard"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button variant="contained" type="submit">
            Se connecter
          </Button>
        </DialogActions>
      </form>
    </>
  );
}

export default LoginDialog;
