"use client";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackBar } from "../../context/snackBarContext";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

export default function SnackBar() {
  const snackBarContext = useSnackBar();
  if (!snackBarContext) return;
  const { open, setOpen, message, type } = snackBarContext;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const BG =
    type === "success" ? "#d0ffd6" : type === "info" ? "#baedff" : "#ffc3c3";
  const color =
    type === "success" ? "#008b20" : type === "info" ? "#009dff" : "#ff0000";
  const icon =
    type === "error" ? (
      <ReportGmailerrorredIcon />
    ) : type === "info" ? (
      <LightbulbOutlinedIcon />
    ) : null;

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          icon={icon}
          onClose={handleClose}
          variant="filled"
          sx={{
            width: "100%",
            bgcolor: BG,
            color: color,
            border: `solid ${color}`,
            borderRadius: "10px",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
