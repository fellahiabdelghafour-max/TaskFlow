import { ReactNode } from "react";
import AppTheme from "../../../theme";
import ModeProvider from "../../../context/mode";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "../globals.css";
import AuthProvider from "../../../context/auth";
import ScnackBarProvider from "../../../context/snackBarContext";
import SnackBar from "../../../components/Home/snackBar/snackBar";
import { cookies } from "next/headers";

export default async function Auth({ children }: { children: ReactNode }) {
      const cookieStore = await cookies();
      const InitialMode = cookieStore.get('mode')?.value as 'dark' | 'light' ?? 'dark';

  return (
    <html>
      <body>
        <AppRouterCacheProvider>
          <ScnackBarProvider>
            <ModeProvider InitialMode={InitialMode}>
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
