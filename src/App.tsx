import { Outlet } from "react-router-dom";
import { skinSightTheme } from "./theme/theme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={skinSightTheme}>
      <QueryClientProvider client={queryClient}>
        <div style={{ height: "100vh", width: "100vw" }}>
          <Outlet />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
