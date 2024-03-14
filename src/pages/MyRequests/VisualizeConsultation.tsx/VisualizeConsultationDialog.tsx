import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import { Consultation, Status } from "../../../models/consultation.model";
import { useEffect, useState } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { appointmentsServices } from "../../../services/appointments.service";
import { useAuth } from "../../../router/hooks/useAuth";
import FileBlock from "../../../globalcomponents/FileBlock";
import { Role } from "../../../models/user.model";
import { consulatationsServices } from "../../../services/consultations.services";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

interface ChildProps {
  open: boolean;
  handleClose: () => void;
  consultation: Consultation;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Consultation[] | null, unknown>>;
}

function VisualizeConsultationDialog({
  open,
  handleClose,
  consultation,
  refetch,
}: ChildProps) {
  const { user } = useAuth();
  const adapter = new AdapterDayjs();
  const today = adapter.date(new Date()) as unknown as Date;
  const [displayAppointment, setDisplayAppointment] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(today);
  const [advice, setAdvice] = useState<string>("");

  useEffect(() => {
    if (user && consultation && consultation.advice) {
      setAdvice(consultation.advice);
    }
  }, []);

  const handleOpenAppointment = () => {
    setDisplayAppointment(true);
  };
  const handleCloseAppointment = () => {
    setDisplayAppointment(false);
  };

  const submitAppointment = () => {
    if (user) {
      appointmentsServices.createAppointment({
        date: appointmentDate!.toISOString(),
        patientId: user.userId,
      });
    } else {
      console.log("no user");
    }
  };
  const updateConsultation = () => {
    if (user && consultation && advice !== consultation.advice) {
      consulatationsServices
        .updateConsultation(consultation.id, {
          ...consultation,
          advice: advice,
        })
        .then(() => {
          refetch();
        })
        .then(() => {
          setAdvice("");
        });
    }
  };

  const updateConsultationAnalyzed = () => {
    consulatationsServices
      .updateConsultation(consultation.id, {
        ...consultation,
        status: Status.ANALYZED,
      })
      .then(() => {
        refetch();
      })
      .then(() => {
        handleClose();
      });
  };
  const updateConsultationDone = () => {
    consulatationsServices
      .updateConsultation(consultation.id, {
        ...consultation,
        status: Status.DONE,
      })
      .then(() => {
        refetch();
      })
      .then(() => {
        handleClose();
      });
  };

  const updateConsultationAppointment = () => {
    consulatationsServices
      .updateConsultation(consultation.id, {
        ...consultation,
        status: Status.APPOINTMENT,
      })
      .then(() => {
        refetch();
      })
      .then(() => {
        handleClose();
      });
  };

  return (
    consultation &&
    user && (
      <Dialog open={open}>
        <DialogTitle fontWeight={"bold"}>
          Préconsultation - {consultation.object}
        </DialogTitle>

        {displayAppointment ? (
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={appointmentDate}
                onChange={(value) => setAppointmentDate(value)}
              />
            </LocalizationProvider>
            <DialogActions>
              <Button onClick={handleCloseAppointment}>Retour</Button>
              <Button variant="contained" onClick={submitAppointment}>
                Valider
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <Box fontStyle={"oblique"}>{consultation.description}</Box>
              {consultation.files.length > 0 && (
                <>
                  <DialogContentText sx={{ mt: 2 }}>
                    Documents:
                  </DialogContentText>
                  {consultation.files.map((file, i) => (
                    <FileBlock key={i} file={file} />
                  ))}
                </>
              )}
              {(user.role === Role.GENERALIST ||
                user.role === Role.DERMATOLOGIST) && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <h3>Conseil</h3>
                  <TextField
                    id="advice"
                    fullWidth
                    multiline
                    rows={4}
                    variant="standard"
                    defaultValue={consultation.advice}
                    onChange={(e) => setAdvice(e.target.value)}
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Fermer</Button>
              {user.role === Role.PATIENT &&
                consultation.status === Status.APPOINTMENT && (
                  <Button variant="contained" onClick={handleOpenAppointment}>
                    Prendre rendez-vous
                  </Button>
                )}
              {(user.role === Role.GENERALIST ||
                user.role === Role.DERMATOLOGIST) && (
                <>
                  <Button variant={"contained"} onClick={updateConsultation}>
                    Enregistrer
                  </Button>
                </>
              )}
            </DialogActions>
            {(user.role === Role.GENERALIST ||
              user.role === Role.DERMATOLOGIST) &&
              consultation.status === Status.PENDING && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <DialogActions>
                    <Button
                      variant={"contained"}
                      color="error"
                      onClick={updateConsultationDone}
                    >
                      Terminée consultation
                    </Button>

                    <Button
                      variant={"contained"}
                      color="success"
                      onClick={updateConsultationAnalyzed}
                    >
                      Transférer consultation
                    </Button>
                  </DialogActions>
                </>
              )}
            {user.role === Role.DERMATOLOGIST &&
              consultation.status === Status.ANALYZED && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <DialogActions>
                    <Button
                      variant={"contained"}
                      color="error"
                      onClick={updateConsultationDone}
                    >
                      Terminer consultation
                    </Button>

                    <Button
                      variant={"contained"}
                      color="success"
                      onClick={updateConsultationAppointment}
                    >
                      Débloquer la prise de rendez-vous
                    </Button>
                  </DialogActions>
                </>
              )}
          </>
        )}
      </Dialog>
    )
  );
}

export default VisualizeConsultationDialog;
