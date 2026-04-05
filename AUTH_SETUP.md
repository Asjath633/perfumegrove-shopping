# User Authentication & Data Storage Setup Guide

## Overview
This guide helps you set up the Login and Sign In pages with data storage in Google Sheets.

## Project Structure

### New Files Created:
1. **src/context/AuthContext.tsx** - Authentication context and hooks
2. **src/pages/Login.tsx** - Login page component
3. **src/pages/Signup.tsx** - Sign up page component
4. **server.ts** - Backend API server (Node.js/Express)
5. **.env.example** - Environment variables template

## Quick Setup

### 1. Install Backend Dependencies

```bash
npm install express cors jsonwebtoken bcryptjs dotenv googleapis
npm install -D @types/express @types/node ts-node typescript
```

### 2. Google Sheets Setup (Optional but Recommended)

#### Option A: Using Google Sheets (Recommended for Production)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Sheets API
4. Create a Service Account:
   - Go to "Service Accounts"
   - Create a new service account
   - Download the JSON credentials file
5. Place `credentials.json` in the project root directory
6. Create a Google Sheet and share it with the service account email
7. Copy the Sheet ID from the URL (the long alphanumeric string)

#### Option B: Mock Data (Development)

The server can work without Google Sheets configured. Data will be stored in memory during the session.

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
JWT_SECRET=your-super-secret-key-here
GOOGLE_CREDENTIALS_PATH=./credentials.json
GOOGLE_SHEET_ID=your-google-sheet-id
FRONTEND_URL=http://localhost:8080
```

### 4. Run the Backend Server

```bash
# Development mode
npx ts-node server.ts

# Or compile and run
npx tsc server.ts
node server.js
```

The server will start on `http://localhost:5000`

### 5. Update Frontend API Base URL

Update `src/context/AuthContext.tsx` if your backend runs on a different port:

```typescript
const API_BASE_URL = 'http://localhost:5000'; // Update if needed
```

### 6. Run Frontend

In a new terminal:

```bash
npm run dev
```

The app will run on `http://localhost:8080`

## Features

### Login Page (`/login`)
- Email and password authentication
- Form validation
- Error handling
- Link to create account

### Sign Up Page (`/signup`)
- User registration form
- Fields: Name, Email, Phone (optional), Address (optional), Password
- Password confirmation
- Terms and conditions acceptance
- Validation

### Authentication Context
- Global auth state management
- User persistence in localStorage
- Token-based authentication
- Login, signup, and logout functions

## API Endpoints

### `POST /api/auth/signup`
Create a new account

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "+1-555-0000",
  "address": "123 Main St"
}
```

**Response:**
```json
{
  "id": "user_1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0000",
  "address": "123 Main St",
  "createdAt": "2024-01-01T00:00:00Z",
  "token": "jwt-token-here"
}
```

### `POST /api/auth/login`
Login with existing account

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "id": "user_1",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "token": "jwt-token-here"
}
```

### `GET /api/auth/profile`
Get user profile (requires authentication header)

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "id": "user_1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0000",
  "address": "123 Main St",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Google Sheets Integration

When set up correctly, user data is automatically stored in Google Sheets with the following columns:
- User ID
- Email
- Name
- Phone
- Address
- Created At

You can view this data in real-time in your Google Sheet.

## Testing

1. Open http://localhost:8080 in your browser
2. Click "Sign Up" or navigate to `/signup`
3. Fill in the form and create an account
4. You'll be redirected to the home page and logged in
5. Click "Sign In" or navigate to `/login` to test login
6. Check your Google Sheet (if configured) to see the stored user data

## Security Notes

⚠️ **Important for Production:**
- Change the JWT_SECRET to a strong random string
- Use environment variables for all secrets
- Never commit `.env` file to version control
- Add `.env` to `.gitignore`
- Use HTTPS in production
- Implement rate limiting on auth endpoints
- Add email verification for signups
- Add password reset functionality

## Troubleshooting

### Backend won't connect
- Check if port 5000 is available
- Ensure all dependencies are installed

### Google Sheets not working
- Verify credentials.json is in the project root
- Check that the service account has access to the sheet
- Verify GOOGLE_SHEET_ID is correct

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API URLs in AuthContext.tsx

## Next Steps

1. Add email verification
2. Implement password reset
3. Add profile editing page
4. Create admin dashboard to view user data
5. Implement refresh tokens
6. Add rate limiting
7. Deploy backend to production server
