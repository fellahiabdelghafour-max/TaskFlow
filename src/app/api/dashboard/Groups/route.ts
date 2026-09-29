import { prisma } from "../../db";

export async function GET(Request:Request){
 
    const id = Request.headers.get('x-user-id');

    if(!id) return Response.json({message:'unAuthorized'},{status:403});

    const Groups = await prisma.group.findMany({where:{
        OR:[
            {adminId:id},
            {members:{some:{userId:id,status:'ACCEPTED'}}},
        ],
    },
     select:{
        name:true,
        id:true,
        adminId:true,
        admin:{
            select:{
                username:true,
                image:true,
            }
        },
         _count:{
            select:{
                members:{
                    where:{status:'ACCEPTED'}
                },
                todos:true,
            }
         },
     },
   });

   return Response.json({ Groups }, { status: 200 });

}