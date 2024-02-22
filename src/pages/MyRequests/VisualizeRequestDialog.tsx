import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ConsultationForm } from "../../models/consultation.model";
import { useEffect, useState } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { appointmentsServices } from "../../services/appointments.service";
import { useAuth } from "../../router/hooks/useAuth";

interface ChildProps {
  open: boolean;
  handleClose: () => void;
  consultation: ConsultationForm;
}

function VisualizeRequestDialog({
  open,
  handleClose,
  consultation,
}: ChildProps) {
  const { user } = useAuth();
  const adapter = new AdapterDayjs();
  const today = adapter.date(new Date()) as unknown as Date;
  const [displayAppointment, setDisplayAppointment] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(today);

  useEffect(() => {
    console.log(appointmentDate);
  }, [appointmentDate]);

  const handleOpenAppointment = () => {
    setDisplayAppointment(true);
  };
  const handleCloseAppointment = () => {
    setDisplayAppointment(false);
  };

  const submitAppointment = () => {
    console.log(appointmentDate);
    if (user) {
      appointmentsServices.createAppointment({
        date: appointmentDate!.toISOString(),
        patientId: user.userId,
      });
    } else {
      console.log("no user");
    }
  };

  return consultation ? (
    <Dialog open={open}>
      <DialogTitle>Préconsultation - {consultation.object}</DialogTitle>

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
          <DialogContent>{consultation.description}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fermer</Button>
            <Button variant="contained" onClick={handleOpenAppointment}>
              Prendre rendez-vous
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  ) : null;
}

export default VisualizeRequestDialog;
