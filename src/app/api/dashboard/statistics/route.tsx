import { prisma } from "../../db";

export async function GET(Request: Request) {
  const id = Request.headers.get("x-user-id");
  if (!id) {
    return Response.json({ message: "unAuthorized" }, { status: 403 });
  }

  try {
    const now = new Date();
    const [
      groups,
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      overDueTasks,
      High,
      Medium,
      Low,
    ] = await Promise.all([
      prisma.group.count({
        where: {
          OR: [
            { members: { some: { userId: id, status: "ACCEPTED" } } },
            { adminId: id },
          ],
        },
      }),
      prisma.todo.count({
        where: { userId: id },
      }),

      prisma.todo.count({
        where: { userId: id, status: "Completed" },
      }),

      prisma.todo.count({
        where: { userId: id, status: "In_Progress", expiresAt: { gte: now } },
      }),
      prisma.todo.count({
        where: { userId: id, status: "Pending", expiresAt: { gte: now } },
      }),
      prisma.todo.count({
        where: {
          userId: id,
          expiresAt: { lt: now },
          NOT: { status: "Completed" },
        },
      }),

      prisma.todo.count({
        where: { userId: id, difficulty: "High"},
      }),
      prisma.todo.count({
        where: { userId: id, difficulty: "Normal"},
      }),
      prisma.todo.count({
        where: { userId: id, difficulty: "Easy"},
      }),
    ]);

    return Response.json(
      {
        statistics: {
          groups: groups,
          totalTasks: totalTasks,
          completedTasks: completedTasks,
          inProgressTasks: inProgressTasks,
          pendingTasks: pendingTasks,
          overDueTasks: overDueTasks,
          High:High,
          Medium:Medium,
          Low:Low,
        },
      },
      { status: 200 },
    );
  } catch {
    return Response.json({ message: "Unexpected error" }, { status: 500 });
  }
}
