import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function App() {
  const [health, setHealth] = useState(null);
  const [name, setName] = useState('sbk');
  const [hello, setHello] = useState(null);
  const [error, setError] = useState(null);

  async function callHealth() {
    setError(null); setHealth(null);
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
      const json = await res.json();
      setHealth(json);
    } catch (e) { setError(String(e)); }
  }

  async function callHello() {
    setError(null); setHello(null);
    try {
      const res = await fetch(`${API_BASE}/hello_world?name=${encodeURIComponent(name)}`, { method: 'POST' });
      const json = await res.json();
      setHello(json);
    } catch (e) { setError(String(e)); }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 680, margin: '2rem auto' }}>
      <h1>Hello UI</h1>
      <p><b>API_BASE:</b> {API_BASE}</p>

      <section>
        <h2>Health</h2>
        <button onClick={callHealth}>GET /health</button>
        <pre>{health ? JSON.stringify(health, null, 2) : 'No response yet'}</pre>
      </section>

      <section>
        <h2>Hello</h2>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={callHello}>POST /hello_world?name={name}</button>
        <pre>{hello ? JSON.stringify(hello, null, 2) : 'No response yet'}</pre>
      </section>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
