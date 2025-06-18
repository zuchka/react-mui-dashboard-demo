import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { useThemeMode } from "../contexts/ThemeContext";

export const useTheme = () => {
  const { mode } = useThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
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
            default: mode === "dark" ? "#081028" : "#F8F9FA",
            paper: mode === "dark" ? "#0B1739" : "#FFFFFF",
          },
          text: {
            primary: mode === "dark" ? "#FFFFFF" : "#1A1A1A",
            secondary: mode === "dark" ? "#AEB9E1" : "#6B7280",
          },
          success: {
            main: "#14CA74",
            light:
              mode === "dark"
                ? "rgba(5, 193, 104, 0.20)"
                : "rgba(20, 202, 116, 0.10)",
          },
          error: {
            main: "#FF5A65",
            light:
              mode === "dark"
                ? "rgba(255, 90, 101, 0.20)"
                : "rgba(255, 90, 101, 0.10)",
          },
          warning: {
            main: "#FDB52A",
            light:
              mode === "dark"
                ? "rgba(255, 176, 22, 0.20)"
                : "rgba(253, 181, 42, 0.10)",
          },
          divider:
            mode === "dark"
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(0, 0, 0, 0.12)",
          action: {
            hover:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
          },
        },
        typography: {
          fontFamily: "Mona-Sans, -apple-system, Roboto, Helvetica, sans-serif",
          h1: {
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 600,
          },
          h2: {
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 600,
          },
          h3: {
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 600,
          },
          h4: {
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 600,
          },
          h5: {
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: 600,
          },
          h6: {
            fontFamily:
              "Work Sans, -apple-system, Roboto, Helvetica, sans-serif",
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
                background:
                  "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                backgroundColor: mode === "dark" ? "#0B1739" : "#FFFFFF",
                borderRadius: 12,
                ...(mode === "light" && {
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                }),
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                "&:hover": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  return theme;
};
