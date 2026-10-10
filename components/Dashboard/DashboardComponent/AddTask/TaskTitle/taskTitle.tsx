'use client'

import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useDashboardContext } from "../../../../../context/dashboard";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

export default function TaskTitle(){

      const dashboardContext = useDashboardContext();
  if (!dashboardContext) return;  

  const {
    taskTitle,
    setTaskTitle,
  } = dashboardContext;  

  return<Stack spacing={1}>
            <Typography
              sx={{
                fontSize: { xs: 11, sm: 13, md: 13 },
                color: "text.secondary",
              }}
            >
              Task Title{" "}
              <Box component="span" sx={{color:'red'}}>
                *
              </Box>
            </Typography>
            <TextField
              value={taskTitle}
              fullWidth
              placeholder="Enter Task Title"
              onChange={(e) => setTaskTitle(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LibraryAddCheckIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
}