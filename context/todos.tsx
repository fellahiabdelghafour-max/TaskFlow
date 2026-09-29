"use client";
import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSnackBar } from "./snackBarContext";

interface TodoType {
  id: string;
  expiresAt: Date;
  task: string;
  description: string;
  difficulty: "High" | "Normal" | "Easy";
  status: "Completed" | "Pending" | "In_Progress";
}

interface TodosProps {
  todos: TodoType[];
  setDate: (D: Date) => void;
  date: Date;
  changeStatus: (id: string) => void;
}

const TodosContext = createContext<TodosProps | null>(null);

export default function TodosProvider({ children }: { children: ReactNode }) {
  const snackBarContext = useSnackBar();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const newDate = new Date();
  const [date, setDate] = useState<Date>(newDate);

useEffect(() => {
  async function loadTodos() {
    try {
      const res = await fetch(`/api/todo/user_todos?date=${date}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message ?? "Failed to load todos");
      setTodos(data.todos);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      snackBarContext?.setMessage(message);
      snackBarContext?.setType("error");
      snackBarContext?.setOpen(true);
    }
  }
  loadTodos();
}, [date,snackBarContext]);


  async function changeStatus(id: string) {
    
    if (!snackBarContext) return;
  const { setMessage, setOpen, setType } = snackBarContext;
    try {
      const res = await fetch(`/api/todo/change_status?id=${id}`, {
        method: "POST",
      });

      const data = await res.json();
      console.log(res)
      if (!res.ok) throw new Error(data.message);
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

  return (
    <TodosContext.Provider value={{ todos, setDate, date, changeStatus }}>
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => useContext(TodosContext);
