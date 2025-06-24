import { useState, useEffect } from 'react';

const PASSWORD = 'test';

export default function AuthGate({ children }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('owner_authed') === 'true') {
      setAuthed(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setAuthed(true);
      localStorage.setItem('owner_authed', 'true');
    } else {
      setError('Incorrect password');
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-primary mb-2">Owner Login</h2>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(''); }}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter password"
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="bg-primary text-white py-2 rounded font-semibold hover:bg-secondary transition-colors">Login</button>
        </form>
      </div>
    );
  }

  return children;
} 