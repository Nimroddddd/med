import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Adjust if your backend runs on a different base path
  withCredentials: true, // If you use cookies/sessions
});

export default api;

export const sendContactMessage = async (data) => {
  const res = await api.post('/contact', data);
  return res.data;
}; 