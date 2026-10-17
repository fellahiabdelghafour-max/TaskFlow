"use client";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSnackBar } from "./snackBarContext";
import dayjs, { Dayjs } from "dayjs";
import loadTodos from "../hooks/load/Todos/some/some";
import Progress from "../hooks/load/Todos/progress/progress";
import loadUpcoming from "../hooks/load/Todos/upcoming/upcoming";

export interface TodoType {
  id: string;
  expiresAt: Date;
  task: string;
  description: string;
  difficulty: "High" | "Normal" | "Easy";
  status: "Completed" | "Pending" | "In_Progress";
  updatedAt: Date;
  author: { username: string; id: string; image: string };
  group: { name: string };
}

interface TodosProps {
  todos: TodoType[] | null;
  setDate: (D: Date) => void;
  date: Date;
  changeStatus: (id: string) => void;
  taskTitle: string;
  setTaskTitle: (t: string) => void;
  desc: string;
  setDesc: (d: string) => void;
  startD: Dayjs;
  setStartD: (d: Dayjs) => void;
  dueD: Dayjs | null;
  setDueD: (d: Dayjs | null) => void;
  taskPriority: "High" | "Medium" | "Easy";
  setTaskPriority: (p: "High" | "Medium" | "Easy") => void;
  Edite: (O: (O: boolean) => void, id: string) => void;
  selectedTodoId: string;
  setSelectedTodoId: (S: string) => void;
  DeleteTodo: (O: (O: boolean) => void, id: string) => void;
  DeleteAllTodos:(O:(O:boolean)=>void,ids:string[])=>void,
  sort: "asc" | "desc";
  setSort: (S: "asc" | "desc") => void;
  progress: { completed: number; total: number };
  progressBy: "day" | "week" | "month" | "year";
  setProgressBy: (P: "day" | "week" | "month" | "year") => void;
  upcoming: {
    task: string;
    expiresAt: Date;
    difficulty: "Normal" | "High" | "Easy";
  }[];
  loading:boolean;
  refreshKey1:number;
}

const TodosContext = createContext<TodosProps | null>(null);

export default function TodosProvider({ children }: { children: ReactNode }) {
  const snackBarContext = useSnackBar();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const newDate = new Date();
  const [date, setDate] = useState<Date>(newDate);
  const [refreshKey1,setRefreshKey1] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startD, setStartD] = useState<Dayjs>(dayjs(new Date()));
  const [dueD, setDueD] = useState<Dayjs | null>(null);
  const [taskPriority, setTaskPriority] = useState<"High" | "Medium" | "Easy">(
    "Easy",
  );
  const [selectedTodoId, setSelectedTodoId] = useState("");
  const [sort, setSort] = useState<"desc" | "asc">("desc");
  const [progress, setProgress] = useState({ total: 1, completed: 0 });
  const [progressBy, setProgressBy] = useState<
    "day" | "week" | "month" | "year"
  >("week");
  const [upcoming, setUpcoming] = useState<
    { task: string; expiresAt: Date; difficulty: "Normal" | "High" | "Easy" }[]
  >([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    loadTodos(date, sort, setTodos);
    Progress(progressBy, setProgress);
    loadUpcoming(setUpcoming);
  }, [date, snackBarContext, sort, progressBy]);

  async function changeStatus(id: string) {
    if (!snackBarContext) return;
    const { setMessage, setOpen, setType } = snackBarContext;
    try {
      const res = await fetch(`/api/todo/change_status?id=${id}`, {
        method: "POST",
      });

      const data = await res.json();
      console.log(res);
      if (!res.ok) throw new Error(data.message);
      setRefreshKey1(p=>p+1);
      setMessage("Status changed successfully");
      setType("success");
      setOpen(true);
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unexpected error";

      setMessage(error);
      setType("error");
      setOpen(true);
    }
  }

  async function Edite(setOpenE: (O: boolean) => void, id: string) {
    setLoading(true);
    if (!snackBarContext) return;
    const { setMessage, setOpen, setType } = snackBarContext;
    const newStartDate = startD ? startD.toDate() : null;
    const newExpiresDate = dueD ? dueD.toDate() : null;

    try {
      const res = await fetch(`/api/todo/edit?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskTitle,
          desc: desc,
          priority: taskPriority,
          startsAt: newStartDate,
          expiresAt: newExpiresDate,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setRefreshKey1(p=>p+1);
      setMessage("Updated successfully");
      setType("success");
      setOpen(true);
      setOpenE(false);
      setTaskPriority("Easy");
      setTaskTitle("");
      setDesc("");
      setStartD(dayjs(new Date()));
      setDueD(null);
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unexpected error";

      setMessage(error);
      setType("error");
      setOpen(true);
    }
    setLoading(false);
  }

  async function DeleteTodo(setOpenD: (O: boolean) => void, id: string) {
    setLoading(true)
    if (!snackBarContext) return;
    const { setMessage, setOpen, setType } = snackBarContext;

    try {
      const res = await fetch(`/api/todo/delete?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setRefreshKey1(p=>p+1);
      setMessage("Deleted Successfully");
      setType("success");
      setOpen(true);
      setOpenD(false);
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unexpected error";

      setMessage(error);
      setType("error");
      setOpen(true);
    }
    setLoading(false)
  }

  async function DeleteAllTodos(setOpenD: (O: boolean) => void, ids: string[]) {
    setLoading(true);
    if (!snackBarContext) return;
    const { setMessage, setOpen, setType } = snackBarContext;

    try {
      const res = await fetch(`/api/todo/deleteAll`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setRefreshKey1(p=>p+1);
      setMessage("Deleted Successfully");
      setType("success");
      setOpen(true);
      setOpenD(false);
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unexpected error";

      setMessage(error);
      setType("error");
      setOpen(true);
    }
    setLoading(false);
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setDate,
        date,
        changeStatus,
        taskTitle,
        setTaskTitle,
        desc,
        setDesc,
        startD,
        setStartD,
        dueD,
        setDueD,
        taskPriority,
        setTaskPriority,
        Edite,
        selectedTodoId,
        setSelectedTodoId,
        DeleteTodo,
        sort,
        setSort,
        progress,
        progressBy,
        setProgressBy,
        upcoming,
        DeleteAllTodos,
        loading,
        refreshKey1
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export const 

useTodos = () => useContext(TodosContext);
