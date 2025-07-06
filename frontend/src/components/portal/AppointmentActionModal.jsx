import { useState } from 'react';

export default function AppointmentActionModal({ 
  isOpen, 
  onClose, 
  appointment, 
  action, 
  onSubmit 
}) {
  const [reason, setReason] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please provide a reason for the action.');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        status: action === 'cancel' ? 'canceled' : 'rejected',
        reason: reason.trim(),
        additionalNotes: additionalNotes.trim()
      });
      handleClose();
    } catch (error) {
      console.error('Error submitting action:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReason('');
    setAdditionalNotes('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen || !appointment) return null;

  const actionText = action === 'cancel' ? 'Cancel' : 'Reject';
  const actionColor = action === 'cancel' ? 'red' : 'orange';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {actionText} Appointment
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Appointment Details</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Client:</span> {appointment.client || appointment.name}</p>
                <p><span className="font-medium">Email:</span> {appointment.email}</p>
                <p><span className="font-medium">Phone:</span> {appointment.phone}</p>
                <p><span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {appointment.time}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for {actionText.toLowerCase()}ing *
                </label>
                <select
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a reason...</option>
                  <option value="Client requested cancellation">Client requested cancellation</option>
                  <option value="Provider unavailable">Provider unavailable</option>
                  <option value="Emergency situation">Emergency situation</option>
                  <option value="Scheduling conflict">Scheduling conflict</option>
                  <option value="Insurance issues">Insurance issues</option>
                  <option value="Client no longer interested">Client no longer interested</option>
                  <option value="Duplicate appointment">Duplicate appointment</option>
                  <option value="Outside provider scope">Outside provider scope</option>
                  <option value="Inappropriate request">Inappropriate request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="additionalNotes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Provide any additional details or instructions..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 bg-${actionColor}-500 text-white rounded-md font-medium hover:bg-${actionColor}-600 transition-colors disabled:opacity-50`}
                  disabled={isSubmitting || !reason.trim()}
                >
                  {isSubmitting ? 'Processing...' : actionText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 