'use clinet'

import { Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTodos } from "../../../../../context/todos";

export function UpdateTaskDate(){

  const todoContext = useTodos();
  if (!todoContext) return;

  const {
    startD,
    setStartD,
    dueD,
    setDueD,
  } = todoContext;


  return<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Stack spacing={1} sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: 11, sm: 13, md: 13 },
                  color: "text.secondary",
                }}
              >
                Start Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={startD}
                  onChange={(newValue) => setStartD(dayjs(newValue))}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": { color: "text.secondary" },
                  }}
                />
              </LocalizationProvider>
            </Stack>

            <Stack spacing={1} sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: 11, sm: 13, md: 13 },
                  color: "text.secondary",
                }}
              >
                Due Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={dueD}
                  onChange={(newValue) => setDueD(newValue)}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": { color: "text.secondary" },
                  }}
                />
              </LocalizationProvider>
            </Stack>
          </Stack>
}