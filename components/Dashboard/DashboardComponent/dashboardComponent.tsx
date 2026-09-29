import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

import SimpleBarChart from "./BarChart/barChart";
import RecentActivities from "./ResentActivity/resentActivity";
import PriorityDonut from "./TasksByPriority/tasksByPriority";
import Groups from "./userGroups/userGroups";
import QuickActions from "./QuickActions/quickActions";
import { useDashboardContext } from "../../../context/dashboard";

export default function DashboardComponent() {
  const dashboardContext = useDashboardContext();
  if (!dashboardContext) return;

  const { details } = dashboardContext;
  const detail = [
    {
      icon: <CheckBoxIcon />,
      title: "Total Tasks",
      description: "All tasks across your groups",
      statistics: `${details.totalTasks}`,
      color: "#0062ff",
      bg: "#b8e8ff5f",
    },
    {
      icon: <DonutSmallIcon />,
      title: "In Progress",
      description: "Tasks currently in progress",
      statistics: `${details.inProgressTasks}`,
      color: "#ff9100",
      bg: "#ffe5b85f",
    },
    {
      icon: <CheckCircleIcon />,
      title: "Completed",
      description: "Tasks completed so far",
      statistics: `${details.completedTasks}`,
      color: "#00a556",
      bg: "#0b7e003a",
    },
    {
      icon: <GroupsOutlinedIcon />,
      title: "My Groups",
      description: "Groups you're part of",
      statistics: `${details.groups}`,
      color: "#5d00ff",
      bg: "#2b00b83e",
    },
  ];

  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        p: { xs: 1, sm: 2 },
        boxSizing: "border-box",
      }}
    >
      {/* ================= STATISTICS ================= */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {detail.map((D) => (
          <Card
            key={D.title}
            elevation={0}
            sx={{
              p: { xs: 1.5, md: 2 },
              minWidth: 0,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  flexShrink: 0,
                  bgcolor: D.bg,
                  color: D.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  width: 44,
                  height: 44,
                }}
              >
                {D.icon}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: {
                      xs: 11,
                      sm: 12,
                      md: 13,
                    },
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {D.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 22,
                      md: 26,
                    },
                    lineHeight: 1.2,
                    fontWeight: 700,
                  }}
                >
                  {D.statistics}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: 10,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {D.description}
                </Typography>
              </Box>
            </Stack>
          </Card>
        ))}
      </Box>

      {/* ================= ANALYTICS ROW ================= */}

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ height: "100%"}}>
            <SimpleBarChart />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Box sx={{ height: "100%" }}>
            <RecentActivities />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ height: "100%" }}>
            <PriorityDonut />
          </Box>
        </Grid>
      </Grid>

      {/* ================= GROUPS + ACTIONS ================= */}

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ height: "100%" }}>
            <Groups />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ height: "100%" }}>
            <QuickActions />
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}
