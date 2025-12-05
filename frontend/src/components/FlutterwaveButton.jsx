import React from 'react';

export default function FlutterwaveButton({ order, onSuccess, onError }) {
  async function handlePay(){
    try {
      // Demo simulation
      if (!order || order._id === 'demo') {
        onSuccess && onSuccess({ status: 'paid', gateway: 'flutterwave' });
        return;
      }
      const res = await fetch(`${(import.meta.env.VITE_API_URL || 'http://localhost:5000')}/api/payments/flutterwave/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order._id, amount: order.amount, currency: order.currency, email: order.customer?.email })
      });
      const payload = await res.json();
      onSuccess && onSuccess(payload);
    } catch (err) {
      onError && onError(err);
    }
  }

  return (
    <button onClick={handlePay} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      Pay with Flutterwave
    </button>
  );
}
