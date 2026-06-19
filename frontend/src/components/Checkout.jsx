import React, { useEffect } from 'react';

function Checkout({ bookingData, onPaymentSuccess, onCancel }) {
  useEffect(() => {
    const initPayment = async () => {
      try {
        // 1. Fetch Order ID from your backend
        const response = await fetch('http://localhost:5005/api/payments/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: bookingData.amount })
        });
        
        if (!response.ok) throw new Error("Backend order generation failed");
        const orderData = await response.json();

        // 2. Configure Razorpay
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'CINEPASS PRO',
          order_id: orderData.orderId,
          handler: function (response) {
            onPaymentSuccess({ 
                transactionId: response.razorpay_payment_id,
                amount: bookingData.amount,
                seats: bookingData.seatNumbers 
            });
          },
          prefill: { name: 'Lakisha Jaiswal', email: 'lakisha@domain.com' },
          theme: { color: '#F43F5E' },
          modal: { ondismiss: onCancel }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Checkout failed:", err);
        alert("Payment initialization failed. Check console.");
        onCancel();
      }
    };

    if (window.Razorpay) {
      initPayment();
    } else {
      console.error("Razorpay SDK not loaded");
    }
  }, [bookingData, onPaymentSuccess, onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#161920] p-8 rounded-2xl text-center text-white border border-gray-800">
        <div className="animate-spin w-8 h-8 border-4 border-t-rose-500 rounded-full mx-auto mb-4" />
        <p className="text-xs font-mono">Initializing Razorpay Gateway...</p>
      </div>
    </div>
  );
}

export default Checkout;
