import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { googleCalendarApi } from '../../api/googleCalendar';
import toast from 'react-hot-toast';

export default function GoogleOAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        // Clear pending OAuth state
        localStorage.removeItem('google_oauth_pending');
        localStorage.removeItem('google_oauth_timestamp');
        toast.error('Google Calendar authorization was cancelled or failed');
        setTimeout(() => {
          navigate('/owner-portal?active=google-calendar');
        }, 3000);
        return;
      }

      if (!code || !state) {
        setStatus('error');
        // Clear pending OAuth state
        localStorage.removeItem('google_oauth_pending');
        localStorage.removeItem('google_oauth_timestamp');
        toast.error('Invalid OAuth callback parameters');
        setTimeout(() => {
          navigate('/owner-portal?active=google-calendar');
        }, 3000);
        return;
      }

      try {
        // The backend will handle the OAuth callback
        // We just need to redirect back to the portal
        setStatus('success');
        
        // Clear pending OAuth state
        localStorage.removeItem('google_oauth_pending');
        localStorage.removeItem('google_oauth_timestamp');
        
        toast.success('Google Calendar connected successfully!');
        
        // Redirect back to the owner portal with Google Calendar section active
        setTimeout(() => {
          navigate('/owner-portal?active=google-calendar');
        }, 2000);
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        
        // Clear pending OAuth state
        localStorage.removeItem('google_oauth_pending');
        localStorage.removeItem('google_oauth_timestamp');
        
        toast.error('Failed to complete Google Calendar connection');
        setTimeout(() => {
          navigate('/owner-portal?active=google-calendar');
        }, 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate]);

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Authorization</h2>
            <p className="text-gray-600">Please wait while we complete your Google Calendar connection...</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Successful!</h2>
            <p className="text-gray-600 mb-4">Your Google Calendar has been connected successfully.</p>
            <p className="text-sm text-gray-500">Redirecting you back to the portal...</p>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Failed</h2>
            <p className="text-gray-600 mb-4">There was an issue connecting your Google Calendar.</p>
            <p className="text-sm text-gray-500">Redirecting you back to the portal...</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
}
