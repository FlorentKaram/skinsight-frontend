import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { indigo } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

function Header() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        position: "fixed",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        zIndex: "100",
        pt: 3,
      }}
    ></Box>
  );
}

export default Header;
