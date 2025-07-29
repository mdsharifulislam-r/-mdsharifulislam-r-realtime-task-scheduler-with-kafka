import mongoose from "mongoose";
import { ITask, TaskModel } from "./task.interface";

const taskSchema = new mongoose.Schema<ITask,TaskModel>({
    title: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["pending","in-progress","complete"],
        default: "pending"
    },
    id:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

export const Task = mongoose.model<ITask,TaskModel>("Task",taskSchema);