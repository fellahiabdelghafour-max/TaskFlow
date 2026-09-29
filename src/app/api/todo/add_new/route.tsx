import { prisma } from "../../db";

export async function POST(Request: Request) {
  const id = Request.headers.get("x-user-id");
      console.log(id)
  if (!id) {
    return Response.json({ message: "unAuthorized" }, { status: 403 });
  }

  const { task, desc, startD, dueD, priority } = await Request.json();

  const start = new Date(startD);
  const due = new Date(dueD);

  if (due.getTime() < start.getTime()) {
    return Response.json(
      { message: "The due date must be later than the start date." },
      { status: 400 },
    );
  }

  if (!task || typeof task !== "string" || task.trim() === "") {
    return Response.json(
      { message: "Task title is required." },
      { status: 400 },
    );
  }

  try {
    await prisma.todo.create({
      data: {
        task: task,
        description: desc,
        startsAt: startD,
        expiresAt: dueD,
        difficulty: priority,
        userId: id,
      },
    });

    return Response.json({ message: "Success" }, { status: 200 });
  } catch {
    return Response.json({ message: "Unexpected error" }, { status: 500 });
  }
}
