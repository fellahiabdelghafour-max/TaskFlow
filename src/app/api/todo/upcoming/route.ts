import { prisma } from "../../db";

export async function GET(Request: Request) {
  const userId = Request.headers.get("x-user-id");
  if (!userId) {
    return Response.json({ message: "unAuthorized" }, { status: 401 });
  }
  try {
    const Upcoming = await prisma.todo.findMany({
      where: {
        status: { not: "Completed" },
        expiresAt: { gt: new Date() },
        userId,
      },
      take: 4,
      orderBy: { expiresAt: "asc" },
      select:{
        task:true,
        expiresAt:true,
        difficulty:true
      }
    });

    return Response.json({ Upcoming }, { status: 200 });
  } catch {
    Response.json({ message: "Unexpected error" }, { status: 500 });
  }
}
