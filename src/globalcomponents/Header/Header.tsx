import { Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../../router/hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import HeaderButton from "../HeaderButton";
import FirstHeaderButton from "./FirstHeaderButton";
import SecondHeaderButton from "./SecondHeaderButton";
import { Role } from "../../models/user.model";

function Header() {
  const theme = useTheme();
  const { logout } = useAuth();
  const { user } = useAuth();
  const getName = () => {
    if (user) {
      return user.role === Role.PATIENT
        ? user.firstName
        : `DR.${user.lastName}`;
    } else {
      return "Profile";
    }
  };

  return (
    user && (
      <Grid
        container
        item
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          px: "15%",
        }}
      >
        <NavLink to="/">
          <Grid item xs={3} sx={{ color: theme.palette.primary.main }}>
            <h2>SKINSIGHT</h2>
          </Grid>
        </NavLink>
        <Grid display="flex" justifyContent="center" item xs={7}>
          <FirstHeaderButton role={user.role} />
          <SecondHeaderButton role={user.role} />
        </Grid>
        <Grid display="flex" justifyContent={"flex-end"} item xs={2}>
          <HeaderButton info={{ navLink: "/my-profile", label: getName() }} />
          <Button
            variant="outlined"
            color="info"
            sx={{ ml: 1 }}
            onClick={() => logout()}
          >
            <LogoutIcon />
          </Button>
        </Grid>
      </Grid>
    )
  );
}

export default Header;
