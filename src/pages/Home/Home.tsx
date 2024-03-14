import { Box, Button, Fab, Grid, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { IMAGES } from "../../assets/images";
import AuthDialog from "../../authcomponents/AuthDialog";
import { AuthType, Role } from "../../models/user.model";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowTopIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Footer from "../../globalcomponents/Footer";

function Home() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role>(Role.PATIENT);
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
  const [top, setTop] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const scrollToBottom = () => {
    if (top) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
    setTop(!top);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          zIndex: "100",
          overflowY: "scroll",
          position: "relative",
          minHeight: "100vh",
          pb: 20,
        }}
      >
        <Grid container alignItems={"center"} direction={"column"} spacing={5}>
          <Grid
            container
            item
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              px: 20,
            }}
          >
            <Grid
              item
              xs={4}
              sx={{ color: theme.palette.primary.main, px: "120px" }}
            >
              <h2 style={{ fontSize: "2em" }}>SKINSIGHT</h2>
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
            <Box position="relative">
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
                onClick={() => {
                  setRole(Role.PATIENT);
                  setAuthType(AuthType.LOGIN);
                  handleClickOpen();
                }}
              >
                <Box sx={{ fontSize: 17, fontWeight: 600 }}>
                  <p>DEMARRER UNE PRE-CONSULTATION</p>
                </Box>
              </Button>
              <Box sx={{ py: 2 }}>{""}</Box>
            </Box>
            <Box textAlign={"center"} mt={5}>
              <Fab color="secondary" aria-label="add" onClick={scrollToBottom}>
                {top ? (
                  <KeyboardDoubleArrowTopIcon color="action" />
                ) : (
                  <KeyboardDoubleArrowDownIcon color="action" />
                )}
              </Fab>
            </Box>
            <Box sx={{ color: "black", mx: 30, mb: 10, mt: 5 }} id="bottom">
              <Box display={"flex"} justifyContent={"space-around"}>
                <Box mt={2} width={300} textAlign={"right"}>
                  Notre approche unique vous permet de télécharger facilement
                  vos photos de peau, qui sont ensuite minutieusement analysées
                  par des médecins généralistes et des dermatologues qualifiés.
                </Box>
                <Box display={"flex"}>
                  <Box
                    width={130}
                    height={130}
                    bgcolor={theme.palette.primary.main}
                    borderRadius={10}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    m={2}
                  >
                    <img
                      src="/dev/img/doctor_icon.png"
                      style={{ width: 100 }}
                    />
                  </Box>
                  <Box
                    width={130}
                    height={130}
                    bgcolor={theme.palette.secondary.main}
                    borderRadius={10}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    m={2}
                  >
                    <img src="/dev/img/mechanism.png" style={{ width: 100 }} />
                  </Box>
                </Box>
                <Box mt={2} width={300}>
                  Avec notre service, en un clique, bénéficiez d'une analyse
                  approfondie de vos photos par des professionnels de la santé,
                  sans avoir à quitter le confort de votre domicile.
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"space-around"}>
                <Box mt={2} width={300} textAlign={"right"}>
                  Nos médecins généralistes et dermatologues examinent chaque
                  photo pour détecter les éventuelles anomalies, vous
                  fournissant des recommandations et la possibilité de planifier
                  un rendez-vous.
                </Box>
                <Box display={"flex"}>
                  <Box
                    width={130}
                    height={130}
                    bgcolor={theme.palette.secondary.main}
                    borderRadius={10}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    m={2}
                  >
                    <img src="/dev/img/heart.png" style={{ width: 100 }} />
                  </Box>
                  <Box
                    width={130}
                    height={130}
                    bgcolor={theme.palette.primary.main}
                    borderRadius={10}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    m={2}
                  >
                    <img src="/dev/img/vaccin.png" style={{ width: 100 }} />
                  </Box>
                </Box>
                <Box mt={2} width={300}>
                  Chaque photo téléchargée et analysée représente un pas de plus
                  vers la détection précoce et le traitement efficace de cette
                  maladie.
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Footer />
      </Box>
    </>
  );
}

export default Home;
