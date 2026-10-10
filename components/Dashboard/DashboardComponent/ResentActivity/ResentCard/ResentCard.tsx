import Image from "next/image";

import PendingIcon from "@mui/icons-material/Pending";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Stack, Typography } from "@mui/material";

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${Math.floor(diffHours / 24)} days ago`;
}

export default function ResentCard({
  R,
}: {
  R: {
    task: string;
    status: "Completed" | "Pending" | "In_Progress";
    description: string;
    updatedAt: string;
    startsAt: string;
    expiresAt: string;
    author: {
      username: string;
      image: string | null;
    };
    group: {
      name: string;
    } | null;
  };
}) {
  const isOverdue = new Date(R.expiresAt) < new Date();

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            color: isOverdue
              ? "error.main"
              : R.status === "Completed"
                ? "success.main"
                : R.status === "Pending"
                  ? "primary.main"
                  : R.status === "In_Progress"
                    ? "warning.main"
                    : "white",
          }}
        >
          {isOverdue ? (
            <CancelIcon sx={{ filter: "none" }} />
          ) : R.status === "Completed" ? (
            <CheckCircleIcon sx={{ filter: "none" }} />
          ) : R.status === "Pending" ? (
            <PendingIcon sx={{ filter: "none" }} />
          ) : R.status === "In_Progress" ? (
            <RotateLeftIcon sx={{ filter: "none" }} />
          ) : null}
        </Box>
        <Image
          alt="user_image"
          src={R.author.image || "/images/user.png"}
          width={50}
          height={50}
        />
      </Stack>
      <Stack direction="column">
        <Typography
          className="disabled"
          sx={{ fontSize: { xs: "13px", sm: "15px", md: "18px" } }}
        >
          {R.author.username}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
              display: "-webkit-box",
              WebkitLineClamp: 1,
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              maxWidth: "50px",
            }}
          >
            {R.task}
          </Typography>
          <Typography
            className="special-title"
            sx={{
              px: 1,
              color: "#0077ff !important",
              fontSize: { xs: "11px", sm: "13px", md: "13px" },
            }}
          >
            {R.group ? R.group.name : "Personal"}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        className="disabled"
        sx={{ fontSize: { xs: "11px", sm: "13px", md: "13px" } }}
      >
        {timeAgo(R.updatedAt)}
      </Typography>
    </Stack>
  );
}