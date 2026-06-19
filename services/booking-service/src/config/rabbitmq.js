const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {

    const connection =
        await amqp.connect(
            process.env.RABBITMQ_URL
        );

    channel =
        await connection.createChannel();

    await channel.assertQueue(
        "booking.created",
       { durable: true }
    );

    return channel;
};

const getChannel = () => channel;

module.exports = {
    connectRabbitMQ,
    getChannel
};
