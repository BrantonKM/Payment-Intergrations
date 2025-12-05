import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminSidebar(){
  return (
    <aside className="w-64 bg-white border rounded p-4 hidden lg:block">
      <nav className="flex flex-col gap-2">
        <Link to="/admin/dashboard" className="py-2 px-3 rounded hover:bg-gray-50">Dashboard</Link>
        <Link to="/admin/orders" className="py-2 px-3 rounded hover:bg-gray-50">Orders</Link>
        <Link to="/admin/users" className="py-2 px-3 rounded hover:bg-gray-50">Users</Link>
      </nav>
    </aside>
  );
}
