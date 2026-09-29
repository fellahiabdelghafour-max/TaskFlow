import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "../../db";

export async function GET() {
  const cookieStrore = await cookies();
  const token = cookieStrore.get("token")?.value;

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        username: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
      },
    });
    return Response.json(
      { user: user, authenticated: true, userId: decoded.id },
      { status: 200 },
    );
  } catch {
    return Response.json(
      { message: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
