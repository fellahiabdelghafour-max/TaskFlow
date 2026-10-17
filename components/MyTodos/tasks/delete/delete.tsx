import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTodos } from "../../../../context/todos";

export default function Delete({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (O: boolean) => void;
  id: string;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const todoContext = useTodos();
  if (!todoContext) return;

  const { DeleteTodo,loading } = todoContext;

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
          {"Delete Todo !!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="disabled"
            id="alert-dialog-slide-description"
          >
            {"You can't restore the todo, if you delete it now."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus className="disabled">
            Cancel
          </Button>
          <Button color={"error"} variant="contained" onClick={()=>DeleteTodo(setOpen,id)} loading={loading} loadingPosition="start">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
