import { createTheme } from "@mui/material";

export const skinSightTheme = createTheme({
  palette: {
    primary: {
      main: "#1971c2",
    },
    secondary: {
      main: "#a5d8ff",
    },
    common: {
      black: "#000",
      white: "#fff",
    },
    info: {
      main: "#000",
    },
    warning: {
      main: "#ffec99",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
        }
      `,
    },
  },
});
