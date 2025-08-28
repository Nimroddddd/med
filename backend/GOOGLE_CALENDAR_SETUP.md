# Google Calendar Integration Setup Guide

This guide will walk you through setting up Google Calendar integration for your HealthWise mental health practice application.

## 🚀 Quick Start

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google Calendar API**
4. Create **OAuth 2.0 credentials**
5. Set redirect URI: `http://localhost:3000/google-calendar/oauth/callback`

### 2. Environment Variables
Add these to your `.env` file:
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/google-calendar/oauth/callback
```

### 3. Database Migration
Run the migration script to add required fields:
```bash
npm run migrate:google-calendar
```

### 4. Start Your Server
```bash
npm run dev
```

## 🔧 How It Works

### OAuth Flow
1. **Provider initiates connection**: Clicks "Connect Google Calendar" in portal
2. **Backend generates auth URL**: Returns Google OAuth URL
3. **Provider authorizes**: User goes to Google, grants permissions
4. **Google redirects back**: With authorization code
5. **Backend exchanges code**: For access/refresh tokens
6. **Connection established**: Provider can now sync appointments

### Automatic Sync
- **Create appointment** → Creates Google Calendar event
- **Update appointment** → Updates Google Calendar event  
- **Delete appointment** → Deletes Google Calendar event
- **Token refresh** → Automatically handles expired tokens

## 📡 API Endpoints

### OAuth Flow
- `GET /google-calendar/oauth/:providerId` - Start OAuth flow
- `GET /google-calendar/oauth/callback` - OAuth callback handler

### Calendar Management
- `GET /google-calendar/status/:providerId` - Get connection status
- `POST /google-calendar/test/:providerId` - Test connection
- `DELETE /google-calendar/disconnect/:providerId` - Disconnect calendar

## 🗄️ Database Changes

### New Fields Added

#### Providers Table
- `google_calendar_id` - Google Calendar identifier
- `google_calendar_access_token` - OAuth access token
- `google_calendar_refresh_token` - OAuth refresh token
- `google_calendar_expiry` - Token expiration date
- `google_calendar_connected` - Connection status

#### Appointments Table
- `google_calendar_event_id` - Google Calendar event ID

## 🔐 Security Features

- **OAuth 2.0** - Secure authentication flow
- **Token refresh** - Automatic token renewal
- **Error handling** - Graceful fallbacks
- **Logging** - Comprehensive error logging

## 🧪 Testing

### Test Calendar Connection
```bash
curl -X POST http://localhost:3000/google-calendar/test/1
```

### Check Connection Status
```bash
curl http://localhost:3000/google-calendar/status/1
```

## 🚨 Troubleshooting

### Common Issues

**"Invalid redirect URI"**
- Check your Google Cloud Console redirect URI settings
- Ensure it matches exactly: `http://localhost:3000/google-calendar/oauth/callback`

**"Access token expired"**
- Tokens automatically refresh, but check your refresh token is valid
- Re-authorize if refresh fails

**"Calendar sync failed"**
- Check provider has connected Google Calendar
- Verify tokens are valid and not expired
- Check Google Calendar API quotas

### Debug Mode
Enable detailed logging by setting:
```env
NODE_ENV=development
```

## 📱 Frontend Integration

The backend is now ready to work with your frontend. You'll need to:

1. **Add OAuth UI** - "Connect Google Calendar" buttons
2. **Handle redirects** - Process OAuth callback
3. **Show status** - Display connection status
4. **Sync indicators** - Show when appointments sync

## 🔄 Next Steps

1. **Test the OAuth flow** with a provider account
2. **Create test appointments** to verify sync
3. **Implement frontend UI** for calendar management
4. **Add error handling** for edge cases
5. **Monitor API usage** in Google Cloud Console

## 📚 Resources

- [Google Calendar API Documentation](https://developers.google.com/calendar/api)
- [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/)

## 🆘 Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify your Google Cloud Console settings
3. Ensure all environment variables are set correctly
4. Check database migration completed successfully

---

**Happy coding! 🎉**
