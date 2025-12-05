import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { token, logout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-blue-600">Boutique Payments</Link>

        <nav className="flex gap-3 ml-6">
          <Link to="/checkout" className="text-gray-600 hover:text-blue-600">Checkout</Link>
          <Link to="/cart" className="text-gray-600 hover:text-blue-600">Cart</Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden sm:block">API: <code className="bg-gray-100 px-2 py-1 rounded">{import.meta.env.VITE_API_URL || 'http://localhost:5000'}</code></span>
          {!token ? (
            <Link to="/admin/login" className="text-sm px-3 py-1 border rounded">Admin</Link>
          ) : (
            <>
              <button onClick={() => { logout(); nav('/'); }} className="text-sm px-3 py-1 border rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
