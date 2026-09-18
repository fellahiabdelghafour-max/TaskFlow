import bcrypt from "bcrypt";
import { prisma } from "../../db";
import jwt from "jsonwebtoken";
import { Prisma } from "../../../../../generated/prisma/client";
import { cookies } from "next/headers";

const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export async function POST(req: Request) {
  const { username, password, email } = await req.json();
  const CookieStore = await cookies();

  if (!username || !password || !email) {
    return Response.json(
      { message: "Incomplete information" },
      { status: 400 },
    );
  }

  if(!usernameRegex.test(username)){
          return Response.json(
      { message: "Username must contain at least 3 characters" },
      { status: 400 },
    );
  }

    if(!emailRegex.test(email)){
          return Response.json(
      { message: "Invalid email" },
      { status: 400 },
    );
  }

      if(!passwordRegex.test(password)){
          return Response.json(
      { message: "Password must be exactly 8 characters and contain lowercase, uppercase, a digit, and a symbol" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1w",
    });

    CookieStore.set('token',token,{
      httpOnly:true,
      secure: process.env.NODE_ENV === 'production',
      maxAge:60*60*24*7,
      sameSite:'lax',
      path:'/',
    });

    return Response.json({ user:user }, { status: 201 });

  } catch (error) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return Response.json(
      { message: "Username or email already exists" },
      { status: 409 }
    );
  }

  return Response.json(
    { message: "Internal server error" },
    { status: 500 }
  );
  }
}
