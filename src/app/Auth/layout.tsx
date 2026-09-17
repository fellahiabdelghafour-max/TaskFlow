import { ReactNode } from "react";
import AppTheme from "../../../theme";
import ModeProvider from "../../../context/mode";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "../globals.css";
import AuthProvider from "../../../context/authContext";

export default function Auth({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <ModeProvider>
            <AppTheme>
              <AuthProvider>{children}</AuthProvider>{" "}
            </AppTheme>
          </ModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
