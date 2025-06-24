import { useState } from 'react';

const DUMMY_APPOINTMENTS = [
  {
    id: 1,
    client: 'Jane Doe',
    date: '2024-06-13',
    time: '09:00',
    status: 'pending',
    email: 'jane@example.com',
    phone: '(555) 111-2222',
  },
  {
    id: 2,
    client: 'John Smith',
    date: '2024-06-14',
    time: '11:00',
    status: 'confirmed',
    email: 'john@example.com',
    phone: '(555) 333-4444',
  },
  {
    id: 3,
    client: 'Alice Johnson',
    date: '2024-06-15',
    time: '14:00',
    status: 'pending',
    email: 'alice@example.com',
    phone: '(555) 555-6666',
  },
];

function formatTime(time) {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${ampm}`;
}

export default function AppointmentsSection() {
  const [appointments, setAppointments] = useState(DUMMY_APPOINTMENTS);

  const updateStatus = (id, status) => {
    setAppointments(appts => appts.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Appointments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-primary/10 text-primary">
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">
                  <div className="font-semibold">{appt.client}</div>
                  <div className="text-xs text-gray-500">{appt.email}<br />{appt.phone}</div>
                </td>
                <td className="px-4 py-2">{new Date(appt.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{formatTime(appt.time)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    appt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    appt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  {appt.status !== 'confirmed' && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600"
                      onClick={() => updateStatus(appt.id, 'confirmed')}
                    >
                      Confirm
                    </button>
                  )}
                  {appt.status !== 'cancelled' && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600"
                      onClick={() => updateStatus(appt.id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 