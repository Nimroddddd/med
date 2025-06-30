import { useState, useEffect } from 'react';
import { login } from '../../api/auth';

// Example users (in a real app, this would come from a backend)
const DEFAULT_USERS = [
  { email: 'owner@admin.com', password: 'admin123', role: 'superadmin', name: 'Owner' },
  { email: 'provider1@clinic.com', password: 'provider1', role: 'provider', name: 'Provider 1' },
  { email: 'provider2@clinic.com', password: 'provider2', role: 'provider', name: 'Provider 2' },
];

function getUsers() {
  const users = localStorage.getItem('portal_users');
  if (users) return JSON.parse(users);
  localStorage.setItem('portal_users', JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS;
}

export default function AuthGate({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authed, setAuthed] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authedUser = localStorage.getItem('portal_authed_user');
    if (authedUser) {
      const user = JSON.parse(authedUser);
      setAuthed(true);
      setRole(user.role);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await login(email, password);
      const user = res.user;
      setAuthed(true);
      setRole(user.role);
      localStorage.setItem('portal_authed_user', JSON.stringify(user));
    } catch (err) {
      setError(err?.response?.data?.message || 'Incorrect email or password');
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-primary mb-2">Portal Login</h2>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter password"
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" className="bg-primary text-white py-2 rounded font-semibold hover:bg-secondary transition-colors" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    );
  }

  // Pass role as prop to children (if needed)
  return typeof children === 'function' ? children(role) : children;
} 