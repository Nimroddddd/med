import api from './index';

export const fetchTestimonials = async () => {
  const res = await api.get('/testimonials');
  return res.data;
};

export const submitTestimonial = async (testimonial) => {
  const res = await api.post('/testimonials', testimonial);
  return res.data;
}; 