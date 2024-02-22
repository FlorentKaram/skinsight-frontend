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
import { useFormik } from "formik";
import { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { consulatationsServices } from "../../services/consultations.services";
import { useAuth } from "../../router/hooks/useAuth";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { Consultation } from "../../models/consultation.model";

interface ChildProps {
  open: boolean;
  handleClose: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Consultation[] | null, unknown>>;
}

function CreateRequestDialog({ open, handleClose, refetch }: ChildProps) {
  const { user } = useAuth();
  const [postImage, setPostImage] = useState({
    myFile: "",
    title: "",
  });
  const formik = useFormik({
    initialValues: {
      object: "",
      description: "",
      evolution: false,
    },
    onSubmit: async (values) => {
      console.log(values, postImage);
      if (user) {
        consulatationsServices
          .createConsultation({
            ...values,
            patientId: user.userId,
            file: postImage.myFile,
          })
          .then(() => {
            refetch();
            handleClose();
          });
      }
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
    console.log(base64);

    setPostImage({ myFile: base64, title: file.name });
    e.target.value = null;
  };

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
            {postImage.title === "" ? "Upload file" : postImage.title}
            <input
              style={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1,
              }}
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setPostImage({ myFile: "", title: "" });
            }}
          >
            Annuler
          </Button>
          <Button variant="contained" type="submit">
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateRequestDialog;
