require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");
const redisClient = require("./config/redis");
const { connectRabbitMQ } = require("./config/rabbitmq");

const PORT = process.env.PORT || 5003;

const startServer = async () => {
    try {
        // 1. PostgreSQL Verification Connection Check
        const db = await pool.query("SELECT NOW()");
        console.log("PostgreSQL Connected:", db.rows[0]);

        // 2. Redis Cache Core Layer Initialization
        await redisClient.connect();
        const pong = await redisClient.ping();
        console.log("Redis Connected:", pong);

        // 3. RabbitMQ Message Bus Handshake Initializer
        await connectRabbitMQ();
        console.log("RabbitMQ Connected");

        // 4. Fire Up standard HTTP listeners once dependencies are healthy
        app.listen(PORT, () => {
            console.log(`🚀 Booking Service running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Critical failure during backend infrastructure boot up:", error);
    }
};

startServer();
