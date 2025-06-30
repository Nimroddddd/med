import api from './index';

// Login
export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

// Logout
export const logout = async () => {
  const res = await api.post('/logout');
  return res.data;
}; 