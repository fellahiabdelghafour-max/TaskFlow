"use client";
import { Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { useDashboardContext } from "../../../context/dashboard";

import PendingIcon from "@mui/icons-material/Pending";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

type IconColor = "primary" | "warning" | "success" | "error";

const rowSx: SxProps<Theme> = {
  position: "relative",
  alignItems: "center",
  justifyContent: "space-between",
  pb: 1,
};

const labelSx: SxProps<Theme> = {
  fontSize: { xs: "11px", sm: "13px", md: "13px" },
  color: "text.secondary",
};

const sectionTitleSx: SxProps<Theme> = {
  color: "text.secondary",
  fontSize: { xs: "11px", sm: "15px", md: "18px" },
};

function FilterRow({
  Icon,
  color,
  label,
  value,
}: {
  Icon: SvgIconComponent;
  color: IconColor;
  label: string;
  value: number | string;
}) {
  return (
    <Stack direction="row" sx={rowSx}>
      <Stack direction="row" spacing={2}>
        <Icon sx={{ filter: "none" }} color={color} />
        <Typography className="disabled" sx={labelSx}>
          {label}
        </Typography>
      </Stack>
      <Typography className="disabled" sx={labelSx}>
        {value}
      </Typography>
    </Stack>
  );
}

export default function Filters() {
  const dashboardContext = useDashboardContext();

  if (!dashboardContext) return null;

  const { details } = dashboardContext;

  const statusRows = [
    { Icon: PendingIcon, color: "primary", label: "Pending", value: details.pendingTasks },
    { Icon: RotateLeftIcon, color: "warning", label: "In Progress", value: details.inProgressTasks },
    { Icon: CheckCircleIcon, color: "success", label: "Completed", value: details.completedTasks },
    { Icon: CancelIcon, color: "error", label: "Overdue", value: details.overDueTasks },
  ] as const;

  const priorityRows = [
    { Icon: ChatBubbleIcon, color: "error", label: "High", value: details.High },
    { Icon: ChatBubbleIcon, color: "warning", label: "Normal", value: details.Normal },
    { Icon: ChatBubbleIcon, color: "success", label: "Low", value: details.Low },
  ] as const;


  return (
    <Stack
      spacing={2}
      sx={{
        bgcolor: "background.paper",
        p: 1,
        borderRadius: "10px",
        minHeight: "100%",
        border:'solid 1px #1f29371f'
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: 15, sm: 15, md: 20 },
          borderBottom: "solid 2px #1f29371f",
          width:'100%',
          pb: 1,
        }}
      >
        Filters
      </Typography>

      <Typography sx={sectionTitleSx}>Status</Typography>
      {statusRows.map((row) => (
        <FilterRow key={row.label} {...row} />
      ))}

      <Typography sx={sectionTitleSx}>Priority</Typography>
      {priorityRows.map((row) => (
        <FilterRow key={row.label} {...row} />
      ))}
    </Stack>
  );
}