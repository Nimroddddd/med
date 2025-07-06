import api from './index';

export const submitNewsletterSignup = async (email) => {
  const res = await api.post('/newsletter', { email });
  return res.data;
}; 