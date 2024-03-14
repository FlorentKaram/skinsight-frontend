import { Box, Button, useTheme } from "@mui/material";
import { Role } from "../../models/user.model";
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
function GetConsultationButton({ refetch }: ChildProps) {
  const { user } = useAuth();
  const theme = useTheme();

  const getNewConsultation = (): void => {
    if (user) {
      switch (user.role) {
        case Role.GENERALIST:
          consulatationsServices
            .getNewConsultationForGeneralist(user.userId)
            .then(() => refetch());
          break;
        case Role.DERMATOLOGIST:
          consulatationsServices
            .getNewConsultationForDermatologist(user.userId)
            .then(() => refetch());
      }
    }
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
        onClick={getNewConsultation}
      >
        <Box sx={{ fontSize: 17, fontWeight: 600 }}>
          <p>Obtenir une nouvelle consultation</p>
        </Box>
      </Button>
    </Box>
  );
}

export default GetConsultationButton;
