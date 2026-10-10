"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useDashboardContext } from "../../../../context/dashboard";

export default function QuickActions() {
  const dashboardContext = useDashboardContext();
  if(!dashboardContext) return;
  const {setOpenT} = dashboardContext;
  return (
    <Stack
      spacing={2}
      sx={{
        bgcolor: "background.paper",
        borderRadius: "10px",
        p: 1,
        border: "solid 1px #1f29371f",
      }}
    >
      
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: "11px", sm: "15px", md: "18px" },
        }}
      >
        Quick Actions
      </Typography>
      <Button variant="contained" onClick={() => setOpenT(true)}>
        <Box>
          <AddIcon /> Add New Tasks
        </Box>
      </Button>
      <Button variant="outlined" sx={{ color: "primary.main" }}>
        <Box>
          <GroupAddOutlinedIcon /> Create Group
        </Box>
      </Button>
      <Button variant="outlined" sx={{ color: "primary.main" }}>
        <Box>
          <CalendarTodayOutlinedIcon /> View Calander
        </Box>
      </Button>
      <Button variant="outlined" sx={{ color: "primary.main" }}>
        <Box>
          <PersonAddOutlinedIcon /> Join Group
        </Box>
      </Button>
    </Stack>
  );
}
