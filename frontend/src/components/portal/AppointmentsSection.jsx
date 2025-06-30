import { useEffect, useState } from 'react';
import { getAppointments, updateAppointment } from '../../api/appointments';

function formatTime(time) {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour < 12 ? 'AM' : 'PM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${ampm}`;
}

export default function AppointmentsSection() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateAppointment(id, { status });
      setAppointments(appts => appts.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      setError('Failed to update appointment status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-bold ${statusStyles[status] || statusStyles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Appointments</h2>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
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
                  <div className="font-semibold">{appt.client || appt.name}</div>
                  <div className="text-xs text-gray-500">{appt.email}<br />{appt.phone}</div>
                </td>
                <td className="px-4 py-2">{new Date(appt.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{formatTime(appt.time)}</td>
                <td className="px-4 py-2">
                  {getStatusBadge(appt.status)}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {appt.status !== 'confirmed' && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 disabled:opacity-50"
                      onClick={() => handleStatusUpdate(appt.id, 'confirmed')}
                      disabled={updatingId === appt.id}
                    >
                      {updatingId === appt.id ? 'Updating...' : 'Confirm'}
                    </button>
                  )}
                  {appt.status !== 'canceled' && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 disabled:opacity-50"
                      onClick={() => handleStatusUpdate(appt.id, 'canceled')}
                      disabled={updatingId === appt.id}
                    >
                      {updatingId === appt.id ? 'Updating...' : 'Cancel'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {appointments.map(appt => (
          <div key={appt.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{appt.client || appt.name}</h3>
                <p className="text-sm text-gray-600">{appt.email}</p>
                <p className="text-sm text-gray-600">{appt.phone}</p>
              </div>
              <div className="ml-4">
                {getStatusBadge(appt.status)}
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Date:</span> {new Date(appt.date).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Time:</span> {formatTime(appt.time)}
              </div>
            </div>
            
            <div className="flex gap-2">
              {appt.status !== 'confirmed' && (
                <button
                  className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-green-600 disabled:opacity-50"
                  onClick={() => handleStatusUpdate(appt.id, 'confirmed')}
                  disabled={updatingId === appt.id}
                >
                  {updatingId === appt.id ? 'Updating...' : 'Confirm'}
                </button>
              )}
              {appt.status !== 'canceled' && (
                <button
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
                  onClick={() => handleStatusUpdate(appt.id, 'canceled')}
                  disabled={updatingId === appt.id}
                >
                  {updatingId === appt.id ? 'Updating...' : 'Cancel'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {appointments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No appointments found.
        </div>
      )}
    </div>
  );
} 