import React from 'react';
export default function StatusBadge({ status }) {
  const map = {
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-yellow-100 text-yellow-800',
    created: 'bg-gray-100 text-gray-800'
  };
  const cls = map[status] || 'bg-gray-100 text-gray-800';
  return <span className={`px-2 py-1 rounded-full text-sm font-semibold ${cls}`}>{(status||'unknown').toUpperCase()}</span>;
}
