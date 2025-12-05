import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  async function handleLogin(){
    // Demo login — in real app call /api/auth/login
    if (!email) return alert('enter email');
    const demoToken = import.meta.env.VITE_ADMIN_TOKEN || 'demo-admin-token';
    login({ token: demoToken, user: { email, role: 'admin' } });
    nav('/admin/dashboard');
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <label htmlFor="a-email" className="block text-sm font-medium">Email</label>
      <input id="a-email" value={email} onChange={e=>setEmail(e.target.value)} className="block w-full border rounded px-3 py-2 mb-3" />
      <label htmlFor="a-pass" className="block text-sm font-medium">Password</label>
      <input id="a-pass" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="block w-full border rounded px-3 py-2 mb-4" />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  );
}
