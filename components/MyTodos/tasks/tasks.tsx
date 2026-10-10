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
import PendingIcon from "@mui/icons-material/Pending";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";import LongMenu from "./Menu/menu";
import EditeTask from "./Edite/edite";
import { useState } from "react";
import Delete from "./delete/delete";
import TSkelecton from "./tasksSkeleton/tasksSkeleton";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
export default function Tasks() {
  const tasksContext = useTodos();
  const [openE, setOpenE] = useState(false);
  const [openD, setOpenD] = useState(false);
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
        height:!todos || todos.length > 1 ?"100%" : 'auto',
      }}
    >
      <EditeTask open={openE} setOpen={setOpenE} id={selectedTodoId} />
      <Delete open={openD} setOpen={setOpenD} id={selectedTodoId} />
      <Stack direction={'row'} spacing={1} sx={{justifyContent:'center',alignItems:'flex-start'}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

          <DateCalendar
  value={dayjs(date)}
  onChange={(v) => setDate(v?.toDate() ?? new Date())}
  sx={{ width: "100%", maxWidth: 360, height: openCalendar ? 400 :100, mx: "auto" ,transition:'all .3s ease'}}
/>
      </LocalizationProvider>    
      <IconButton onClick={()=>setOpenCalendar(p=>!p)}>
            {openCalendar  ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
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
        ) : (
          <Stack>
            {todos.map((todo) => {
              const isOverDue =
                new Date() > new Date(todo.expiresAt) &&
                todo.status !== "Completed";
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
                      filter:'none'
                    }

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
                  {
                     isOverDue
                        ? <CancelIcon sx={iconStyle}/>
                        : todo.status === "Completed"
                          ? <CheckCircleIcon sx={iconStyle}/>
                          : todo.status === "Pending"
                            ? <PendingIcon sx={iconStyle}/>
                            : <RotateLeftIcon sx={iconStyle}/>
                  }


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
                    />
                  </Box>
                </Stack>
              );
            })}

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
              <Typography>View all</Typography>
              <ArrowForwardOutlinedIcon />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
