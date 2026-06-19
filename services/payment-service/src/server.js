const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
app.use(cors()); // CRITICAL: Allows frontend to call the API
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Explicit route definition
app.post('/api/payments/order', async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: parseInt(amount) * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    res.status(200).json({
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ error: "Order generation failed" });
  }
});

app.listen(5005, () => console.log('Payment service listening on port 5005'));
