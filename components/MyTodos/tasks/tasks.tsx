"use client";
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useTodos } from "../../../context/todos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LongMenu from "./Menu/menu";

export default function Tasks() {
  const tasksContext = useTodos();
  if (!tasksContext) return null;

  const { todos, setDate, date } = tasksContext;
  return (
    <Box
      sx={{
        p: 1,
        bgcolor: "background.paper",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 1px #1f293799",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        flexDirection: "column",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DateCalendar", "DateCalendar"]}
          sx={{
            border: "#606775 solid 1px ",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <DemoItem>
            <DateCalendar
              sx={{ width: "100%" }}
              value={dayjs(date)}
              onChange={(newValue) => setDate(newValue?.toDate() ?? new Date())}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      <Stack sx={{ width: "100%" }} spacing={1}>
        <Typography
          sx={{ color: "text.secondary", fontSize: { xs: 15, sm: 15, md: 20 }, }}
        >
          Sort By Due date:{" "}</Typography>
<FormControl >
  <InputLabel id="demo-simple-select-label" >Sort</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={'Desending'}
    label="Sort"
  >
    <MenuItem value={'Desending'} className="disabled">Desending</MenuItem>
    <MenuItem value={'Asending'} className="disabled">Asending</MenuItem>
  </Select>
</FormControl>
        
        {todos.map((todo) => {
          const isOverDue = new Date() > new Date(todo.expiresAt) && todo.status !== 'Completed';
          return (
            <Stack
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                border: "#606775 solid 1px ",
                borderRadius: "10px",
                p: 1,
              }}
              direction={"row"}
              key={todo.id}
            >
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <CheckCircleIcon
                  sx={{
                    color: isOverDue
                      ? "error.main"
                      : todo.status === "Completed"
                        ? "success.main"
                        : todo.status === "Pending"
                          ? "primary.main"
                          : todo.status === "In_Progress"
                            ? "warning.main"
                            : "white",
                  }}
                />{" "}
                <Stack sx={{ justifyContent: "center" }}>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: 15, sm: 15, md: 20 },
                    }}
                  >
                    {todo.task}
                  </Typography>
                  <Typography
                    className="disabled"
                    sx={{ fontSize: { xs: 11, sm: 13, md: 13 } }}
                  >
                    {todo.description}
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                className="disabled"
                sx={{ fontSize: { xs: 11, sm: 13, md: 13 } }}
              >
                Expires at: {new Date(todo.expiresAt).toLocaleString()}
              </Typography>
              <Typography
                sx={{
                  bgcolor:
                    todo.difficulty === "High"
                      ? "#ff00006f"
                      : todo.difficulty === "Normal"
                        ? "#ffae006f"
                        : "#2fff006f",
                  px: 1,
                  borderRadius: "16px",
                  maxHeight: "30px",
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
              <LongMenu status={todo.status} overDue={isOverDue} id={todo.id}/>
            </Stack>
          );
        })}
        <Stack direction={'row'} sx={{alignItems:'center',color:"primary.main",maxWidth:'100px', '&:hover':{
             cursor:'pointer',
             color:'info.main',
             textDecoration:'underline'
        }}}>
        <Typography>
          View all 
        </Typography><ArrowForwardOutlinedIcon/>          
        </Stack>

      </Stack>
    </Box>
  );
}
