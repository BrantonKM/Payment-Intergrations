import React, { useState } from 'react';
import PaypalButton from '../components/PaypalButton';
import FlutterwaveButton from '../components/FlutterwaveButton';
import { api } from '../utils/api';

export default function CheckoutPage(){
  const [customer, setCustomer] = useState({ name: '', email: '' });
  const [items, setItems] = useState([{ name: 'Boutique Shirt', qty: 1, price: 1500 }]);
  const [creating, setCreating] = useState(false);
  const total = items.reduce((s,it) => s + (it.qty * it.price), 0);

  async function createOrder(){
    setCreating(true);
    try {
      const payload = { customer, items, amount: total, currency: 'KES' };
      // attempt to call backend; if backend absent, api() will throw — we gracefully fallback
      let res;
      try {
        res = await api('/api/orders', { method: 'POST', body: payload });
      } catch(e) {
        // fallback demo order
        res = { order: { _id: 'demo', ref: `DEMO-${Date.now()}`, ...payload } };
      }
      alert('Order created: ' + (res?.order?.ref || res.order?._id));
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <label htmlFor="cust-name" className="block text-sm font-medium">Customer name</label>
      <input id="cust-name" value={customer.name} onChange={e => setCustomer(c => ({...c, name: e.target.value}))}
        className="mt-1 mb-3 block w-full border rounded px-3 py-2" placeholder="Jane Doe" />

      <label htmlFor="cust-email" className="block text-sm font-medium">Customer email</label>
      <input id="cust-email" value={customer.email} onChange={e => setCustomer(c => ({...c, email: e.target.value}))}
        className="mt-1 mb-3 block w-full border rounded px-3 py-2" placeholder="jane@example.com" />

      <h3 className="font-semibold mt-4 mb-2">Items</h3>
      {items.map((it,idx) => (
        <div key={idx} className="flex gap-2 items-center mb-2">
          <input value={it.name} onChange={e => { const c=[...items]; c[idx].name = e.target.value; setItems(c);} }
            className="border px-2 py-1 rounded flex-1" />
          <input type="number" value={it.qty} onChange={e => { const c=[...items]; c[idx].qty = Number(e.target.value); setItems(c);} }
            className="border px-2 py-1 w-20 rounded" />
          <input type="number" value={it.price} onChange={e => { const c=[...items]; c[idx].price = Number(e.target.value); setItems(c);} }
            className="border px-2 py-1 w-32 rounded" />
        </div>
      ))}

      <div className="mt-4 font-semibold">Total: <span className="text-blue-600">{total.toLocaleString()} KES</span></div>

      <div className="mt-4 flex gap-3">
        <button onClick={createOrder} disabled={creating} className="bg-blue-600 text-white px-4 py-2 rounded">{creating ? 'Creating...' : 'Create Order'}</button>
        <PaypalButton order={{ _id: 'demo', amount: total, currency: 'KES', items, customer }} onSuccess={() => alert('PayPal success')} onError={(e)=>alert('PayPal failed')} />
        <FlutterwaveButton order={{ _id: 'demo', amount: total, currency: 'KES', items, customer }} onSuccess={() => alert('Flutterwave success')} onError={(e)=>alert('Flutterwave failed')} />
      </div>

      <p className="text-sm text-gray-500 mt-4">Use Admin Dashboard to view transactions and download invoices.</p>
    </div>
  );
}
