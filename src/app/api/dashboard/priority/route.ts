import { prisma } from "../../db";

export async function GET (Request:Request){

    const id = Request.headers.get('x-user-id');

    if(!id){
        return Response.json({message:'unAuthorized'},{status:403})
    };

    const userTodos = await prisma.todo.findMany({where:{
        userId:id
    }});

    const TasksByPriority = [
  { name: "High", value: 0, color: "#f56565" },
  { name: "Medium", value: 0, color: "#f6ad55" },
  { name: "Low", value: 0, color: "#48bb78" },
]; 

userTodos.forEach((todo) => {
    if (todo.difficulty === 'High') {
        TasksByPriority[0].value += 1;
    } else if (todo.difficulty === 'Normal') {
        TasksByPriority[1].value += 1;
    } else {
        TasksByPriority[2].value += 1;
    }
});

return Response.json(TasksByPriority);


}