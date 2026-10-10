import { prisma } from "../../db";

const VALID_PRIORITIES = ["High", "Normal", "Easy"];

export async function PATCH(Request: Request) {
  const userId = Request.headers.get("x-user-id");
  const { searchParams } = new URL(Request.url);
  const todoId = searchParams.get("id");

  if (!userId) {
    return Response.json({ message: "unAuthorized" }, { status: 401 });
  }

  if (!todoId) {
    return Response.json({ message: "Wrong todo id" }, { status: 400 });
  }

  const existingTodo = await prisma.todo.findUnique({ where: { id: todoId } });

  if (!existingTodo || existingTodo.userId !== userId) {
    return Response.json({ message: "Wrong todo id" }, { status: 404 });
  }

  const { task, desc, priority, startsAt, expiresAt } = await Request.json();

  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    return Response.json({ message: "Invalid priority value." }, { status: 400 });
  }

  const newStart = startsAt ? new Date(startsAt) : existingTodo.startsAt;
  const newDue = expiresAt ? new Date(expiresAt) : existingTodo.expiresAt;

  if (startsAt && isNaN(newStart.getTime())) {
    return Response.json({ message: "Invalid start date." }, { status: 400 });
  }
  if (expiresAt && isNaN(newDue.getTime())) {
    return Response.json({ message: "Invalid due date." }, { status: 400 });
  }
  if (newDue.getTime() < newStart.getTime()) {
    return Response.json(
      { message: "The due date must be later than the start date." },
      { status: 400 }
    );
  }

  try {
    await prisma.todo.update({
      where: { id: todoId },
      data: {
        ...(task && { task }),
        ...(desc !== undefined && { description: desc }),
        ...(priority && { difficulty: priority }),
        ...(startsAt && { startsAt: newStart }),
        ...(expiresAt && { expiresAt: newDue }),
      },
    });

    return Response.json({ message: "Updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to update todo:", error);
    return Response.json({ message: "Unexpected error" }, { status: 500 });
  }
}