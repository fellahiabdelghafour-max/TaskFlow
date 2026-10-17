"use client";
import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import getAllTodos from "../../../hooks/load/Todos/all/all";
import { useEffect, useState } from "react";
import { TodoType, useTodos } from "../../../context/todos";
import TodoCard from "../tasks/TodoCard/todoCard";
import Delete from "../tasks/delete/delete";
import EditeTask from "../tasks/Edite/edite";
import DeleteAll from "./deleteAll/deleteAll";
import { useDashboardContext } from "../../../context/dashboard";
import TodoDetails from "../tasks/todoDetails/todoDeatails";

function color(B: string) {
  return B === "completed"
    ? "success"
    : B === "overDue"
      ? "error"
      : B === "pending"
        ? "info"
        : B === "all"
          ? "primary"
          : "warning";
}

export default function AllTodos({
  all,
}: {
  all: "MyTodos" | "RecentActivities";
}) {
  const [allTodoos, setAllTodos] = useState<TodoType[]>([]);
  const [total, setTotal] = useState(0);
  const [openD, setOpenD] = useState(false);
  const [openDA, setOpenDA] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [openDT, setOpenDT] = useState(false);
  const [Filter, setFilter] = useState("all");
  const [page, setpage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  function toggel(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      setSelectAll(
        allTodoos.length > 0 && allTodoos.every((todo) => next.has(todo.id)),
      );

      return next;
    });
  }

  useEffect(() => {
    setSelectAll(false);
    setSelected(new Set());
  }, [page]);

  function SelectAll() {
    const S = selectAll;
    if (!S) {
      setSelectAll(true);
      setSelected(new Set());
      for (const todo of allTodoos) {
        setSelected((prev) => {
          const next = new Set(prev);
          next.add(todo.id);
          return next;
        });
      }
    } else {
      setSelectAll(false);
      setSelected(new Set());
    }
  }
  const todoContext = useTodos();
  const dashboardContext = useDashboardContext();
  const selectedTodoId = todoContext?.selectedTodoId;
  const refreshKey = dashboardContext?.refreshKey;
  const refreshKey1 = todoContext?.refreshKey1;

  useEffect(() => {
    getAllTodos(all, setAllTodos, setTotal, Filter, page);
  }, [all, Filter, page, refreshKey, refreshKey1]);

  useEffect(() => {
    setpage(0);
    setSelectAll(false);
    setSelected(new Set());
  }, [total]);

  return (
    <Stack
      spacing={1}
      sx={{
        bgcolor: "background.paper",
        p: 1,
        border: "solid 1px #1f29371f",
        borderRadius: "16px",
      }}
    >
      <Delete open={openD} setOpen={setOpenD} id={selectedTodoId ?? ""} />
      <EditeTask open={openE} setOpen={setOpenE} id={selectedTodoId ?? ""} />
      <DeleteAll open={openDA} setOpen={setOpenDA} ids={[...selected]} />
      <TodoDetails open={openDT} setOpen={setOpenDT} />
      <Typography
        sx={{
          fontSize: { xs: 20, sm: 20, md: 30 },
          color: "text.secondary",
        }}
      >
        View All {all}
      </Typography>

      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Stack direction={"row"} spacing={1}>
          {["all", "completed", "pending", "inProgress", "overDue"].map(
            (B, i) => (
              <Button
                key={i}
                variant={"outlined"}
                sx={{ color: `${color(B)}.main`, position: "relative" }}
                color={color(B)}
                onClick={() => setFilter(B)}
              >
                <Button
                  component="span"
                  variant="contained"
                  color={color(B)}
                  sx={{
                    position: "absolute",
                    inset: -2,
                    color: "white",
                    transition: "clip-path .3s ease",
                    clipPath:
                      Filter === B ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                    "&:hover": {
                      transform: "none",
                    },
                  }}
                >
                  {B}
                </Button>
                {B}
              </Button>
            ),
          )}
        </Stack>
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <Typography
            className="disabled"
            sx={{ fontSize: { xs: 13, sm: 13, md: 15 } }}
          >
            {selected.size} tasks selected
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ color: "error.main" }}
            disabled={selected.size === 0}
            onClick={() => setOpenDA(true)}
          >
            Delete{`(${selected.size})`}
          </Button>
        </Stack>
      </Stack>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Stack direction={"row"} sx={{ alignItems: "center" }}>
          <Checkbox color="error" checked={selectAll} onChange={SelectAll} />
          <Typography className="disabled">Select all</Typography>
        </Stack>
      </Stack>
      {!allTodoos ? null : allTodoos.length === 0 ? (
        <Typography
          className="disabled"
          sx={{ width: "100%", textAlign: "center" }}
        >
          No Tasks {Filter}
        </Typography>
      ) : (
        allTodoos.map((todo) => (
          <Stack
            direction={"row"}
            spacing={1}
            key={todo.id}
            sx={{ width: "100%", alignItems: "center" }}
          >
            <Checkbox
              checked={selected.has(todo.id)}
              onChange={() => toggel(todo.id)}
            />
            <Box sx={{ width: "100%" }}>
              <TodoCard
                todo={todo}
                setOpenD={setOpenD}
                setOpenE={setOpenE}
                setOpenDT={setOpenDT}
              />
            </Box>
          </Stack>
        ))
      )}
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography
          className="disabled"
          sx={{ fontSize: { xs: 13, sm: 13, md: 15 } }}
        >
          Showing {total === 0 ? total : 1 + page * 10}-
          {(page + 1) * 10 > total ? total : (page + 1) * 10} of {total}
        </Typography>
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ color: "text.secondary" }}
            onClick={() => setpage((p) => p - 1)}
            disabled={page === 0}
          >
            {"<"}
          </Button>
          <Typography
            sx={{
              p: 1,
              bgcolor: "info.main",
              minWidth: "50px",
              textAlign: "center",
              color: "white",
              borderRadius: "16px",
            }}
          >
            {page + 1}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ color: "text.secondary" }}
            onClick={() => setpage((p) => p + 1)}
            disabled={total - page * 10 < 10}
          >
            {">"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
