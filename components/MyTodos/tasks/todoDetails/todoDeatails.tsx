import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Box,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { useTodos } from "../../../../context/todos";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

export default function TodoDetails({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const todoContext = useTodos();
  if (!todoContext) return;

  const {} = todoContext;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1.5}>
          <TextSnippetIcon color="primary" sx={{ mt: 0.5 }} />
          <Stack spacing={0.5}>
            <Typography
              sx={{ fontSize: { xs: 15, sm: 15, md: 20 }, fontWeight: 600 }}
            >
              Todo Details
            </Typography>
          </Stack>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Typography>task:</Typography>
          <Typography>description:</Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0px, 1fr))",
              gap: 2,
            }}
          >
            <Card>
              <Typography>Status</Typography>
              <Typography>detail</Typography>
            </Card>
            <Card>
              <Typography>Priority</Typography>
              <Typography>detail</Typography>
            </Card>{" "}
            <Card>
              <Typography>Due date</Typography>
              <Typography>detail</Typography>
            </Card>
            <Card>
              <Typography>Last updated</Typography>
              <Typography>detail</Typography>
            </Card>
            <Card>
              <Typography>author</Typography>
              <Typography>detail</Typography>
            </Card>
            <Card>
              <Typography>Group</Typography>
              <Typography>detail</Typography>
            </Card>
          </Box>
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
            Close
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
