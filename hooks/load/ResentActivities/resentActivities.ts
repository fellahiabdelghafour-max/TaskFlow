export default async function loadR(
  setRecentA: (
    value:{
      task: string;
      status:  "Completed" | 'Pending' | 'In_Progress';
      description: string;
      updatedAt: string;
      startsAt: string;
      expiresAt: string;
      author: { username: string; image: string | null };
      group: { name: string } | null;
    }[]| null,
  ) => void,
) {
  const res = await fetch("/api/dashboard/recent_activities");
  const data = await res.json();
  setRecentA(data.data);
}
