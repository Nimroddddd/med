import { useState, useEffect } from 'react';
import { getProvider, updateProvider, setProviderPassword } from '../../api/providers';
import GoogleCalendarIntegration from './GoogleCalendarIntegration';
import toast from 'react-hot-toast';

export default function ProviderProfile() {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Get providerId from logged-in user
  const user = JSON.parse(localStorage.getItem('portal_authed_user'));
  const providerId = user?.id;

  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    specialties: '',
    education: '',
    credentials: '',
    interests: '',
    image: ''
  });

  const fetchProvider = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProvider(providerId);
      setProvider(data);
      setForm({
        name: data.name || '',
        email: data.email || '',
        bio: data.bio || '',
        specialties: Array.isArray(data.specialties) ? data.specialties.join(', ') : data.specialties || '',
        education: Array.isArray(data.education) ? data.education.join(', ') : data.education || '',
        credentials: Array.isArray(data.credentials) ? data.credentials.join(', ') : data.credentials || '',
        interests: data.interests || '',
        image: data.image || ''
      });
    } catch (err) {
      setError('Failed to load provider profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) fetchProvider();
    // eslint-disable-next-line
  }, [providerId]);

  const handleFormChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const updateData = {
        ...form,
        specialties: form.specialties ? form.specialties.split(',').map(s => s.trim()) : [],
        education: form.education ? form.education.split(',').map(s => s.trim()) : [],
        credentials: form.credentials ? form.credentials.split(',').map(s => s.trim()) : []
      };
      await updateProvider(providerId, updateData);
      setSuccess('Profile updated successfully!');
      fetchProvider(); // Refresh data
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const openPasswordModal = () => {
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError('');
    setPasswordSuccess('');
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordChange = (e) => {
    setPasswordForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    // Validation
    if (!passwordForm.oldPassword) {
      setPasswordError('Current password is required');
      toast.error('Current password is required');
      return;
    }
    if (!passwordForm.newPassword) {
      setPasswordError('New password is required');
      toast.error('New password is required');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      toast.error('New passwords do not match');
      return;
    }
    if (passwordForm.oldPassword === passwordForm.newPassword) {
      setPasswordError('New password must be different from current password');
      toast.error('New password must be different from current password');
      return;
    }

    setPasswordError('');
    setPasswordSuccess('');
    try {
      const response = await updateProvider(providerId, passwordForm);
      if (response.message === "Incorrect Password") {
        setPasswordError('Current password is incorrect.');
        toast.error('Current password is incorrect.');
        return;
      }
      setPasswordSuccess('Password updated successfully.');
      toast.success('Password updated successfully.');
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      closePasswordModal();
    } catch (err) {
      setPasswordError('Failed to update password.');
      toast.error('Failed to update password.');
    }
  };

  if (!providerId) return <div className="text-red-600">No provider ID found. Please log in again.</div>;
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      
      {success && <div className="text-green-600 text-sm font-semibold mb-4">{success}</div>}
      
      <div className="bg-white rounded shadow-md p-4 sm:p-6">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Profile Image URL</label>
            <input
              name="image"
              type="url"
              value={form.image || ''}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/image.jpg"
            />
            {form.image && (
              <div className="mt-2">
                <img
                  src={form.image}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-xl border shadow"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleFormChange}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Tell us about yourself and your approach to care..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Specialties</label>
            <input
              name="specialties"
              value={form.specialties}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Depression, Anxiety, PTSD, Bipolar Disorder"
            />
            <p className="text-sm text-gray-500 mt-1">Separate multiple specialties with commas</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Education</label>
            <input
              name="education"
              value={form.education}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Bachelor of Science in Nursing, Master of Science in Nursing"
            />
            <p className="text-sm text-gray-500 mt-1">Separate multiple degrees with commas</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Credentials</label>
            <input
              name="credentials"
              value={form.credentials}
              onChange={handleFormChange}
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., DNP, PMHNP-BC"
            />
            <p className="text-sm text-gray-500 mt-1">Separate multiple credentials with commas</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Personal Interests</label>
            <textarea
              name="interests"
              value={form.interests}
              onChange={handleFormChange}
              rows="3"
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Share your personal interests and hobbies..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 sm:px-6 py-2 rounded font-semibold hover:bg-secondary transition-colors flex-1 sm:flex-none"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              type="button"
              onClick={openPasswordModal}
              className="bg-yellow-500 text-white px-4 sm:px-6 py-2 rounded font-semibold hover:bg-yellow-600 transition-colors flex-1 sm:flex-none"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Modal */}
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
            <h3 className="text-lg font-bold mb-4">Change Password</h3>
            <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter current password"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter new password"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>}
              {passwordSuccess && <div className="text-green-600 text-sm">{passwordSuccess}</div>}
              
              <button 
                type="submit" 
                className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 