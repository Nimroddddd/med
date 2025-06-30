import api from './index';

// Book an appointment (also creates a client entry)
export const bookAppointment = async (data) => {
  // data: { name, email, phone, date, time, message }
  const res = await api.post('/appointments', data);
  return res.data;
};

// Get all appointments (admin/provider)
export const getAppointments = async () => {
  const res = await api.get('/appointments');
  return res.data;
};

// Get a single appointment by ID
export const getAppointment = async (id) => {
  const res = await api.get(`/appointments/${id}`);
  return res.data;
};

// Update appointment (e.g., confirm/cancel)
export const updateAppointment = async (id, update) => {
  const res = await api.put(`/appointments/${id}`, update);
  return res.data;
};

// Delete appointment
export const deleteAppointment = async (id) => {
  const res = await api.delete(`/appointments/${id}`);
  return res.data;
}; 