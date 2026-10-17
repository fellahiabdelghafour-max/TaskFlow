'use client'
import { Box, Stack, Typography } from "@mui/material";
import LongMenu from "../Menu/menu";
import PendingIcon from "@mui/icons-material/Pending";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { TodoType } from "../../../../context/todos";

export default function TodoCard({
  todo,
  setOpenE,
  setOpenD,
  setOpenDT
}: {
  todo:TodoType;
  setOpenD: (O: boolean) => void;
  setOpenE: (O: boolean) => void;
  setOpenDT:(O:boolean)=>void;
}) {
  const isOverDue =
    new Date() > new Date(todo.expiresAt) && todo.status !== "Completed";
  const iconStyle = {
    flexShrink: 0,
    mt: { xs: 0.5, md: 0 },
    color: isOverDue
      ? "error.main"
      : todo.status === "Completed"
        ? "success.main"
        : todo.status === "Pending"
          ? "primary.main"
          : "warning.main",
    filter: "none",
  };

  return (
    <Stack
      key={todo.id}
      direction="row"
      spacing={{ xs: 1, md: 2 }}
      sx={{
        alignItems: { xs: "flex-start", md: "center" },
        border: "solid 1px #556b8b1f",
        borderRadius: "10px",
        p: 1,
      }}
    >
      {isOverDue ? (
        <CancelIcon sx={iconStyle} />
      ) : todo.status === "Completed" ? (
        <CheckCircleIcon sx={iconStyle} />
      ) : todo.status === "Pending" ? (
        <PendingIcon sx={iconStyle} />
      ) : (
        <RotateLeftIcon sx={iconStyle} />
      )}

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 0.5, md: 2 }}
        sx={{
          flex: 1,
          minWidth: 0,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Stack sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: 15, md: 20 },
              overflowWrap: "anywhere",
            }}
          >
            {todo.task}
          </Typography>
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: 11, md: 13 },
              overflowWrap: "anywhere",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {todo.description}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            flexShrink: 0,
            flexWrap: "wrap",
            rowGap: 0.5,
          }}
        >
          <Typography
            className="disabled"
            sx={{
              fontSize: { xs: 11, md: 13 },
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <CalendarMonthOutlinedIcon fontSize="inherit" />
            {new Date(todo.expiresAt).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Typography>

          <Typography
            sx={{
              bgcolor:
                todo.difficulty === "High"
                  ? "#ff000023"
                  : todo.difficulty === "Normal"
                    ? "#ffae002c"
                    : "#2fff0025",
              px: 1,
              borderRadius: "16px",
              fontSize: { xs: 11, md: 14 },
              whiteSpace: "nowrap",
              color:
                todo.difficulty === "High"
                  ? "#d10000"
                  : todo.difficulty === "Normal"
                    ? "#cc8b00"
                    : "#27d400",
            }}
          >
            {todo.difficulty}
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ flexShrink: 0 }}>
        <LongMenu
          status={todo.status}
          overDue={isOverDue}
          id={todo.id}
          setOpenE={setOpenE}
          setOpenD={setOpenD}
          setOpenDT={setOpenDT}
        />
      </Box>
    </Stack>
  );
}
