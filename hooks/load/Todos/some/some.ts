import { TodoType } from "../../../../context/todos";

  export default  async function loadTodos(date:Date,sort:'asc'|'desc',setTodos:(T:TodoType[])=>void) {
      const res = await fetch(`/api/todo/user_todos?date=${date}&sort=${sort}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Failed to load todos");
      setTodos(data.todos);
    }