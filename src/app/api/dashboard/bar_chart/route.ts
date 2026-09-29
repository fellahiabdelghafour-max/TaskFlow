import { prisma } from "../../db";

export async function GET(Request: Request) {
  const id = Request.headers.get("x-user-id"); 

  if (!id) {
    return Response.json({ message: "Unauthorized" }, { status: 403 });
  }

 const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0); 

const sevenDaysAgo = new Date(startOfToday);
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    const todo = await prisma.todo.findMany({
      where: {
        userId: id,
        updatedAt:{gte: sevenDaysAgo ,lt:startOfToday},
      },
      select: {
        updatedAt: true,
        status: true,
      },
    });

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const OrderedDays = dayNames
      .slice(sevenDaysAgo.getDay())
      .concat(dayNames.slice(0, sevenDaysAgo.getDay()));

    const Statistics: { day: string; completed: number; total: number }[] = [];
    OrderedDays.forEach((day) => {
      Statistics[OrderedDays.indexOf(day)] = { day, completed: 0, total: 0 };
    });
    todo.forEach((T) => {
      const dayName = dayNames[T.updatedAt.getDay()]; 
      const Index = OrderedDays.indexOf(dayName);
      Statistics[Index].total += 1;
      if (T.status === "Completed") {
        Statistics[Index].completed += 1;
      }
    });

    return Response.json({ data: Statistics }, { status: 200 });
  } catch {
    return Response.json({ message: "Unexpected error" }, { status: 500 });
  }
}
