"use client";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useTodos } from "../../../context/todos";
import EditeTask from "./Edite/edite";
import { useState } from "react";
import Delete from "./delete/delete";
import TSkelecton from "./tasksSkeleton/tasksSkeleton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";
import TodoCard from "./TodoCard/todoCard";
import TodoDetails from "./todoDetails/todoDeatails";
export default function Tasks() {
  const tasksContext = useTodos();
  const [openE, setOpenE] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [openDT, setOpenDT] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  if (!tasksContext) return null;

  const { todos, setDate, date, selectedTodoId, sort, setSort } = tasksContext;

  return (
    <Box
      sx={{
        px: 1,
        bgcolor: "background.paper",
        borderRadius: "10px",
        border: "solid 1px #1f29371f",
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexDirection: "column",
        height: !todos || todos.length > 1 ? "100%" : "auto",
      }}
    >
      <EditeTask open={openE} setOpen={setOpenE} id={selectedTodoId} />
      <Delete open={openD} setOpen={setOpenD} id={selectedTodoId} />
      <TodoDetails open={openDT} setOpen={setOpenDT}/>
      <Stack
        direction={"row"}
        spacing={1}
        sx={{ justifyContent: "center", alignItems: "flex-start" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={dayjs(date)}
            onChange={(v) => setDate(v?.toDate() ?? new Date())}
            sx={{
              width: "100%",
              maxWidth: 360,
              height: openCalendar ? 400 : 100,
              mx: "auto",
              transition: "all .3s ease",
            }}
          />
        </LocalizationProvider>
        <IconButton onClick={() => setOpenCalendar((p) => !p)}>
          {openCalendar ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Stack>

      <Stack sx={{ width: "100%" }} spacing={1}>
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ alignItems: "center", justifyContent: "flex-start" }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: 13, sm: 13, md: 15 },
            }}
          >
            Sort by:{" "}
          </Typography>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Due date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort === "desc" ? "Descending" : "Ascending"}
              label="Due date"
              onChange={(e) =>
                setSort(e.target.value === "Ascending" ? "asc" : "desc")
              }
            >
              <MenuItem
                value={"Descending"}
                sx={{ color: "text.secondary", borderRadius: "16px" }}
              >
                Descending
              </MenuItem>
              <MenuItem
                value={"Ascending"}
                sx={{ color: "text.secondary", borderRadius: "16px" }}
              >
                Ascending
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {!todos ? (
          <TSkelecton />
        ) : todos.length === 0 ? (
          <Stack spacing={1}>
            <Typography
              className="disabled"
              sx={{
                fontSize: { xs: 13, sm: 13, md: 15 },
                textAlign: "center",
                width: "100%",
                py: 2,
              }}
            >
              No tasks due on {date.toDateString()}
            </Typography>
            <Link
              href={"/Dashboard/tasks/MyTodos"}
              style={{ textDecoration: "none" }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  color: "primary.main",
                  maxWidth: "100px",
                  "&:hover": {
                    cursor: "pointer",
                    color: "info.main",
                    textDecoration: "underline",
                  },
                }}
              >
                <Typography sx={{ fontSize: { xs: 11, sm: 11, md: 13 } }}>
                  View all
                </Typography>
                <ArrowForwardOutlinedIcon
                  sx={{ fontSize: { xs: 13, sm: 13, md: 15 } }}
                />
              </Stack>
            </Link>
          </Stack>
        ) : (
          <Stack>
            {todos.map((todo) => (
              <Box key={todo.id}>
                <TodoCard todo={todo} setOpenE={setOpenE} setOpenD={setOpenD} setOpenDT={setOpenDT}/>
              </Box>
            ))}

            <Link
              href={"/Dashboard/tasks/MyTodos"}
              style={{ textDecoration: "none" }}
            >
              <Stack
                direction={"row"}
                sx={{
                  alignItems: "center",
                  color: "primary.main",
                  maxWidth: "100px",
                  "&:hover": {
                    cursor: "pointer",
                    color: "info.main",
                    textDecoration: "underline",
                  },
                }}
              >
                <Typography sx={{ fontSize: { xs: 11, sm: 11, md: 13 } }}>
                  View all
                </Typography>
                <ArrowForwardOutlinedIcon
                  sx={{ fontSize: { xs: 13, sm: 13, md: 15 } }}
                />
              </Stack>
            </Link>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
