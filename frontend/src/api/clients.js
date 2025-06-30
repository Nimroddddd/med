import api from './index';

// Get all clients (admin only)
export const getClients = async () => {
  const res = await api.get('/clients');
  return res.data;
};

// Get a single client by ID
export const getClient = async (id) => {
  const res = await api.get(`/clients/${id}`);
  return res.data;
};

// Create a client (usually handled automatically on appointment booking)
export const createClient = async (data) => {
  const res = await api.post('/clients', data);
  return res.data;
};

// Update client
export const updateClient = async (id, update) => {
  const res = await api.put(`/clients/${id}`, update);
  return res.data;
};

// Delete client
export const deleteClient = async (id) => {
  const res = await api.delete(`/clients/${id}`);
  return res.data;
}; 