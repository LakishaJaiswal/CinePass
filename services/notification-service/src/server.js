require("dotenv").config();

const {
    connectRabbitMQ
} = require("./config/rabbitmq");

const {
    consumeBookingEvents
} = require(
    "./consumers/booking.consumer"
);

const startServer = async () => {

    try {

        await connectRabbitMQ();

        console.log(
            "RabbitMQ Connected"
        );

        await consumeBookingEvents();

        console.log(
            "Notification Service Listening..."
        );

    } catch (error) {

        console.error("Critical Failure in Notification Boot:", error);

    }
};

startServer();
