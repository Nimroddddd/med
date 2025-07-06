import { useState, useEffect } from 'react';
import {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
  setProviderPassword
} from '../../api/providers';
import toast from 'react-hot-toast';

export default function ProviderManagement() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null); // provider or null
  const [form, setForm] = useState({ name: '', email: '', password: '', education: '', credentials: '' });
  const [showForm, setShowForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordProvider, setPasswordProvider] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProviders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProviders();
      setProviders(data);
    } catch (err) {
      setError('Failed to load providers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleEdit = (provider) => {
    setEditing(provider);
    setForm({
      name: provider.name,
      email: provider.email,
      password: '',
      education: Array.isArray(provider.education) ? provider.education.join(', ') : provider.education || '',
      credentials: Array.isArray(provider.credentials) ? provider.credentials.join(', ') : provider.credentials || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this provider?')) return;
    setDeletingId(id);
    setError(null);
    try {
      await deleteProvider(id);
      setProviders(list => list.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete provider.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAdd = () => {
    setEditing(null);
    setForm({ name: '', email: '', password: '', education: '', credentials: '' });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    if (!editing && !form.password) {
      setError('Password is required for new providers.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const submitData = {
        name: form.name,
        email: form.email,
        education: form.education ? form.education.split(',').map(s => s.trim()) : [],
        credentials: form.credentials ? form.credentials.split(',').map(s => s.trim()) : []
      };
      if (editing) {
        await updateProvider(editing.id, submitData);
        setProviders(list => list.map(p => p.id === editing.id ? { ...p, ...submitData } : p));
      } else {
        const data = await createProvider({ ...submitData, password: form.password });
        setProviders(list => [...list, data]);
      }
      setShowForm(false);
      setEditing(null);
    } catch (err) {
      setError('Failed to save provider.');
    } finally {
      setSaving(false);
    }
  };

  // Password management
  const openPasswordModal = (provider) => {
    setPasswordProvider(provider)
    setPassword('');
    setPasswordError('');
    setPasswordSuccess('');
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordProvider(null);
    setPassword('');
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (!password) {
      setPasswordError('Password cannot be empty');
      toast.error('Password cannot be empty');
      return;
    }
    setPasswordError('');
    setPasswordSuccess('');
    try {
      await setProviderPassword(passwordProvider.id, password );
      toast.success('Password updated successfully.');
      closePasswordModal();
    } catch (err) {
      setPasswordError('Failed to update password.');
      toast.error('Failed to update password.');
    }
  };

  if (loading) return <div>Loading providers...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Providers</h2>
      <button className="mb-4 bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition-colors" onClick={handleAdd}>Add Provider</button>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto mb-6">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-primary/10 text-primary">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.filter(p => p.user?.role !== "superadmin").map(p => (
              <tr key={p.id} className="border-b last:border-b-0">
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">{p.email}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-600" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 disabled:opacity-50" onClick={() => handleDelete(p.id)} disabled={deletingId === p.id}>{deletingId === p.id ? 'Deleting...' : 'Delete'}</button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-600" onClick={() => openPasswordModal(p)}>Set Password</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 mb-6">
        {providers.filter(p => p.user?.role !== "superadmin").map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-600" 
                onClick={() => handleEdit(p)}
              >
                Edit
              </button>
              <button 
                className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 disabled:opacity-50" 
                onClick={() => handleDelete(p.id)} 
                disabled={deletingId === p.id}
              >
                {deletingId === p.id ? 'Deleting...' : 'Delete'}
              </button>
              <button 
                className="bg-yellow-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-yellow-600" 
                onClick={() => openPasswordModal(p)}
              >
                Set Password
              </button>
            </div>
          </div>
        ))}
      </div>

      {providers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No providers found.
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <h3 className="text-lg font-bold mb-2">{editing ? 'Edit Provider' : 'Add Provider'}</h3>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="border border-gray-300 rounded px-3 py-2"
                placeholder="Name"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleFormChange}
                className="border border-gray-300 rounded px-3 py-2"
                placeholder="Email"
                required
              />
              {!editing && (
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleFormChange}
                  className="border border-gray-300 rounded px-3 py-2"
                  placeholder="Password"
                  required
                />
              )}
              <input
                name="education"
                value={form.education}
                onChange={handleFormChange}
                className="border border-gray-300 rounded px-3 py-2"
                placeholder="Education (comma separated)"
              />
              <input
                name="credentials"
                value={form.credentials}
                onChange={handleFormChange}
                className="border border-gray-300 rounded px-3 py-2"
                placeholder="Credentials (comma separated)"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  type="submit" 
                  className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition-colors flex-1 sm:flex-none" 
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button 
                  type="button" 
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors flex-1 sm:flex-none" 
                  onClick={() => { setShowForm(false); setEditing(null); }} 
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-sm relative">
            <button 
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 p-2" 
              onClick={closePasswordModal}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-bold mb-4">Set Password for {passwordProvider?.name}</h3>
            <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setPasswordError(''); setPasswordSuccess(''); }}
                className="border border-gray-300 rounded px-3 py-2"
                placeholder="Enter new password"
                required
              />
              {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
              {passwordSuccess && <div className="text-green-600 text-sm">{passwordSuccess}</div>}
              <button 
                type="submit" 
                className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition-colors"
              >
                Save Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 