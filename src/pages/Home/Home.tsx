import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { IMAGES } from "../../assets/images";
import AuthDialog from "../../authcomponents/AuthDialog";
import { useQuery } from "react-query";
import { AuthType, Role } from "../../models/user.model";

function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role>(Role.PATIENT);
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        display: "flex",
        justifyContent: "space-around",
        zIndex: "100",
      }}
    >
      <Grid container alignItems={"center"} direction={"column"} spacing={5}>
        <Grid
          container
          item
          justifyContent={"space-around"}
          alignItems={"center"}
          sx={{
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Grid item xs={4} sx={{ color: theme.palette.primary.main }}>
            <h2>SKINSIGHT</h2>
          </Grid>
          <Grid container justifyContent={"flex-end"} item xs={6}>
            <Grid item>
              <Button
                variant="outlined"
                color="info"
                sx={{ m: 2 }}
                onClick={() => {
                  setRole(Role.GENERALIST);
                  setAuthType(AuthType.REGISTER);
                  handleClickOpen();
                }}
              >
                Vous êtes practicien ?
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  m: 2,
                  color: "white",
                  backgroundColor: theme.palette.primary.main,
                }}
                onClick={() => {
                  setRole(Role.PATIENT);
                  setAuthType(AuthType.LOGIN);
                  handleClickOpen();
                }}
              >
                Se connecter
              </Button>
              <AuthDialog
                open={open}
                role={role}
                authType={authType}
                setAuthType={setAuthType}
                handleClose={handleClose}
              />
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              px: 20,
              pb: 8,
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            <Grid container item justifyContent={"space-between"}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontSize: 40, fontWeight: 700, my: 10 }}>
                  Bienvenue sur SKINSIGHT,
                </Typography>
                <Typography sx={{ fontSize: 18 }}>
                  Votre ressource en ligne dédiée à la prévention et à la
                  détection précoce du cancer de la peau.
                </Typography>
                <Typography sx={{ fontSize: 18 }}>
                  Notre mission est de vous fournir les outils et les
                  informations nécessaires pour surveiller votre peau et
                  identifier les signes précoces de cette maladie grave.
                </Typography>
              </Grid>
              <Grid item xs={3} padding={6}>
                <Box
                  component="img"
                  sx={{
                    maxHeight: 350,
                  }}
                  src={IMAGES.doctors}
                  alt="skin"
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            variant="contained"
            sx={[
              {
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translate(-50%, 0%)",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "5px",
                px: 9,
                py: 1,
                color: theme.palette.common.white,
              },
            ]}
          >
            <Box sx={{ fontSize: 17, fontWeight: 600 }}>
              <p>DEMARRER UNE PRE-CONSULTATION</p>
            </Box>
          </Button>
          <Box sx={{ py: 2 }}>{""}</Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Home;
