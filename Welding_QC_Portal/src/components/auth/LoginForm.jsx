import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function LoginForm() {
  const { setUser } = useApp();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(1);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUser({ username, role: Number(role) });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-100">
        <h2 className="text-2xl font-bold text-center text-blue-950 mb-6 font-mono tracking-tight">QA PORTAL</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Username</label>
            <input 
              type="text" required value={username} onChange={e => setUsername(e.target.value)}
              className="w-full border-b-2 border-slate-200 focus:border-blue-600 outline-none py-2 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Access Level Role</label>
            <select 
              value={role} onChange={e => setRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value={1}>Supervisor (Lvl 1)</option>
              <option value={2}>Verifier (Lvl 2)</option>
              <option value={3}>Head Verifier (Lvl 3)</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4">
            Authenticate Access
          </button>
        </form>
      </div>
    </div>
  );
}