
  export default  async function loadUpcoming(setUpcoming: (value: {
    task: string;
    expiresAt: Date;
    difficulty: "High" | "Normal" | "Easy";
}[]) => void) {
        const res = await fetch(`/api/todo/upcoming`);
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message ?? "Failed to load the upcoming todos");
        setUpcoming(data.Upcoming);
    }