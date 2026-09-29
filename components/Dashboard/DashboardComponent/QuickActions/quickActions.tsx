"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AddTask from "../AddTask/addTask";
import { useState } from "react";

export default function QuickActions() {
  const [open, setOpen] = useState(false);
  return (
    <Stack
      spacing={2}
      sx={{
        bgcolor: "background.paper",
        borderRadius: "10px",
        p: 1,
        boxShadow: "0px 0px 10px 1px #1f293799",
      }}
    >
      <AddTask open={open} setOpen={setOpen} />
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
        }}
      >
        Quick Actions
      </Typography>
      <Button variant="contained" onClick={() => setOpen(true)}>
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
