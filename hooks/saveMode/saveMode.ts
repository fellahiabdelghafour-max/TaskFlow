    'use server'

import { cookies } from "next/headers";

    
   export default async function saveMode(mode:'light'|'dark') {
      const cookieStore = await cookies();
      cookieStore.set("mode", mode, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    }