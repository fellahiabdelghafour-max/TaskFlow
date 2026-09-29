import { prisma } from "../../db";

export async function GET(request: Request) {
  const id = request.headers.get("x-user-id");
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  if (!id) {
    return Response.json({ message: "unAuthorized" }, { status: 403 });
  }

  if (!dateParam) {
    return Response.json({ message: "date is required" }, { status: 400 });
  }

  const targetDate = new Date(dateParam);

  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  const userTodos = await prisma.todo.findMany({
    where: {
      userId: id,
      startsAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    select:{
        id:true,
        expiresAt:true,
        task:true,
        description:true,
        difficulty:true,
        status:true
    }
  });

  return Response.json({ todos: userTodos }, { status: 200 });
}