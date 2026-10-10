"use server";

export default async function loadS(
  setStatistics: (
    value:
      | {
          day: string;
          completed: number;
          total: number;
        }[]
      | ((
          prevState:
            | {
                day: string;
                completed: number;
                total: number;
              }[]
            | null,
        ) =>
          | {
              day: string;
              completed: number;
              total: number;
            }[]
          | null)
      | null,
  ) => void,
) {
  const res = await fetch("/api/dashboard/bar_chart");
  const data = await res.json();
  setStatistics(data.data);
}
