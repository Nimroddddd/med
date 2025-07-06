import React, { useEffect, useState } from 'react';
import { fetchAdminTestimonials, updateShownTestimonials } from '../../api/testimonials';
import { Star } from 'lucide-react';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterStars, setFilterStars] = useState(0);
  const [sortDesc, setSortDesc] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdminTestimonials().then((data) => {
      setTestimonials(data);
      setSelectedIds(data.filter(t => t.show).map(t => t.id));
    });
  }, []);

  const handleToggle = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length < 5) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateShownTestimonials(selectedIds);
      setSuccess('Changes saved!');
      setTimeout(() => setSuccess(null), 2000);
    } catch (e) {
      setError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  };

  const filtered = testimonials
    .filter(t => (filterStars ? t.stars === filterStars : true))
    .sort((a, b) => sortDesc ? b.stars - a.stars : a.stars - b.stars);

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-primary">Manage Testimonials</h2>
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <label className="font-medium">Filter by Stars:</label>
        {[0,1,2,3,4,5].map(star => (
          <button
            key={star}
            onClick={() => setFilterStars(star)}
            className={`px-3 py-1 rounded ${filterStars === star ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {star === 0 ? 'All' : <span className="flex items-center">{star} <Star className="w-4 h-4 ml-1 text-yellow-400" fill="currentColor" /></span>}
          </button>
        ))}
        <button
          onClick={() => setSortDesc(!sortDesc)}
          className="ml-4 px-3 py-1 rounded bg-gray-100 text-gray-700"
        >
          Sort: {sortDesc ? 'High → Low' : 'Low → High'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(t => (
          <div key={t.id} className={`relative border rounded-lg p-5 shadow-sm ${selectedIds.includes(t.id) ? 'ring-2 ring-primary' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-primary">{t.name}</span>
              <span className="flex items-center ml-2">
                {[1,2,3,4,5].map(star => (
                  <Star key={star} className={`w-4 h-4 ${star <= t.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} fill={star <= t.stars ? 'currentColor' : 'none'} />
                ))}
              </span>
            </div>
            <p className="italic text-gray-700 mb-3">“{t.feedback}”</p>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedIds.includes(t.id)}
                onChange={() => handleToggle(t.id)}
                disabled={!selectedIds.includes(t.id) && selectedIds.length >= 5}
                id={`show-${t.id}`}
                className="accent-primary"
              />
              <label htmlFor={`show-${t.id}`} className="text-sm font-medium">Show on public site</label>
            </div>
            {selectedIds.includes(t.id) && <span className="absolute top-2 right-2 text-xs bg-primary text-white px-2 py-0.5 rounded">Shown</span>}
          </div>
        ))}
      </div>
      <div className="mt-8 flex gap-4 items-center">
        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-secondary transition-colors"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {success && <span className="text-green-600">{success}</span>}
        {error && <span className="text-red-600">{error}</span>}
      </div>
      <p className="mt-4 text-gray-500 text-sm">You can select up to 5 testimonials to display on the public site. Use the filters and sorting to help manage feedback.</p>
    </section>
  );
} 