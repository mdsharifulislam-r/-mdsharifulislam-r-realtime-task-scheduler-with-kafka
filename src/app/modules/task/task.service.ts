import { produceData } from "../../../kafkaTools/kafka.producer";
import { ITask } from "./task.interface";
import { Task } from "./task.model";

const createTaskToDb = async (task:string)=>{
    const randId = Math.floor(Math.random() * 100000000).toString()
    console.log(randId);
    
    await produceData<ITask>("task",{
        id:randId,
        title:task,
        status:"pending",
        for:"add"
    })
}


const getAllTaskFromDb = async ()=>{
    const data = await Task.find().lean()
    return data
}

const updateTaskInDb = async (id:string, status:"pending"|"in-progress"|"complete")=>{

    await produceData<Partial<ITask>>("task",{
        id,
        status,
        for:"edit"
    })
}

const deleteTaskFromDb = async (id:string)=>{
    await produceData<Partial<ITask>>("task",{
        id,
        for:"delete"
    })
}

export const TaskService = {
    createTaskToDb,
    getAllTaskFromDb,
    updateTaskInDb,
    deleteTaskFromDb
}