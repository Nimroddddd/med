import { useEffect, useState } from 'react';
import { getAppointments, updateAppointment, deleteAppointment } from '../../api/appointments';
import AppointmentActionModal from './AppointmentActionModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

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
  const [modalState, setModalState] = useState({
    isOpen: false,
    appointment: null,
    action: null
  });
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    appointment: null
  });

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

  const handleActionClick = (appointment, action) => {
    setModalState({
      isOpen: true,
      appointment,
      action
    });
  };

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      appointment: null,
      action: null
    });
  };

  const handleModalSubmit = async (formData) => {
    const { appointment } = modalState;
    setUpdatingId(appointment.id);
    try {
      await updateAppointment(appointment.id, formData);
      setAppointments(appts => appts.map(a => a.id === appointment.id ? { ...a, status: formData.status } : a));
      handleModalClose();
    } catch (err) {
      setError('Failed to update appointment status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteClick = (appointment) => {
    setDeleteModalState({
      isOpen: true,
      appointment
    });
  };

  const handleDeleteModalClose = () => {
    setDeleteModalState({
      isOpen: false,
      appointment: null
    });
  };

  const handleDeleteConfirm = async () => {
    const { appointment } = deleteModalState;
    setUpdatingId(appointment.id);
    try {
      await deleteAppointment(appointment.id);
      setAppointments(appts => appts.filter(a => a.id !== appointment.id));
      handleDeleteModalClose();
    } catch (err) {
      setError('Failed to delete appointment.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      rejected: 'bg-orange-100 text-orange-800'
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
                <td className="px-4 py-2 space-x-2 flex items-center">
                  {appt.status === 'pending' && (
                    <>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-600 disabled:opacity-50"
                      onClick={() => handleStatusUpdate(appt.id, 'confirmed')}
                      disabled={updatingId === appt.id}
                    >
                        {updatingId === appt.id ? 'Updating...' : 'Accept'}
                      </button>
                      <button
                        className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-orange-600 disabled:opacity-50"
                        onClick={() => handleActionClick(appt, 'reject')}
                        disabled={updatingId === appt.id}
                      >
                        {updatingId === appt.id ? 'Updating...' : 'Reject'}
                    </button>
                    </>
                  )}
                  {appt.status === 'confirmed' && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-600 disabled:opacity-50"
                      onClick={() => handleActionClick(appt, 'cancel')}
                      disabled={updatingId === appt.id}
                    >
                      {updatingId === appt.id ? 'Updating...' : 'Cancel'}
                    </button>
                  )}
                  <button
                    className="ml-4 text-gray-400 hover:text-red-500 p-1 disabled:opacity-50 transition-colors self-center"
                    onClick={() => handleDeleteClick(appt)}
                    disabled={updatingId === appt.id}
                    title="Delete appointment"
                  >
                    {updatingId === appt.id ? (
                      <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
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
            
            <div className="flex gap-2 mb-3">
              {appt.status === 'pending' && (
                <>
                <button
                  className="flex-1 bg-green-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-green-600 disabled:opacity-50"
                  onClick={() => handleStatusUpdate(appt.id, 'confirmed')}
                  disabled={updatingId === appt.id}
                >
                    {updatingId === appt.id ? 'Updating...' : 'Accept'}
                  </button>
                  <button
                    className="flex-1 bg-orange-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-orange-600 disabled:opacity-50"
                    onClick={() => handleActionClick(appt, 'reject')}
                    disabled={updatingId === appt.id}
                  >
                    {updatingId === appt.id ? 'Updating...' : 'Reject'}
                </button>
                </>
              )}
              {appt.status === 'confirmed' && (
                <button
                  className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-red-600 disabled:opacity-50"
                  onClick={() => handleActionClick(appt, 'cancel')}
                  disabled={updatingId === appt.id}
                >
                  {updatingId === appt.id ? 'Updating...' : 'Cancel'}
                </button>
              )}
            </div>
            <div className="flex justify-end">
              <button
                className="text-gray-400 hover:text-red-500 p-1 disabled:opacity-50 transition-colors"
                onClick={() => handleDeleteClick(appt)}
                disabled={updatingId === appt.id}
                title="Delete appointment"
              >
                {updatingId === appt.id ? (
                  <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {appointments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No appointments found.
        </div>
      )}

      <AppointmentActionModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        appointment={modalState.appointment}
        action={modalState.action}
        onSubmit={handleModalSubmit}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalState.isOpen}
        onClose={handleDeleteModalClose}
        appointment={deleteModalState.appointment}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
} 