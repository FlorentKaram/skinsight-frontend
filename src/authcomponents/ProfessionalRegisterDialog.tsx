import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormHelperText, Typography } from "@mui/material";
import { AuthType, Role, Sex } from "../models/user.model";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { professionalRegisterValidationSchema } from "./validation";
import { useFormik } from "formik";
import { authServices } from "../services/auth.services";

interface ChildProps {
  handleClose: () => void;
  setAuthType: React.Dispatch<React.SetStateAction<AuthType>>;
}

function ProfessionalRegisterDialog({ handleClose, setAuthType }: ChildProps) {
  const formik = useFormik({
    initialValues: {
      userId: "0",
      role: Role.GENERALIST,
      lastName: "",
      firstName: "",
      dateOfBirth: null as unknown as Date,
      sex: Sex.MALE,
      address: "",
      rppsNumber: "" as unknown as number,
      email: "",
      password: "",
      zipCode: "" as unknown as number,
      city: "",
    },
    validationSchema: professionalRegisterValidationSchema,
    onSubmit: (values) => {
      authServices.professionalRegisterService(values);
    },
  });

  return (
    <>
      <DialogTitle>Inscription - Profesionnel</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <TextField
              sx={{ width: "calc(50% - 1)", mr: 2 }}
              id="lastName"
              label="Nom"
              variant="standard"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              sx={{ width: "calc(50% - 1)" }}
              id="firstName"
              label="Prénom"
              variant="standard"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "47%", marginRight: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date de naissance"
                  value={formik.values.dateOfBirth}
                  onChange={(value) =>
                    formik.setFieldValue("dateOfBirth", value, true)
                  }
                  slotProps={{
                    textField: {
                      variant: "standard",
                      id: "dateOfBirth",

                      onBlur: formik.handleBlur,
                      error:
                        formik.touched.dateOfBirth &&
                        Boolean(formik.errors.dateOfBirth),
                      helperText:
                        formik.touched.dateOfBirth &&
                        "Date de naissance requise",
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <FormControl style={{ width: "calc(50% - 10px)", marginRight: 2 }}>
              <InputLabel id="sex">Age</InputLabel>
              <Select
                labelId="sex"
                id="sex"
                variant="standard"
                label="Age"
                value={formik.values.sex}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.sex && Boolean(formik.errors.sex)}
              >
                <MenuItem value={Sex.MALE}>Homme</MenuItem>
                <MenuItem value={Sex.FEMALE}>Femme</MenuItem>
              </Select>
              <FormHelperText>
                {formik.touched.sex && formik.errors.sex}
              </FormHelperText>
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
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Box>
          <Box>
            <TextField
              sx={{ width: "calc(50% - 1)", mr: 2 }}
              id="zipCode"
              label="Code postal"
              variant="standard"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
            />
            <TextField
              sx={{ width: "calc(50% - 1)" }}
              id="city"
              label="Ville"
              variant="standard"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Box>
          <TextField
            fullWidth
            id="rppsNumber"
            label="RPPS"
            variant="standard"
            value={formik.values.rppsNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.rppsNumber && Boolean(formik.errors.rppsNumber)
            }
            helperText={formik.touched.rppsNumber && formik.errors.rppsNumber}
          />
          <TextField
            fullWidth
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
            id="password"
            label="Mot de passe"
            variant="standard"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
