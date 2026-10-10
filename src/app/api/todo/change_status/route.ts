import { prisma } from "../../db";

export async function POST(Request: Request) {
  const userId = Request.headers.get("x-user-id");
  const { searchParams } = new URL(Request.url);
  const id = searchParams.get("id");

  if (!userId) {
    return Response.json({ message: "unAuthorized" }, { status: 401 });
  }

  if (!id) {
    return Response.json({ message: "Wrong todo id" }, { status: 400 });
  }

  const todo = await prisma.todo.findUnique({ where: { id: id ?? "" } });

  if (!todo) {
    return Response.json({ message: "Wrong todo id" }, { status: 404 });
  }

  if (todo.userId !== userId) {
    return Response.json({ message: "unAuthorized" }, { status: 401 });
  }

  if (todo.status === "Pending" && new Date() < new Date(todo.startsAt)) {
    return Response.json(
      { message: "Todo hasn't started yet" },
      { status: 400 },
    );
  }

  if (todo.status !== "Completed" && new Date() < new Date(todo.expiresAt)) {
    await prisma.todo.update({
      data: {
        status: todo.status === "Pending" ? "In_Progress" : "Completed",
      },
      where: {
        id: id,
      },
    });
    return Response.json({ message: "Success" }, { status: 200 });
  }

  return Response.json({ message: "Unexpected error" }, { status: 500 });
}
