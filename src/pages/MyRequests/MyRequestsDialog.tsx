import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { consulatationsServices } from "../../services/consultations.services";

interface ChildProps {
  open: boolean;
  handleClose: () => void;
}

function MyRequestsDialog({ open, handleClose }: ChildProps) {
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const formik = useFormik({
    initialValues: {
      object: "",
      description: "",
      evolution: false,
    },
    onSubmit: async (values) => {
      console.log(values, postImage);
      consulatationsServices
        .createConsultation({
          ...values,
          file: postImage.myFile,
        })
        .then(() => handleClose());
    },
  });

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = (await convertToBase64(file)) as string;
    setPostImage({ ...postImage, myFile: base64 });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Dialog open={open}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Nouvelle consultation</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="object"
            label="Object"
            variant="standard"
            value={formik.values.object}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="description"
            label="Description"
            variant="standard"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormControlLabel
            control={
              <Switch
                id="evolution"
                checked={formik.values.evolution}
                onChange={formik.handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="A-t-il évolué ?"
          />
          <Button
            fullWidth
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<AttachFileIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button variant="contained" type="submit">
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MyRequestsDialog;
