import { prisma } from "../../db";


export async function GET(Request:Request){
      
    const id = Request.headers.get('x-user-id');
    if(!id){
        return Response.json({message:'unauthorized'},{status:403})
    }
 try{
    const RecentActivities = await prisma.todo.findMany({
        where:{
            OR:[
                {userId:id ,group:null},
                {group:{members:{
                    some:{
                        userId:id,status:'ACCEPTED'
                    }
                }}}
            ],
        },
        orderBy:{updatedAt:'desc'},
        take:5,
        select:{
            status:true,
            task:true,
            description:true,
            updatedAt:true,
            userId:true,
            startsAt:true,
            expiresAt:true,
            author:{
                select:{
                    username:true,image:true,
                }
            },
            group:{
                select:{
                    name:true
                }
            }
        }
    })    

    return Response.json({data:RecentActivities},{status:200});
 }
 catch{
    return Response.json({message:'Unexpected error'},{status:500});
 }

}