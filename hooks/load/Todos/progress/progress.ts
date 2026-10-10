
 export default async function Progress(progressBy: "year" | "week" | "day" | "month",setProgress: (value: {
    total: number;
    completed: number;
} ) => void) {
        const res = await fetch(`/api/todo/progress?progress=${progressBy}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message ?? "Failed to load progress");
        setProgress(data);
    }