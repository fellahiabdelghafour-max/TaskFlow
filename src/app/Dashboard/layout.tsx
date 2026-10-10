import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "../globals.css";
import ScnackBarProvider from "../../../context/snackBarContext";
import ModeProvider from "../../../context/mode";
import AppTheme from "../../../theme";
import AuthProvider from "../../../context/auth";
import SnackBar from "../../../components/Home/snackBar/snackBar";
import { ReactNode } from "react";
import { Box, Grid } from "@mui/material";
import SideBar from "../../../components/Dashboard/SideBar/sideBar";
import DashboardProvider from "../../../context/dashboard";
import NavBar from "../../../components/Dashboard/navBar/navBar";
import BottomBar from "../../../components/Dashboard/bottomBar/bottomBar";
import TodosProvider from "../../../context/todos";
import AddTask from "../../../components/Dashboard/DashboardComponent/AddTask/addTask";
import { cookies } from "next/headers";

export default async function Dashboard({ children }: { children: ReactNode }) {
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
                  <DashboardProvider>
                    <TodosProvider>
                    <SnackBar />
                    <AddTask />
                    <Grid container>
                      <Grid
                        size={{ md: 1, lg: 2 }}
                        sx={{ display: { xs: "none", sm: "none", md: "flex" },position:'relative' }}
                      >
                        <SideBar />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 11, lg: 10 }}>
                        <NavBar />
                        <Box sx={{mb:{xs:10,sm:10,md:1}}}>
                          {children}
                        </Box>
                        
                        <BottomBar />
                      </Grid>
                    </Grid>                      
                    </TodosProvider>

                  </DashboardProvider>
                </AuthProvider>
              </AppTheme>
            </ModeProvider>
          </ScnackBarProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
