import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import StatusBadge from '../components/StatusBadge';
import OrderModal from '../components/OrderModal';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminDashboard(){
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState({ page:1, limit:25, pages:1, total:0 });
  const [filters, setFilters] = useState({ gateway:'', status:'', q:'' });
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  async function fetchTransactions(page=1){
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: meta.limit, ...filters });
      const res = await fetch(`${API}/api/admin/transactions?${params.toString()}`, { headers: { 'x-admin-token': (import.meta.env.VITE_ADMIN_TOKEN || '') } });
      if (!res.ok) {
        // demo fallback
        setTransactions([{ _id:'t1', order:'demo', gateway:'paypal', gatewayId:'PAY-123', status:'paid', amount:1500, currency:'KES', createdAt: new Date().toISOString() }]);
        setMeta({ page:1, limit:25, pages:1, total:1 });
        setLoading(false);
        return;
      }
      const data = await res.json();
      setTransactions(data.items || []);
      setMeta(data.meta || meta);
    } catch (e) {
      console.error(e);
      setTransactions([{ _id:'t1', order:'demo', gateway:'paypal', gatewayId:'PAY-123', status:'paid', amount:1500, currency:'KES', createdAt: new Date().toISOString() }]);
      setMeta({ page:1, limit:25, pages:1, total:1 });
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ fetchTransactions(1); }, []);

  async function openOrder(orderId){
    if (!orderId) return;
    setOrderDetails(null);
    try {
      const res = await fetch(`${API}/api/admin/orders/${orderId}`, { headers: { 'x-admin-token': (import.meta.env.VITE_ADMIN_TOKEN || '') } });
      if (!res.ok) {
        // demo fallback
        setOrderDetails({ order: { _id: orderId, ref: orderId, amount:1500, currency:'KES', customer:{ name:'Demo', email:'demo@example.com' }, items:[{ name:'Shirt', qty:1, price:1500 }] }, transactions: [] });
        return;
      }
      const data = await res.json();
      setOrderDetails(data);
    } catch (e) {
      console.error(e);
      setOrderDetails({ order: { _id: orderId, ref: orderId, amount:1500, currency:'KES', customer:{ name:'Demo' } }, transactions: [] });
    }
  }

  function exportCsv() {
    if (!transactions.length) return alert('No transactions');
    const headers = ['TransactionId','OrderId','Gateway','GatewayId','Status','Amount','Currency','CreatedAt'];
    const rows = transactions.map(t=>[t._id,t.order||'',t.gateway||'',t.gatewayId||'',t.status||'',t.amount||'',t.currency||'',t.createdAt||'']);
    const csv = [headers.join(','), ...rows.map(r=>r.map(c=>`"${String(c||'').replace(/"/g,'""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type:'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `transactions_page_${meta.page}.csv`; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-6">
      <AdminSidebar />
      <div className="flex-1 bg-white rounded shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Admin Dashboard</h2>
          <div className="text-sm text-gray-600">Total: {meta.total}</div>
        </div>

        <div className="mb-4 flex gap-2 flex-wrap">
          <select value={filters.gateway} onChange={e=>setFilters(f=>({...f,gateway:e.target.value}))} className="border p-2 rounded">
            <option value=''>All Gateways</option>
            <option value='paypal'>PayPal</option>
            <option value='flutterwave'>Flutterwave</option>
          </select>

          <select value={filters.status} onChange={e=>setFilters(f=>({...f,status:e.target.value}))} className="border p-2 rounded">
            <option value=''>All Statuses</option>
            <option value='paid'>Paid</option>
            <option value='failed'>Failed</option>
            <option value='refunded'>Refunded</option>
          </select>

          <input value={filters.q} onChange={e=>setFilters(f=>({...f,q:e.target.value}))} placeholder="Search ref, email or tx" className="border p-2 rounded flex-1 min-w-[200px]" />

          <button onClick={()=>fetchTransactions(1)} className="bg-blue-600 text-white px-3 py-2 rounded">Apply</button>
          <button onClick={()=>{ setFilters({gateway:'',status:'',q:''}); fetchTransactions(1); }} className="px-3 py-2 border rounded">Clear</button>
          <button onClick={exportCsv} className="ml-auto px-3 py-2 border rounded">Export CSV</button>
        </div>

        {loading ? <div>Loading…</div> : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Order</th>
                  <th className="p-2">Gateway</th>
                  <th className="p-2">GatewayId</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">When</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t,i)=>(
                  <tr key={t._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{i+1}</td>
                    <td className="p-2">{t.order||'-'}</td>
                    <td className="p-2">{t.gateway}</td>
                    <td className="p-2 truncate max-w-xs">{t.gatewayId}</td>
                    <td className="p-2"><StatusBadge status={t.status} /></td>
                    <td className="p-2">{t.amount} {t.currency}</td>
                    <td className="p-2">{new Date(t.createdAt).toLocaleString()}</td>
                    <td className="p-2"><button className="px-2 py-1 border rounded" onClick={()=>openOrder(t.order)}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <OrderModal orderDetails={orderDetails} onClose={()=>setOrderDetails(null)} onDownloadInvoice={(id)=>alert('Download invoice: '+id)} />
      </div>
    </div>
  );
}
