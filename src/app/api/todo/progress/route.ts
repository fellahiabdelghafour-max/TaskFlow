import { z } from "zod";
import { prisma } from "../../db";

const progressSchema = z.enum(["day", "week", "month", "year"]);
type Period = z.infer<typeof progressSchema>;

function getRange(period: Period, now = new Date()) {
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();

  switch (period) {
    case "day":
      return { start: new Date(y, m, d), end: new Date(y, m, d + 1) };
    case "week": {
      const dow = now.getDay();
      return { start: new Date(y, m, d - dow), end: new Date(y, m, d - dow + 7) };
    }
    case "month":
      return { start: new Date(y, m, 1), end: new Date(y, m + 1, 1) };
    case "year":
      return { start: new Date(y, 0, 1), end: new Date(y + 1, 0, 1) };
  }
}

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id");
  const { searchParams } = new URL(request.url);

  if (!userId) {
    return Response.json({ message: "unAuthorized" }, { status: 401 });
  }

  const parsed = progressSchema.safeParse(searchParams.get("progress"));
  if (!parsed.success) {
    return Response.json({ message: "invalid progress" }, { status: 400 });
  }

  const { start, end } = getRange(parsed.data);
  const where = { userId,
  expiresAt: { gte: start, lt: end },
  };

  try {
    const [total, completed] = await Promise.all([
      prisma.todo.count({ where }),
      prisma.todo.count({ where: { ...where, status: "Completed" } }),
    ]);

    return Response.json({ total, completed }, { status: 200 });
  } catch (error) {
    console.error("Failed to compute progress:", error);
    return Response.json({ message: "Unexpected error" }, { status: 500 });
  }
};