import { Box } from "@mui/material";

import Header from "../../globalcomponents/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../globalcomponents/Footer";

function MainLayout() {
  return (
    <Box>
      <Box
        sx={{
          zIndex: "100",
          overflowY: "scroll",
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Box
          sx={{
            px: "15%",
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default MainLayout;
