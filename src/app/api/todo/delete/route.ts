import { prisma } from "../../db";

export async function DELETE(Request : Request){

    const userId = Request.headers.get('x-user-id');
    const {searchParams} = new URL(Request.url);
    const id = searchParams.get('id');

    if(!id){
      return   Response.json({message:'Wrong todo id'}, {status:404});
    };

    if(!userId){
        return   Response.json({message:'Unauthorized'}, {status:401});
    };

    const todo = await prisma.todo.findFirst({where:{id:id,userId:userId}});

    if(!todo){
        return   Response.json({message:"you don't have the access for this request"}, {status:403});
    };

    try{
        await prisma.todo.delete({where:{id:id}});

        return   Response.json({message:"Deleted successfully"}, {status:200});
    }
    catch{
        return   Response.json({message:"Unexpected error"}, {status:500});
    }




}