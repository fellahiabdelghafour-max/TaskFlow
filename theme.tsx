"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode, useMemo } from "react";
import { useModeContext } from "./context/mode";

export default function AppTheme({ children }: { children: ReactNode }) {
  const { mode } = useModeContext();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "dark" ? "#001127" : "#f3faff",
            paper: mode === "dark" ? "#001b3e" : "#ffffff",
          },
          secondary: { main: "#ffffff" },
          primary: { main: mode === "dark" ? "#0088ff" : "#007bcd" },
          warning: { main: mode === "dark" ? "#ffcc00" : "#ff9d00" },
          success: { main: mode === "dark" ? "#00a556" : "#1dad00" },
          error:{main: mode === "dark" ? "#ff3f3f" : "#ff0000"},
          info: { main: mode === "dark" ? "rgb(168, 207, 255)" : "#00b3ff" },
          text: {
            primary: "#0073ff",
            secondary: mode === "dark" ? "#fff" : "#000000",
          },
        },
        components: {
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                filter: `drop-shadow(0 0 1px #fff)`,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "10px",
                transition: "transform .3s ease",
                color: "white",
                "@media (hover:hover) and (pointer:fine)": {
                  '&:hover':{
                    transform: "translateY(-10%)",
                  }
                  
                },
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                textDecoration: "none",
                fontWeight: 600,
              },
            },
          },
          MuiCard: {
  styleOverrides: {
    root: {
      borderRadius: "16px",
      transition: "all .4s ease",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: "10px",
      padding: "32px",
      border:
        mode === "dark"
          ? "solid 3px rgba(0, 191, 255, 0.11)"
          : "solid 1px rgb(222, 228, 244)",
      "@media (hover:hover) and (pointer:fine)": {
        '&:hover':{        transform: "translate(-3px, -3px)",
        boxShadow: "6px 6px 0 #767676",
        border:
          mode === "dark"
            ? "solid 3px rgba(71, 209, 255, 0.76)"
            : "solid 2px rgba(0, 234, 255, 0.26)",},

      },
    },
  },
},
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                color: mode === "dark" ? "#fff" : "#000000",
                background: mode === "dark" ? "#001b3e81" : "#ffffff",
                borderRadius: "10px",
                maxHeight:'40px'
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
