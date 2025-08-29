# Google Calendar Sync Changes

## Overview
Modified the appointment booking system so that Google Calendar events are created only when providers **accept** appointments, not when users initially request them.

## Changes Made

### 1. Modified `createAppointment` function
**File:** `backend/src/controllers/appointments.controller.js`

**Before:** Calendar events were created immediately when users requested appointments
**After:** Calendar events are NOT created during appointment request - only a comment indicates they will be created upon acceptance

### 2. Enhanced `updateAppointment` function
**File:** `backend/src/controllers/appointments.controller.js`

**New Logic:**
- **When status changes to "confirmed":** Creates Google Calendar event (if not already exists)
- **When status changes to "canceled":** Deletes Google Calendar event (if exists)
- **When updating confirmed appointment:** Updates existing Google Calendar event

### 3. Preserved `deleteAppointment` function
**File:** `backend/src/controllers/appointments.controller.js`

**Behavior:** Still deletes Google Calendar events when appointments are deleted (unchanged)

## New Workflow

### User Books Appointment
1. User submits appointment request through booking form
2. Appointment is created with status "pending"
3. **NO** Google Calendar event is created
4. Admin/provider receives notification email

### Provider Accepts Appointment
1. Provider changes appointment status to "confirmed" in portal
2. **Google Calendar event is created** at this point
3. Confirmation email is sent to client
4. Event appears on provider's Google Calendar

### Provider Cancels Appointment
1. Provider changes appointment status to "canceled"
2. Google Calendar event is deleted (if it existed)
3. Cancellation email is sent to client

## Migration Required

### For Existing Pending Appointments
Run the cleanup script to remove calendar events from pending appointments:

```bash
cd backend
node scripts/cleanup-pending-calendar-events.js
```

This script will:
- Find all pending appointments that have Google Calendar event IDs
- Delete the corresponding calendar events
- Clear the event IDs from the database
- Provide a summary of actions taken

## Benefits

1. **Cleaner Calendar:** Provider's calendar only shows confirmed appointments
2. **Better UX:** No need to manually clean up calendar events for rejected appointments
3. **Accurate Scheduling:** Calendar reflects actual committed appointments only
4. **Reduced Clutter:** Eliminates tentative/pending events from calendar view

## Testing Recommendations

1. **Test New Appointment Flow:**
   - Create appointment request → verify no calendar event
   - Accept appointment → verify calendar event is created
   - Cancel appointment → verify calendar event is deleted

2. **Test Existing Appointments:**
   - Run migration script on staging environment first
   - Verify pending appointments no longer have calendar events
   - Confirm confirmed appointments still have their events

3. **Test Edge Cases:**
   - Multiple status changes on same appointment
   - Network failures during calendar sync
   - Invalid/expired Google Calendar tokens

## Files Modified

- `backend/src/controllers/appointments.controller.js` - Main logic changes
- `backend/scripts/cleanup-pending-calendar-events.js` - Migration script (new)
- `CALENDAR_SYNC_CHANGES.md` - This documentation (new)

## Rollback Plan

If needed to rollback:
1. Restore the original `createAppointment` function to sync calendar on creation
2. Modify `updateAppointment` to only update existing events, not create new ones
3. The migration script changes are safe to keep (removing events from pending appointments)
