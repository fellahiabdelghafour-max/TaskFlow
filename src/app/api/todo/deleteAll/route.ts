import { z } from "zod";
import { prisma } from "../../db";

const bodySchema = z.object({
  ids: z
    .array(z.string())
    .min(1, "Select at least one todo")
    .max(100, "Too many todos at once"),
});

export async function DELETE(request: Request): Promise<Response> {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return Response.json({ message: "unAuthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { message: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const ids = [...new Set(parsed.data.ids)];

  try {
    const { count } = await prisma.todo.deleteMany({
      where: { id: { in: ids }, userId },
    });

    if (count === 0) {
      return Response.json({ message: "Todos not found" }, { status: 404 });
    }

    return Response.json({ deleted: count }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete todos:", error);
    return Response.json({ message: "Unexpected error" }, { status: 500 });
  }
}