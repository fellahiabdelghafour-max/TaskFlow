import { prisma } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(Reqeust: Request) {
  const { email, password } = await Reqeust.json();
  const CookieStore = await cookies();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return Response.json({ message: "Email not found" }, { status: 404 });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return Response.json(
      {
        message:
          "The password is incorrect; please try again using the correct password.",
      },
      { status: 404 },
    );
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1w",
  });

  CookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    path: "/",
  });

  const { password: _, ...safeUser } = user;

  return Response.json({ user: safeUser }, { status: 200 });
}
