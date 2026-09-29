"use client";
import { Box, Stack, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDashboardContext } from "../../../../context/dashboard";

const TaskCompletionChart = () => {
  const dashboardContext = useDashboardContext();
  if (!dashboardContext) return null;

  const { statistics } = dashboardContext;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "10px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        boxShadow: "0px 0px 10px 1px #1f293799",
      }}
    >
      <Stack>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "11px", sm: "15px", md: "18px" },
          }}
        >
          Task Completion
        </Typography>
        <Typography
          className="disabled"
          sx={{ fontSize: { xs: "11px", sm: "13px", md: "13px" } }}
        >
          THIS WEEK
        </Typography>
      </Stack>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={statistics || []}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 30]}
            ticks={[0, 5, 10, 15, 20, 25, 30]}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="completed"
            name="Completed"
            fill="#1e6fe0"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="total"
            name="Total"
            fill="#a8c8f7"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TaskCompletionChart;
