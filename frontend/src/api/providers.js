import api from './index';

// Get all providers
export const getProviders = async () => {
  const res = await api.get('/providers');
  return res.data;
};

// Get a single provider by ID
export const getProvider = async (id) => {
  const res = await api.get(`/providers/${id}`);
  return res.data;
};
export const getProviderByLink = async (id) => {
  const res = await api.get(`/providers/link/${id}`);
  return res.data;
};

// Create a provider (admin only)
export const createProvider = async (data) => {
  const res = await api.post('/providers', data);
  return res.data;
};

// Update provider (admin only)
export const updateProvider = async (id, update) => {
  const res = await api.put(`/providers/${id}`, update);
  return res.data;
};

// Delete provider (admin only)
export const deleteProvider = async (id) => {
  const res = await api.delete(`/providers/${id}`);
  return res.data;
};

// Set provider password (admin only)
export const setProviderPassword = async (id, password) => {
  const res = await api.post(`/providers/${id}/password`, { password });
  return res.data;
}; 