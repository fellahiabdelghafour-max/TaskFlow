import { cookies } from "next/headers";

export async function POST(){
       
    const cookieStore = cookies();
    (await cookieStore).delete('token');

    return Response.json({message:'Sign Out Successfully'},{status:200});
};