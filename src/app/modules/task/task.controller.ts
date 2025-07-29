import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TaskService } from "./task.service";
import sendResponse from "../../../shared/sendResponse";

const createTask = catchAsync(async (req:Request,res:Response)=>{
    const {task}=req.body;
    const result = await TaskService.createTaskToDb(task)
    sendResponse(res,{
        statusCode:200,
        message:"Task created successfully",
        data:result,
        success:true
    })
})

const getAllTask = catchAsync(async (req:Request,res:Response)=>{
    const result = await TaskService.getAllTaskFromDb()
    sendResponse(res,{
        statusCode:200,
        message:"All task fetched successfully",
        data:result,
        success:true
    })
})

const updateTask = catchAsync(async (req:Request,res:Response)=>{
    const id = req.params.id;
    const {status} = req.body;
    await TaskService.updateTaskInDb(id,status)
    sendResponse(res,{
        statusCode:200,
        message:"Task updated successfully",
        success:true
    })
})

const deleteTask = catchAsync(async (req:Request,res:Response)=>{
    const {id} = req.params;
    await TaskService.deleteTaskFromDb(id)
    sendResponse(res,{
        statusCode:200,
        message:"Task deleted successfully",
        success:true
    })
})

export const TaskController = {
    createTask,
    getAllTask,
    updateTask,
    deleteTask
}