import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  useTheme,
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
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Consultation[] | null, unknown>>;
}

function CreateConsultationDialog({ refetch }: ChildProps) {
  const { user } = useAuth();
  const theme = useTheme();
  const [postImages, setPostImages] = useState([
    {
      myFile: "",
      title: "",
    },
  ]);
  const formik = useFormik({
    initialValues: {
      object: "",
      description: "",
      evolution: false,
    },
    onSubmit: async (values) => {
      console.log(values, postImages);
      if (user) {
        consulatationsServices
          .createConsultation({
            ...values,
            patientId: user.userId,
            files: postImages.map((file) => file.myFile),
          })
          .then(() => {
            refetch();
            handleCloseCreationDialog();
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
    console.log(e.target.files);
    const files = [...e.target.files];
    setPostImages(
      await Promise.all(
        files.map(async (file) => ({
          myFile: (await convertToBase64(file)) as string,
          title: file.name as string,
        }))
      )
    );
    e.target.value = null;
  };

  const [openCreationDialog, setOpenCreationDialog] = useState(false);

  const handleClickOpenCreationDialog = () => {
    setOpenCreationDialog(true);
  };
  const handleCloseCreationDialog = () => {
    setOpenCreationDialog(false);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        sx={[
          {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "5px",
            px: 9,
            py: 1,
            color: theme.palette.common.white,
            mt: 4,
          },
        ]}
        onClick={handleClickOpenCreationDialog}
      >
        <Box sx={{ fontSize: 17, fontWeight: 600 }}>
          <p>DEPOSER UNE NOUVELLE PHOTO</p>
        </Box>
      </Button>
      <Dialog open={openCreationDialog}>
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
              {postImages.length === 0
                ? "Upload Documents"
                : postImages[0].title +
                  (postImages.length === 1 ? "" : ", ...")}
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
                multiple
                accept="image/png, image/jpeg"
                onChange={(e) => handleFileUpload(e)}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleCloseCreationDialog();
                setPostImages([{ myFile: "", title: "" }]);
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
    </Box>
  );
}

export default CreateConsultationDialog;
