import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const authorization = request.cookies.get("token")?.value;

  if (!authorization) {
    return NextResponse.redirect(new URL('/Auth/login',request.url));
  }

  try {
    const { payload } = await jwtVerify(
      authorization,
      new TextEncoder().encode(process.env.JWT_SECRET!),
    );
    
      if (!payload) {
    return NextResponse.redirect(new URL('/Auth/login',request.url));
  }

    const userId = payload.id as string;

    const newHeaders = new Headers(request.headers);
    newHeaders.set("x-user-id", userId);
    console.log('done2')

    return NextResponse.next({ request: { headers: newHeaders } });
  } catch {

    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 403 },
    );
  }

  return;
}

export const config = {
  matcher: ["/api/todo/:path*", "/api/dashboard/:path*","/Dashboard/:path*"],
};
