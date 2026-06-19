const amqp = require("amqplib");

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
    const amqpUrl = process.env.AMQP_URL || "amqp://admin:admin123@rabbitmq:5672";
    
    try {
        if (!connection) {
            console.log("Connecting to RabbitMQ at URL:", amqpUrl.replace(/:([^:@]+)@/, ':****@'));
            connection = await amqp.connect(amqpUrl);
            channel = await connection.createChannel();
        }
        return { connection, channel };
    } catch (error) {
        console.error("AMQP Connection Factory Error:", error.message);
        throw error;
    }
};

// Expose an explicit accessor helper function to satisfy your consumer script layout requirement
const getChannel = () => {
    if (!channel) {
        throw new Error("AMQP Channel requested before connection initialization completed.");
    }
    return channel;
};

module.exports = { connectRabbitMQ, getChannel };
