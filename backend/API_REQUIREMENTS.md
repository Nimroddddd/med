# Backend API & Data Requirements

## 1. Overview
This document details the required API endpoints, data models, and database tables for backend implementation, based on the current frontend and owner portal features.

---

## 2. Features & Data Needs

### Owner Portal
- **Authentication**: Users (owner, providers) log in with email and password.
- **Sections:**
  - **Set Availability**: Owner sets available days and time slots.
  - **Manage Appointments**: View, confirm, or cancel appointments.
  - **Client Info**: View client details and appointment history (feature planned).
  - **Manage Providers** (Superadmin only): Add, edit, delete providers, set provider passwords.

### General Site
- **Book Appointment**: Public users can request appointments (name, email, phone, date, time, message).
- **Providers**: List and detail view of providers.
- **Contact**: General contact form.

---

## 3. Data Models & Tables

### User
- `id` (auto)
- `username` (string, required)
- `password` (string, required)
- `email` (string, required)
- `role` (enum: superadmin, provider, etc.)
- `name` (string)

### Provider
- `id` (string, unique, required)
- `name` (string, required)
- `email` (string, required)
- `credential` (string)
- `bio` (string, optional)
- `specialties` (array, optional)
- `education` (array, optional)
- `interests` (string, optional)
- `image` (string, optional)

### Client
- `id` (auto)
- `name` (string, required)
- `email` (string, required)
- `phone` (string)
- (Optional: appointment history, etc.)

### Appointment
- `id` (auto)
- `client_id` (foreign key to Client)
- `provider_id` (foreign key to Provider)
- `date` (date)
- `time` (string or time)
- `status` (enum: pending, confirmed, cancelled)
- `email` (string)
- `phone` (string)

### Availability
- `id` (auto)
- `provider_id` (foreign key to Provider)
- `day` (enum: thursday, friday, saturday)
- `time_slots` (array of strings, e.g., ["07:00", "08:00", ...])

---

## 4. Required API Endpoints

### Auth
- `POST /api/login` — Authenticate user (email, password)
- `POST /api/logout` — End session

### Providers
- `GET /api/providers` — List all providers
- `GET /api/providers/:id` — Get provider details
- `POST /api/providers` — Add provider (admin only)
- `PUT /api/providers/:id` — Edit provider (admin only)
- `DELETE /api/providers/:id` — Delete provider (admin only)
- `POST /api/providers/:id/password` — Set provider password (admin only)

### Clients
- `GET /api/clients` — List all clients (admin only)
- `GET /api/clients/:id` — Get client details (admin only)
- `POST /api/clients` — Add client (on appointment booking)
- `PUT /api/clients/:id` — Edit client (admin only)
- `DELETE /api/clients/:id` — Delete client (admin only)

### Appointments
- `GET /api/appointments` — List all appointments (admin/provider)
- `GET /api/appointments/:id` — Get appointment details
- `POST /api/appointments` — Create appointment (public booking)
- `PUT /api/appointments/:id` — Update appointment (confirm/cancel)
- `DELETE /api/appointments/:id` — Delete appointment (admin/provider)

### Availability
- `GET /api/availability/:provider_id` — Get provider availability
- `POST /api/availability/:provider_id` — Set provider availability (owner/provider)

---

## 5. Notes
- The backend currently only has a `User` model and no implemented routes/controllers.
- All data is currently managed in frontend localStorage; backend should persist and secure all data.
- Passwords must be hashed and never stored in plaintext.
- Role-based access control is required for admin/provider/owner actions. 