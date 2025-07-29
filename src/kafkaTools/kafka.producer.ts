import kafka from "../config/kafka";

export async function produceData<T>(topic:"task",message:T) {
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [
            { value: JSON.stringify(message) },
        ],
    });
    await producer.disconnect();
    
}

export async function consumeData<T>(topic:"add"|"update"|"delete") {
    const consumer = kafka.consumer({ groupId: "my-group" });
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = message.value?.toString();
            if (value) {
                const parsedValue = JSON.parse(value) as T;
                console.log("Received message:", parsedValue);
                
            }
        },
    });
}