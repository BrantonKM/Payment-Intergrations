import React from 'react';
import StatusBadge from './StatusBadge';

export default function OrderModal({ orderDetails, onClose, onDownloadInvoice }){
  if (!orderDetails) return null;
  const { order, transactions } = orderDetails;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Order {order.ref}</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <p><strong>Customer:</strong> {order.customer?.name} — {order.customer?.email}</p>
        <p><strong>Amount:</strong> {order.amount} {order.currency}</p>

        <h4 className="mt-4 font-semibold">Items</h4>
        <ul className="list-disc pl-5">
          {order.items?.map((it,i) => <li key={i}>{it.qty} × {it.name} — {it.price}</li>)}
        </ul>

        <h4 className="mt-4 font-semibold">Transactions</h4>
        <ul>
          {transactions?.map(tx => (
            <li key={tx._id} className="flex items-center gap-2 py-1 border-b">
              <div className="flex-1 truncate">[{tx.gateway}] {tx.gatewayId} — {tx.amount} {tx.currency}</div>
              <StatusBadge status={tx.status} />
              <div className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => onDownloadInvoice(order._id)}>Download Invoice</button>
        </div>
      </div>
    </div>
  );
}
