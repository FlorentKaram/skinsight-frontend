import { useState } from "react";
import { Outlet } from "react-router-dom";
import { defaultUser } from "./models/auth";
import { AuthContext } from "./contexts/AuthContext";
import { skinSightTheme } from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  const [user, setUser] = useState(defaultUser);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ThemeProvider theme={skinSightTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{ user, setUser, isConnected, setIsConnected }}
        >
          <div style={{ height: "100vh", width: "100vw" }}>
            <Outlet />
          </div>
        </AuthContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
