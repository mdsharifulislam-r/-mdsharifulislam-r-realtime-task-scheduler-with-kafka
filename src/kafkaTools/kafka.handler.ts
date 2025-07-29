import { Socket } from "socket.io"
import { Task } from "../app/modules/task/task.model"
import kafka from "../config/kafka"

export const handleCreatedTask = async ()=>{
    const consumer = kafka.consumer({
        groupId: 'test-group',
        // autoCommit: false
    })
    await consumer.connect()
    await consumer.subscribe({ topic: 'task', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            
            const data = JSON.parse(message?.value?.toString()!)
           if(data.for=="add"){
            const task = await Task.create(data)
           }
           else if (data.for=="edit"){
            const task = await Task.findOneAndUpdate({id:data.id},data)
           }
           else if (data.for=="delete"){
            const task = await Task.findOneAndDelete({id:data.id})
           }
           else{
            console.log("no for")
           }

           const io = (global as any).io as Socket

           io.emit("loadTasks",await Task.find({}).sort({createdAt: -1}).lean())
           
        },
    })

    // await consumer.disconnect()

}


export async function handleUpdateTask(){
    const consumer = kafka.consumer({
        groupId: 'test-group',
        // autoCommit: false
    })





    await consumer.connect()
    await consumer.subscribe({ topic: 'update', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message?.value?.toString()!)
            console.log(data);
            
            await Task.findOneAndUpdate({id: data.id}, data)
        },
    })
}


export async function handleDeleteTask(){
    const consumer = kafka.consumer({
        groupId: 'test-group',
        // autoCommit: false
    })
    await consumer.connect()
    await consumer.subscribe({ topic: 'delete', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message?.value?.toString()!)
            await Task.findOneAndDelete({id: data.id})
        },
    })
}