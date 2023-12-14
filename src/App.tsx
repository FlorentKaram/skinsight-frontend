import { useState } from "react";
import { Outlet } from "react-router-dom";
import { userCyril } from "./models/auth";
import { AuthContext } from "./contexts/AuthContext";
import { skinSightTheme } from "./theme/theme";
import { ThemeProvider } from "@mui/material";

function App() {
  const [users, setUsers] = useState([userCyril]);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ThemeProvider theme={skinSightTheme}>
      <AuthContext.Provider
        value={{ users, setUsers, isConnected, setIsConnected }}
      >
        <div style={{ height: "100vh", width: "100vw" }}>
          <Outlet />
        </div>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
