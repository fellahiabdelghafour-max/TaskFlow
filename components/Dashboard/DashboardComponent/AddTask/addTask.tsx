import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDashboardContext } from "../../../../context/dashboard";

export default function AddTask({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const dashboardContext = useDashboardContext();
  if (!dashboardContext) return;

  const {
    taskTitle,
    setTaskTitle,
    desc,
    setDesc,
    startD,
    setStartD,
    dueD,
    setDueD,
    taskPriority,
    setTaskPriority,
    AddTask
  } = dashboardContext;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1.5}>
          <AddCircleIcon color="primary" sx={{ mt: 0.5 }} />
          <Stack spacing={0.5}>
            <Typography
              sx={{ fontSize: { xs: 15, sm: 15, md: 20 }, fontWeight: 600 }}
            >
              Add New Task
            </Typography>
            <Typography
              className="disabled"
              sx={{ fontSize: { xs: 11, sm: 13, md: 13 } }}
            >
              Create a new task and keep your team on track.
            </Typography>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Stack spacing={1}>
            <Typography
              sx={{
                fontSize: { xs: 11, sm: 13, md: 13 },
                color: "text.secondary",
              }}
            >
              Task Title{" "}
              <Box component="span" color="error">
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

          <Stack spacing={1}>
            <Typography
              sx={{
                fontSize: { xs: 11, sm: 13, md: 13 },
                color: "text.secondary",
              }}
            >
              Description
            </Typography>
            <TextField
              value={desc}
              fullWidth
              onChange={(e) => setDesc(e.target.value)}
              multiline
              rows={4}
              aria-multiline={true}
              sx={{ "& .MuiOutlinedInput-root": { minHeight: "150px" } }}
              placeholder="Add a detailed description (optional)"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1.5 }}
                    >
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
                  onChange={(newValue) => setStartD(newValue)}
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

          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", width: "100%" }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ color: "text.primary" }}
          >
            Cancel
          </Button>
          <Button
            onClick={()=>AddTask(setOpen)}
            autoFocus
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create Task
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
