import { TodoType } from "../../../../context/todos";

export default async function getAllTodos(
  all: "MyTodos" | "RecentActivities",
  setAllTodos: (T: TodoType[]) => void,
  setTotal: (T: number) => void,
  Filter: string,
  page:number
) {
    const skip = page*10;
  const res = await fetch(`/api/todo/allTodos?all=${all}&filter=${Filter}&skip=${skip}`);
  const data = await res.json();
  setAllTodos(data.data);
  setTotal(data.total);
}
