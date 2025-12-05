import React, { useState } from 'react';
export default function Register(){
  const [email,setEmail]=useState(''); const [name,setName]=useState('');
  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <label htmlFor="r-name">Name</label>
      <input id="r-name" value={name} onChange={e=>setName(e.target.value)} className="block w-full border rounded px-3 py-2 mb-3" />
      <label htmlFor="r-email">Email</label>
      <input id="r-email" value={email} onChange={e=>setEmail(e.target.value)} className="block w-full border rounded px-3 py-2 mb-3" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Register (demo)</button>
    </div>
  );
}
