const amqp = require("amqplib");

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();

  console.log("RabbitMQ Connected");

  return { connection, channel };
}

module.exports = connectRabbitMQ;
