"use client";
import { Stack, Typography } from "@mui/material";
import { useDashboardContext } from "../../../context/dashboard";

import PendingIcon from "@mui/icons-material/Pending";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
export default function Filters() {
  const dashboardtContext = useDashboardContext();

  if (!dashboardtContext) return null;

  const { details } = dashboardtContext;

  return (
    <Stack
      spacing={1}
      sx={{
        bgcolor: "background.paper",
        p: 1,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 1px #1f293799",
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: 15, sm: 15, md: 20 },
          borderBottom: "solid 2px #0084ff39",
          pb: 1,
        }}
      >
        Filters
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: "11px", sm: "15px", md: "18px" },
        }}
      >
        Status
      </Typography>

      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {" "}
        <Stack direction={"row"} spacing={1}>
          <PendingIcon sx={{ filter: "none" }} color={"primary"} />{" "}
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              color: "text.secondary",
            }}
          >
            Pending
          </Typography>
        </Stack>{" "}
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            color: "text.secondary",
          }}
        >
          {details.pendingTasks}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {" "}
        <Stack direction={"row"} spacing={1}>
          <RotateLeftIcon sx={{ filter: "none" }} color={"warning"} />{" "}
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              color: "text.secondary",
            }}
          >
            In Progress
          </Typography>
        </Stack>{" "}
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            color: "text.secondary",
          }}
        >
          {details.inProgressTasks}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {" "}
        <Stack direction={"row"} spacing={1}>
          <CheckCircleIcon sx={{ filter: "none" }} color={"success"} />{" "}
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              color: "text.secondary",
            }}
          >
            Completed
          </Typography>
        </Stack>{" "}
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            color: "text.secondary",
          }}
        >
          {details.completedTasks}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {" "}
        <Stack direction={"row"} spacing={1}>
          <CancelIcon sx={{ filter: "none" }} color={"error"} />{" "}
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              color: "text.secondary",
            }}
          >
            Overdue
          </Typography>
        </Stack>{" "}
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            color: "text.secondary",
          }}
        >
          {details.overDueTasks}
        </Typography>
      </Stack>

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: "11px", sm: "15px", md: "18px" },
        }}
      >
        Priority
      </Typography>

      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {" "}
        <Stack direction={"row"} spacing={1}>
          <ChatBubbleIcon sx={{ filter: "none" }} color={"error"} />{" "}
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              color: "text.secondary",
            }}
          >
            High
          </Typography>
        </Stack>{" "}
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            color: "text.secondary",
          }}
        >
          {details.High}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {" "}
        <Stack direction={"row"} spacing={1}>
          <ChatBubbleIcon sx={{ filter: "none" }} color={"warning"} />{" "}
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              color: "text.secondary",
            }}
          >
            Medium
          </Typography>
        </Stack>{" "}
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            color: "text.secondary",
          }}
        >
          {details.Medium}
        </Typography>
      </Stack>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        {" "}
        <Stack direction={"row"} spacing={1}>
          <ChatBubbleIcon sx={{ filter: "none" }} color={"success"} />{" "}
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              color: "text.secondary",
            }}
          >
            Low
          </Typography>
        </Stack>{" "}
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            color: "text.secondary",
          }}
        >
          {details.Low}
        </Typography>
      </Stack>
    </Stack>
  );
}
