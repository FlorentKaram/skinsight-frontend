import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../router/hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";

function Header() {
  const theme = useTheme();
  const { logout } = useAuth();

  const navigate = useNavigate();
  return (
    <Grid
      container
      item
      justifyContent={"space-around"}
      alignItems={"center"}
      sx={{
        backgroundColor: theme.palette.secondary.main,
        px: "15%",
      }}
    >
      <Grid item xs={4} sx={{ color: theme.palette.primary.main }}>
        <h2>SKINSIGHT</h2>
      </Grid>
      <Grid display="flex" justifyContent="center" item xs={4}>
        <Box>
          <NavLink to="/my-requests">
            {({ isActive }) => (
              <Button
                variant="contained"
                sx={{
                  m: 2,
                  color: isActive ? "white" : "black",
                  backgroundColor: isActive
                    ? theme.palette.primary.main
                    : "white",
                }}
                onClick={() => {
                  navigate("/my-requests");
                }}
              >
                Mes demandes
              </Button>
            )}
          </NavLink>
        </Box>
        <Box>
          <NavLink to="/my-appointments">
            {({ isActive }) => (
              <Button
                variant="contained"
                sx={{
                  m: 2,
                  color: isActive ? "white" : "black",
                  backgroundColor: isActive
                    ? theme.palette.primary.main
                    : "white",
                }}
                onClick={() => {
                  navigate("/my-appointments");
                }}
              >
                Mes rendez-vous
              </Button>
            )}
          </NavLink>
        </Box>
      </Grid>
      <Grid display="flex" justifyContent={"flex-end"} item xs={4}>
        <Box>
          <NavLink to="/my-profile">
            {({ isActive }) => (
              <Button
                variant="contained"
                sx={{
                  m: 2,
                  color: isActive ? "white" : "black",
                  backgroundColor: isActive
                    ? theme.palette.primary.main
                    : "white",
                }}
                onClick={() => {
                  navigate("/my-profile");
                }}
              >
                Mon Compte
              </Button>
            )}
          </NavLink>
        </Box>
        <Box>
          <Button
            variant="outlined"
            color="info"
            sx={{ m: 2 }}
            onClick={() => logout()}
          >
            <LogoutIcon />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Header;
