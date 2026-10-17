import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTodos } from "../../../../context/todos";

export default function DeleteAll({
  open,
  setOpen,
  ids,
}: {
  open: boolean;
  setOpen: (O: boolean) => void;
  ids: string[];
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const todoContext = useTodos();
  if (!todoContext) return;

  const { DeleteAllTodos, loading } = todoContext;
  return (
    <React.Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        role="alertdialog"
      >
        <DialogTitle sx={{ color: "text.secondary" }}>
          {`Delete Todos(${ids.length}) !!`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="disabled"
            id="alert-dialog-slide-description"
          >
            {"You can't restore this todos, if you delete it now."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus className="disabled">
            Cancel
          </Button>
          <Button
            color={"error"}
            variant="contained"
            onClick={() => DeleteAllTodos(setOpen, ids)}
            loading={loading}
            loadingPosition={"start"}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
