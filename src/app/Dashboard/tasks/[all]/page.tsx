import AllTodos from "../../../../../components/MyTodos/AllTasks/allTasks";

interface paramsType{
     params:Promise<{all:"MyTodos"|"RecentActivities"}>
}

export default async function All({params}:paramsType){

    const {all} = await params;

    return <AllTodos all={all}/>

}