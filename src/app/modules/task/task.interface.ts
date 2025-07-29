import { Model } from "mongoose"

export type ITask = {
    id: string,
    title:string,
    status:"pending"|"in-progress"|"complete",
    for:"add"|"edit"|"delete"
}

export type TaskModel = Model<ITask>