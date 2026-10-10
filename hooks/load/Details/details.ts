
export default async function loadD(
  setdetails: (D: {
    groups: number;
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    pendingTasks: number;
    overDueTasks: number;
    High: number;
    Normal: number;
    Low: number;
  }) => void,
) {
  const res = await fetch("/api/dashboard/statistics");
  const data = await res.json();
  setdetails(data.statistics);
}
