import React from 'react';
import { api } from '../utils/api'; // NOTE: this is a named export in utils; see below

export default function PaypalButton({ order, onSuccess, onError }) {
  async function handlePay(){
    try {
      // mock behaviour when backend not available
      if (!order || order._id === 'demo') {
        onSuccess && onSuccess({ status: 'paid', gateway: 'paypal' });
        return;
      }
      // call backend endpoints if available
      const res = await fetch(`${(import.meta.env.VITE_API_URL || 'http://localhost:5000')}/api/payments/paypal/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order._id, amount: order.amount, currency: order.currency })
      });
      const payload = await res.json();
      // for demo we simulate capture
      onSuccess && onSuccess(payload);
    } catch (err) {
      onError && onError(err);
    }
  }

  return (
    <button onClick={handlePay} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
      Pay with PayPal
    </button>
  );
}
