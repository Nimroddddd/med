import { useState, useEffect } from 'react';

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

function loadAvailability() {
  try {
    return JSON.parse(localStorage.getItem('owner_availability')) || {};
  } catch {
    return {};
  }
}

function saveAvailability(avail) {
  localStorage.setItem('owner_availability', JSON.stringify(avail));
}

export default function AvailabilitySection() {
  const [availability, setAvailability] = useState({});
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({});

  useEffect(() => {
    setAvailability(loadAvailability());
  }, []);

  const startEdit = () => {
    setDraft({ ...loadAvailability() });
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

  const save = () => {
    setAvailability(draft);
    saveAvailability(draft);
    setEditing(false);
  };

  const cancel = () => {
    setEditing(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Set Your Availability</h2>
      {!editing ? (
        <div>
          <p className="text-gray-600 mb-4">Your current available days and hours for appointments:</p>
          <div className="mb-6">
            {DAYS.map(day => (
              <div key={day.key} className="mb-2">
                <span className="font-semibold text-primary mr-2">{day.label}:</span>
                {availability[day.key] && availability[day.key].length > 0 ? (
                  <span className="text-gray-700">
                    {availability[day.key].map(slot => TIME_SLOTS.find(ts => ts.value === slot)?.label).join(', ')}
                  </span>
                ) : (
                  <span className="text-gray-400">Not available</span>
                )}
              </div>
            ))}
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition-colors" onClick={startEdit}>Edit Availability</button>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); save(); }}>
          <p className="text-gray-600 mb-4">Select the days and time slots you are available for appointments.</p>
          <div className="space-y-6 mb-6">
            {DAYS.map(day => (
              <div key={day.key}>
                <div className="font-semibold text-primary mb-2">{day.label}</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      type="button"
                      key={slot.value}
                      onClick={() => toggleSlot(day.key, slot.value)}
                      className={`px-3 py-2 rounded border text-sm font-medium transition-colors
                        ${draft[day.key]?.includes(slot.value)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10'}`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition-colors">Save</button>
            <button type="button" className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-300 transition-colors" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
} 