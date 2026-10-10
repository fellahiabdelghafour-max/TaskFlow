'use client'

import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { useTodos } from "../../../../../context/todos";

export default function UpdateTaskTitle(){

  const todoContext = useTodos();
  if (!todoContext) return;

  const {
    taskTitle,
    setTaskTitle,
  } = todoContext;


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