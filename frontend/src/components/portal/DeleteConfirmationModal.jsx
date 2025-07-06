import { useState } from 'react';

export default function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  appointment, 
  onConfirm 
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      handleClose();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setIsDeleting(false);
    onClose();
  };

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Delete Appointment
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              disabled={isDeleting}
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Warning: This action cannot be undone
                  </h3>
                  <p className="text-sm text-red-700 mt-1">
                    This appointment will be permanently deleted from the system.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Appointment Details</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Client:</span> {appointment.client || appointment.name}</p>
                <p><span className="font-medium">Email:</span> {appointment.email}</p>
                <p><span className="font-medium">Phone:</span> {appointment.phone}</p>
                <p><span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><span className="font-medium">Time:</span> {appointment.time}</p>
                <p><span className="font-medium">Status:</span> {appointment.status}</p>
              </div>
            </div>

            <p className="text-gray-700">
              Are you sure you want to permanently delete this appointment? This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={isDeleting}
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Appointment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 