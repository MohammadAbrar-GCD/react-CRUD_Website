import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = data.redirectTo;
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:<br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label><br /><br />
        <label>Password:<br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label><br /><br />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
}