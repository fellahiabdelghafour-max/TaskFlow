import { ReactNode } from "react";
import AppTheme from "../../../theme";
import ModeProvider from "../../../context/mode";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "../globals.css";
import AuthProvider from "../../../context/authContext";
import ScnackBarProvider from "../../../context/snackBarContext";
import SnackBar from "../../../components/snackBar/snackBar";

export default function Auth({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <ScnackBarProvider>
            <ModeProvider>
              <AppTheme>
                <AuthProvider>
                  <SnackBar />
                  {children}
                </AuthProvider>
              </AppTheme>
            </ModeProvider>
          </ScnackBarProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
