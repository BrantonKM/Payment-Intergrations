import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div className="max-w-4xl mx-auto text-center py-20">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Boutique Payments</h1>
      <p className="text-gray-700 mb-6">Demo checkout + admin dashboard for PayPal and Flutterwave integration.</p>
      <div className="flex justify-center gap-4">
        <Link to="/checkout" className="bg-blue-600 text-white px-4 py-2 rounded">Go to Checkout</Link>
        <Link to="/admin/login" className="px-4 py-2 border rounded">Admin Login</Link>
      </div>
    </div>
  );
}
