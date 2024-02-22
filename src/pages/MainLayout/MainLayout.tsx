import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function MainLayout() {
  return (
    <Box>
      <Header />
      <Box sx={{ pt: 10, px: "15%" }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
