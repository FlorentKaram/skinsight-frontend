import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { indigo } from "@mui/material/colors";
import AdjustIcon from "@mui/icons-material/Adjust";

function Header() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: indigo.A200,
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
