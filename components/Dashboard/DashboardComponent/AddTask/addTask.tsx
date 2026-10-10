'use client'
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDashboardContext } from "../../../../context/dashboard";
import TaskP from "./TaskP/taskP";
import { TaskDate } from "./TaskDate/taskDate";
import TaskDesc from "./TaskDesc/taskDesc";
import TaskTitle from "./TaskTitle/taskTitle";

export default function AddTask() {
  const dashboardContext = useDashboardContext();
  if (!dashboardContext) return;  

  const {
    AddTask,
    openT,
    setOpenT,
    loading
  } = dashboardContext;  
  const handleClose = () => {
    setOpenT(false);
  };

  return (
    <Dialog open={openT} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1.5}>
          <AddCircleIcon color="primary" sx={{ mt: 0.5, filter:'none' }} />
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
          <TaskTitle/>

          <TaskDesc/>

          <TaskDate />

          <TaskP />

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
            onClick={()=>AddTask()}
            autoFocus
            variant="contained"
            startIcon={<AddIcon />}
            loading={loading}
            loadingPosition="start"
          >
            Create Task
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}