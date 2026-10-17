import { z } from "zod";
import { prisma } from "../../db";

const PAGE_SIZE = 10;

const querySchema = z.object({
  all: z.enum(["MyTodos", "ResentActivities"]),
  filter: z
    .enum(["all", "overDue", "completed", "pending", "inProgress"])
    .default("all"),
  sort: z.enum(["asc", "desc"]).default("desc"),
  skip: z.coerce.number().int().min(0).default(0),
});

function filterWhere(filter: z.infer<typeof querySchema>["filter"], now: Date) {
  switch (filter) {
    case "completed":
      return { status: "Completed" as const };
    case "overDue":
      return { status: { not: "Completed" as const }, expiresAt: { lt: now } };
    case "pending":
      return { status: "Pending" as const, expiresAt: { gte: now } };
    case "inProgress":
      return { status: "In_Progress" as const, expiresAt: { gte: now } };
    default:
      return {};
  }
}

export async function GET(request: Request) {
  const userId = request.headers.get("x-user-id");
  if (!userId) {
    return Response.json({ message: "unAuthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return Response.json({ message: "Invalid query params" }, { status: 400 });
  }

  const { all, filter, sort, skip } = parsed.data;

  const ownerWhere =
    all === "ResentActivities"
      ? {OR:[
        {          group: {
            OR: [
              { adminId: userId },
              { members: { some: { userId, status: "ACCEPTED" as const } } },
            ],
          }},
          {
            userId
          }
      ]

        }
      : { userId };

  const where = { ...ownerWhere, ...filterWhere(filter, new Date()) };

  try {
    const [data, total] = await Promise.all([
      prisma.todo.findMany({
        where,
        take: PAGE_SIZE,
        skip,
            select:{
        id:true,
        expiresAt:true,
        task:true,
        description:true,
        difficulty:true,
        status:true,
        updatedAt:true,
        author:{
            select:{
                username:true,
                id:true,
                image:true,
                
            },
        },
        group:{
            select:{
                name:true,
            },
        
        }
        
    },
        orderBy: [
          all === "MyTodos" ? { expiresAt: sort } : { updatedAt: sort },
          { id: "asc" },
        ],
      }),
      prisma.todo.count({ where }),
    ]);

    return Response.json({
      data,
      total,
      hasMore: skip + data.length < total,
    });
  } catch (error) {
    console.error("Failed to load todos:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}