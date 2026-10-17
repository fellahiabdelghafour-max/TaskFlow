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

import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useTodos } from "../../../../context/todos";
import UpdateTaskTitle from "./TaskTitle/taskTitle";
import UpdateTaskDesc from "./TaskDesc/taskDesc";
import { UpdateTaskDate } from "./TaskDate/taskDate";
import UpdateTaskP from "./TaskP/taskP";

export default function EditeTask({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
  id: string;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const todoContext = useTodos();
  if (!todoContext) return;

  const { Edite, loading } = todoContext;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1.5}>
          <AddCircleIcon color="primary" sx={{ mt: 0.5 }} />
          <Stack spacing={0.5}>
            <Typography
              sx={{ fontSize: { xs: 15, sm: 15, md: 20 }, fontWeight: 600 }}
            >
              Edite Task
            </Typography>
            <Typography
              className="disabled"
              sx={{ fontSize: { xs: 11, sm: 13, md: 13 } }}
            >
              Update your task now.
            </Typography>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <UpdateTaskTitle />
          <UpdateTaskDesc />
          <UpdateTaskDate />
          <UpdateTaskP />
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
            autoFocus
            variant="contained"
            onClick={() => Edite(setOpen, id)}
            startIcon={<SaveIcon />}
            loading={loading}
            loadingPosition="start"
          >
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
