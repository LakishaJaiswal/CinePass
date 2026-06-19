const Redis = require("ioredis");

const redisHost = process.env.REDIS_HOST || "redis";
const redisPort = process.env.REDIS_PORT || 6379;

console.log(`Initializing Redis cluster layer connection client pointing to: ${redisHost}:${redisPort}`);

const redis = new Redis({
    host: redisHost,
    port: parseInt(redisPort, 10),
    maxRetriesPerRequest: 3,
    lazyConnect: true, // ⚡ STOP AUTO-CONNECT: Let server.js call connect() explicitly
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis.on("connect", () => {
    console.log("⚡ Redis Cache Node connected successfully.");
});

redis.on("error", (err) => {
    console.error("❌ Redis Cache Runtime Interception Error:", err.message);
});

module.exports = redis;
