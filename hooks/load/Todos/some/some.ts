
  export default  async function loadTodos(date:Date,sort:'asc'|'desc',setTodos:(value: {
    id: string;
    expiresAt: Date;
    task: string;
    description: string;
    difficulty: "High" | "Normal" | "Easy";
    status: "Completed" | "Pending" | "In_Progress";
}[] |null)=>void) {
      const res = await fetch(`/api/todo/user_todos?date=${date}&sort=${sort}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Failed to load todos");
      setTodos(data.todos);
    }