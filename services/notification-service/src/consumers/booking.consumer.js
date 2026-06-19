const { connectRabbitMQ, getChannel } = require("../config/rabbitmq");

const consumeBookingEvents = async () => {
  try {
    // 1. Initialize RabbitMQ infrastructure connection safely
    await connectRabbitMQ();
    
    // 2. Extract the active channel
    const channel = getChannel();
    const queueName = "booking_notifications";

    // ⚡ THE CRUCIAL FIX: Explicitly assert the queue layout structural framework 
    // to guarantee it exists on the broker before attempting to consume from it.
    await channel.assertQueue(queueName, { durable: true });
    console.log(`✉️ Notification worker successfully bound to queue: ${queueName}`);

    // 3. Kick off the message processing frame loop
    channel.consume(queueName, (message) => {
      if (message !== null) {
        try {
          const bookingData = JSON.parse(message.content.toString());
          console.log("🔔 Processing async booking event notifications for:", bookingData.title);
          
          // Target application business logic runs here
          
          channel.ack(message);
        } catch (parseError) {
          console.error("❌ Notification string parsing exception tracking payload:", parseError.message);
          channel.nack(message, false, false); // Drop malformed messages cleanly
        }
      }
    }, { noAck: false });

  } catch (error) {
    console.error("❌ Fatal execution exception in Notification Consumer loop:", error.message);
  }
};

module.exports = { consumeBookingEvents };
