'use client'
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useTodos } from "../../../../../context/todos";


export default function UpdateTaskP(){
  const todoContext = useTodos();
  if (!todoContext) return;

  const {
    taskPriority,
    setTaskPriority,
  } = todoContext;


  return <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Priority
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              label="Priority"
              sx={{ color: "text.secondary" }}
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
            >
              <MenuItem value={"High"} sx={{ color: "text.secondary" }}>
                <Stack direction={"row"}>
                  <Box
                    sx={{
                      bgcolor: "error.main",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      mr: 1,
                    }}
                  />
                  High
                </Stack>
              </MenuItem>
              <MenuItem value={"Normal"} sx={{ color: "text.secondary" }}>
                <Stack direction={"row"}>
                  <Box
                    sx={{
                      bgcolor: "warning.main",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      mr: 1,
                    }}
                  />
                  Normal
                </Stack>
              </MenuItem>
              <MenuItem value={"Easy"} sx={{ color: "text.secondary" }}>
                <Stack direction={"row"}>
                  <Box
                    sx={{
                      bgcolor: "success.main",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      mr: 1,
                    }}
                  />
                  Easy
                </Stack>
              </MenuItem>
            </Select>
          </FormControl>
}