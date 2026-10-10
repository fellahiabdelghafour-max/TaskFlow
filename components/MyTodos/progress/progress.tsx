"use client";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useTodos } from "../../../context/todos";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
export default function Progress() {
  const todoContext = useTodos();
  if (!todoContext) return;
  const { progress, progressBy, setProgressBy, upcoming } = todoContext;
  const total = progress.total;
  const completed = progress.completed;
  const percentage = total === 0 ? 0 : ((completed * 100) / total).toFixed(0);
  const { title, subtitle } = (() => {
    if (Number(percentage) >= 75) {
      return {
        title: "Almost there",
        subtitle: "Just a few tasks left. Finish strong!",
      };
    } else if (Number(percentage) >= 50) {
      return {
        title: "Halfway there",
        subtitle: "More than half done. Keep the momentum.",
      };
    } else if (Number(percentage) >= 25) {
      return {
        title: "Making progress",
        subtitle: "You're warming up. One more task!",
      };
    } else if (Number(percentage) > 0) {
      return { title: "Good start", subtitle: "Every finished task counts." };
    } else {
      return {
        title: "Let's get started",
        subtitle: "Pick one small task and finish it first.",
      };
    }
  })();
 
  return (
    <Stack
      sx={{
        p: 1,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <Stack spacing={1} direction={"row"}>
        <Button
          variant={progressBy === "day" ? "contained" : "outlined"}
          sx={{
            color: progressBy === "day" ? "white" : "text.secondary",
            "&:hover": { transform: "none" },
            bgcolor: progressBy === "day" ? "none" : "ackground.paper",
          }}
          onClick={() => setProgressBy("day")}
        >
          day
        </Button>
        <Button
          variant={progressBy === "week" ? "contained" : "outlined"}
          sx={{
            color: progressBy === "week" ? "white" : "text.secondary",
            "&:hover": { transform: "none" },
            bgcolor: progressBy === "week" ? "none" : "ackground.paper",
          }}
          onClick={() => setProgressBy("week")}
        >
          week
        </Button>
        <Button
          variant={progressBy === "month" ? "contained" : "outlined"}
          sx={{
            color: progressBy === "month" ? "white" : "text.secondary",
            "&:hover": { transform: "none" },
            bgcolor: progressBy === "month" ? "none" : "ackground.paper",
          }}
          onClick={() => setProgressBy("month")}
        >
          month
        </Button>
        <Button
          variant={progressBy === "year" ? "contained" : "outlined"}
          sx={{
            color: progressBy === "year" ? "white" : "text.secondary",
            "&:hover": { transform: "none" },
            bgcolor: progressBy === "year" ? "none" : "ackground.paper",
          }}
          onClick={() => setProgressBy("year")}
        >
          year
        </Button>
      </Stack>
      <Stack
        sx={{
          backgroundImage: "url(/images/progressBG.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          borderRadius: "16px",
          p: 1,
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            alignSelf: "flex-start",
            fontSize: { xs: 20, sm: 20, md: 20, lg: 30 },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            alignSelf: "flex-start",
            color: "white",
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
          }}
        >
          {subtitle}
        </Typography>

        <Box sx={{ position: "relative", display: "inline-flex", my: 2 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={140}
            thickness={4}
            sx={{ color: "rgba(255,255,255,0.3)" }}
          />

          <CircularProgress
            variant="determinate"
            value={Number(percentage)}
            size={140}
            thickness={4}
            sx={{
              color: "#ffffff",
              position: "absolute",
              left: 0,
              transform: "rotate(-90deg) !important",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {percentage}%
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            alignSelf: "flex-start",
            color: "white",
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
          }}
        >
          {completed} of {total} tasks completed
        </Typography>
      </Stack>
      <Stack
        sx={{
          p: 1,
          borderRadius: "10px",
          display: "flex",
          gap: 1,
          flexDirection: "column",
          minHeight: "100%",
          border: "solid 1px #1f29371f",
          width: "100%",
        }}
      >
        {!upcoming ? null : upcoming.length === 0 ? (
          <Typography>No upcoming todos yet!</Typography>
        ) : (
          upcoming.map((UC, i) => {
            const date = new Date();
            const Y = date.getFullYear();
            const M = date.getMonth();
            const D = date.getDate();
            const todoTime =
              new Date(UC.expiresAt) > new Date(Y, M, D) &&
              new Date(UC.expiresAt) < new Date(Y, M, D + 1)
                ? "Tody"
                : new Date(UC.expiresAt) > new Date(Y, M, D + 1) &&
                    new Date(UC.expiresAt) < new Date(Y, M, D + 2)
                  ? "Tomorrow"
                  : new Date(UC.expiresAt).toDateString();

            return (
              <Stack key={i} direction={"row"} spacing={1}>
                <DataSaverOffIcon
                  sx={{
                    color:
                      UC.difficulty === "Easy"
                        ? "#3fcf22"
                        : UC.difficulty === "Normal"
                          ? "#ffae00"
                          : "#ff0000",
                  }}
                />
                <Stack>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: 13, sm: 13, md: 15 },
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {UC.task}
                  </Typography>
                  <Stack direction={"row"} spacing={1}>
                    <Typography
                      className="disabled"
                      sx={{ fontSize: { xs: 11, sm: 11, md: 13 } }}
                    >
                      {todoTime}
                    </Typography>
                    <Typography
                      sx={{
                        color:
                          UC.difficulty === "Easy"
                            ? "#3fcf22"
                            : UC.difficulty === "Normal"
                              ? "#ffae00"
                              : "#ff0000",
                        fontSize: { xs: 11, sm: 11, md: 13 },
                      }}
                    >
                      ◆ {UC.difficulty}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            );
          })
        )}
      </Stack>
      <Stack
        sx={{
          p: 1,
          backgroundImage: "url(/images/workingBG.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: "16px",
          minHeight: "100px",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            width: "50%",
          }}
        >
          Small steps make big progress !
        </Typography>
        <Typography
          className="disabled"
          sx={{
            fontSize: { xs: "11px", sm: "13px", md: "13px" },
            width: "50%",
          }}
        >
          Keep up the great work !
        </Typography>
      </Stack>
    </Stack>
  );
}
