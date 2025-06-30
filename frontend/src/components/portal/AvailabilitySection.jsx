import { useState, useEffect } from 'react';
import { getAvailability, setAvailability } from '../../api/availability';

const DAYS = [
  { key: 'thursday', label: 'Thursday', dayNum: 4 },
  { key: 'friday', label: 'Friday', dayNum: 5 },
  { key: 'saturday', label: 'Saturday', dayNum: 6 },
];

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => {
  const hour = 7 + i;
  const ampm = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return {
    value: `${hour.toString().padStart(2, '0')}:00`,
    label: `${displayHour}:00 ${ampm}`
  };
});

export default function AvailabilitySection() {
  // Get providerId from logged-in user
  const user = JSON.parse(localStorage.getItem('portal_authed_user'));
  const providerId = user?.id;

  const [availability, setAvailabilityState] = useState({});
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAvailability(providerId);
      // Transform backend array to { day: [times] }
      const mapped = {};
      if (Array.isArray(data)) {
        data.forEach(item => {
          mapped[item.day] = item.time_slots;
        });
      }
      setAvailabilityState(mapped);
    } catch (err) {
      setError('Failed to load availability.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (providerId) fetchAvailability();
    // eslint-disable-next-line
  }, [providerId]);

  const startEdit = () => {
    setDraft({ ...availability });
    setEditing(true);
  };

  const toggleSlot = (day, slot) => {
    setDraft(d => {
      const prev = d[day] || [];
      return {
        ...d,
        [day]: prev.includes(slot)
          ? prev.filter(s => s !== slot)
          : [...prev, slot].sort(),
      };
    });
  };

  const selectAllSlots = (day) => {
    setDraft(d => ({
      ...d,
      [day]: TIME_SLOTS.map(slot => slot.value)
    }));
  };

  const clearAllSlots = (day) => {
    setDraft(d => ({
      ...d,
      [day]: []
    }));
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await setAvailability(providerId, draft);
      console.log(draft)
      setAvailabilityState(draft);
      setEditing(false);
    } catch (err) {
      setError('Failed to save availability.');
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    setEditing(false);
  };

  if (!providerId) return <div className="text-red-600">No provider ID found. Please log in again.</div>;
  if (loading) return <div>Loading availability...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Set Your Availability</h2>
      {!editing ? (
        <div>
          <p className="text-gray-600 mb-4">Your current available days and hours for appointments:</p>
          <div className="mb-6 space-y-3">
            {DAYS.map(day => (
              <div key={day.key} className="bg-white p-4 rounded-lg shadow-sm">
                <span className="font-semibold text-primary block mb-1">{day.label}:</span>
                {availability[day.key] && availability[day.key].length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {availability[day.key].map(slot => (
                      <span key={slot} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                        {TIME_SLOTS.find(ts => ts.value === slot)?.label}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Not available</span>
                )}
              </div>
            ))}
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition-colors" onClick={startEdit}>Edit Availability</button>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); save(); }}>
          <p className="text-gray-600 mb-4">Select the days and time slots you are available for appointments. Clients will only be able to book during these times.</p>
          <div className="space-y-6 mb-6">
            {DAYS.map(day => (
              <div key={day.key} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-semibold text-primary">{day.label}</div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => selectAllSlots(day.key)}
                      className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={() => clearAllSlots(day.key)}
                      className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      type="button"
                      key={slot.value}
                      onClick={() => toggleSlot(day.key, slot.value)}
                      className={`px-2 sm:px-3 py-2 rounded border text-xs sm:text-sm font-medium transition-colors
                        ${draft[day.key]?.includes(slot.value)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10'}`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {draft[day.key]?.length || 0} of {TIME_SLOTS.length} slots selected
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              type="submit" 
              className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition-colors flex-1 sm:flex-none" 
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Availability'}
            </button>
            <button 
              type="button" 
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors flex-1 sm:flex-none" 
              onClick={cancel} 
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 