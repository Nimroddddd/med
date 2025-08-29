import React, { useState, useEffect } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import { googleCalendarApi } from '../../api/googleCalendar';
import toast from 'react-hot-toast';

export default function GoogleCalendarIntegration({ providerId }) {
  const [calendarStatus, setCalendarStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  // Removed transient connecting state; only two UI states remain
  
  // UI state for themed confirmation modal
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  // Removed popup/polling state and refs

  // Get provider ID from logged-in user if not passed as prop
  const userId = providerId || JSON.parse(localStorage.getItem('portal_authed_user'))?.id;

  useEffect(() => {
    if (userId) {
      fetchCalendarStatus();
    }
    // Cleanup polling on unmount
    return () => {
      try { } catch (_) {}
    };
  }, [userId]);

  // Show success toast on redirect back from Google OAuth and strip query params
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const oauth = params.get('oauth');
      const status = params.get('status');
      if (oauth === 'google_calendar' && status === 'success') {
        toast.success('Google Calendar connected');
        // Optionally refresh status (usually already updated after redirect)
        fetchCalendarStatus();
        // Remove query params from URL without reloading
        const url = new URL(window.location.href);
        url.searchParams.delete('oauth');
        url.searchParams.delete('status');
        window.history.replaceState({}, document.title, url.pathname + (url.search ? '?' + url.searchParams.toString() : '') + url.hash);
      }
    } catch (e) {
      // no-op
    }
  }, []);

  const fetchCalendarStatus = async () => {
    try {
      setLoading(true);
      const response = await googleCalendarApi.getCalendarStatus(userId);
      setCalendarStatus(response.provider);
    } catch (error) {
      console.error('Failed to fetch calendar status:', error);
      toast.error('Failed to load calendar status');
    } finally {
      setLoading(false);
    }
  };

  // Removed popup window and polling logic entirely

  const handleConnectCalendar = async () => {
    try {
      const response = await googleCalendarApi.startOAuth(userId);
      // Full-page redirect to Google OAuth
      window.location.href = response.authUrl;
      
    } catch (error) {
      console.error('Failed to start OAuth flow:', error);
      toast.error('Failed to connect Google Calendar');
    }
  };

  

  const handleDisconnectCalendar = async () => {
    // Open themed confirmation modal instead of using window.confirm
    setShowDisconnectModal(true);
  };

  const confirmDisconnect = async () => {
    try {
      setDisconnecting(true);
      await googleCalendarApi.disconnectCalendar(userId);
      toast.success('Google Calendar disconnected successfully');
      await fetchCalendarStatus(); // Refresh status
      setShowDisconnectModal(false);
    } catch (error) {
      console.error('Failed to disconnect calendar:', error);
      toast.error('Failed to disconnect calendar');
    } finally {
      setDisconnecting(false);
    }
  };

  

  

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  const isConnected = calendarStatus?.google_calendar_connected;
  // Removed OAuth pending state entirely

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Google Calendar Integration
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Connect your Google Calendar to automatically sync appointments
          </p>
        </div>
        
        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isConnected 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {isConnected ? 'Connected' : 'Not Connected'}
        </div>
      </div>

      {/* Connection Status */}
      <div className="mb-6">
        {isConnected ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800">
                  Google Calendar is connected and syncing appointments
                </p>
                
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-600">
                Connect your Google Calendar to automatically sync appointments when they're created, updated, or deleted.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {!isConnected ? (
          <button
            onClick={handleConnectCalendar}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            </svg>
            Connect Google Calendar
          </button>
        ) : (
          <button
            onClick={handleDisconnectCalendar}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Disconnect
          </button>
        )}
      </div>

      {/* Reusable Confirmation Modals */}
      <ConfirmModal
        open={showDisconnectModal}
        title="Disconnect Google Calendar?"
        description="This will stop automatic appointment syncing. You can reconnect anytime."
        confirmText="Disconnect"
        tone="danger"
        loading={disconnecting}
        onConfirm={confirmDisconnect}
        onClose={() => !disconnecting && setShowDisconnectModal(false)}
      />

      {/* Removed OAuth instructions tied to popup/pending flow */}

      {/* Information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">How it works:</h4>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Appointments are automatically synced to your Google Calendar</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Changes to appointments (time, date, status) update your calendar</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Deleted appointments are removed from your calendar</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Access your appointments on any device through Google Calendar</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
