import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#CB3CFF",
      light: "#D76AFF",
      dark: "#7F25FB",
    },
    secondary: {
      main: "#7F25FB",
      light: "#9B4FFF",
      dark: "#6019D1",
    },
    background: {
      default: "#081028",
      paper: "#0B1739",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AEB9E1",
    },
    success: {
      main: "#14CA74",
      light: "rgba(5, 193, 104, 0.20)",
    },
    error: {
      main: "#FF5A65",
      light: "rgba(255, 90, 101, 0.20)",
    },
    warning: {
      main: "#FDB52A",
      light: "rgba(255, 176, 22, 0.20)",
    },
  },
  typography: {
    fontFamily: "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
    h1: {
      fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 4,
          fontWeight: 500,
        },
        containedPrimary: {
          background: "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0B1739",
          borderRadius: 12,
        },
      },
    },
  },
});
