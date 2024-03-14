import { NavLink } from "react-router-dom";
import { Button, useTheme } from "@mui/material";
import { InfoButton } from "./Header/header.model";

interface ChildProps {
  info: InfoButton;
}
function HeaderButton({ info }: ChildProps) {
  const theme = useTheme();

  return (
    <NavLink to={info.navLink}>
      {({ isActive }) => (
        <Button
          variant="contained"
          sx={{
            m: 2,
            color: isActive ? "white" : "black",
            backgroundColor: isActive ? theme.palette.primary.main : "white",
          }}
        >
          {info.label}
        </Button>
      )}
    </NavLink>
  );
}

export default HeaderButton;
