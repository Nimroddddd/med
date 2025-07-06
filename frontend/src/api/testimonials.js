import api from './index';

export const fetchAdminTestimonials = async () => {
  const res = await api.get('/testimonials');
  return res.data;
};

export const fetchHomeTestimonials = async () => {
  const res = await api.get('/testimonials?home=true');
  return res.data;
};

export const submitTestimonial = async (testimonial) => {
  const res = await api.post('/testimonials', testimonial);
  return res.data;
};

export const updateShownTestimonials = async (shownIds) => {
  const res = await api.put('/testimonials/show', { shownIds });
  return res.data;
}; 