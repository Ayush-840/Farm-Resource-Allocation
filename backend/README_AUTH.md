# Authentication Backend Integration

## Overview
The login section is now fully integrated with the MongoDB database backend. All authentication data is stored persistently in the database.

## Features

### 1. OTP Management
- OTPs are stored in the database with expiration times
- Automatic cleanup of expired OTPs
- Support for resending OTPs

### 2. User Management
- Automatic user creation on first login
- User data persistence in database
- Last login tracking
- User profile management

### 3. API Endpoints

#### POST `/api/auth/send-otp`
Send OTP to user's phone number.

**Request:**
```json
{
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully.",
  "expiresIn": 300
}
```

#### POST `/api/auth/verify-otp`
Verify OTP and authenticate user.

**Request:**
```json
{
  "phone": "1234567890",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "agri-token-...",
  "user": {
    "_id": "...",
    "phone": "1234567890",
    "name": "Farmer User",
    "role": "Farmer",
    "language": "en",
    "createdAt": "...",
    "lastLogin": "..."
  }
}
```

#### POST `/api/auth/resend-otp`
Resend OTP to user's phone number.

**Request:**
```json
{
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP resent successfully.",
  "expiresIn": 300
}
```

#### GET `/api/auth/check-user/:phone`
Check if a user exists for the given phone number.

**Response:**
```json
{
  "success": true,
  "exists": true,
  "user": {
    "_id": "...",
    "phone": "1234567890",
    "name": "Farmer User",
    "role": "Farmer"
  }
}
```

## Database Models

### OTP Model
```javascript
{
  phone: String (required, indexed),
  otp: String (required),
  expiresAt: Date (required, auto-delete),
  verified: Boolean (default: false),
  createdAt: Date
}
```

### User Model
```javascript
{
  phone: String (required, unique),
  name: String (default: "Farmer User"),
  role: String (default: "Farmer"),
  language: String (default: "en"),
  createdAt: Date,
  lastLogin: Date
}
```

## Frontend Integration

The login page (`login.html`) includes:

1. **OTP Timer** - Shows countdown for OTP expiration
2. **Resend OTP** - Button to resend OTP (disabled for 30 seconds after sending)
3. **Error Handling** - Comprehensive error messages
4. **User Session** - Stores user data in localStorage after successful login
5. **Auto-redirect** - Redirects to index.html after successful login

## Usage Flow

1. User enters phone number
2. Clicks "Send OTP"
3. OTP is generated and stored in database
4. OTP is sent via SMS (Twilio) or console (if not configured)
5. User enters OTP
6. OTP is verified against database
7. User is created/updated in database
8. Authentication token and user data returned
9. User data stored in localStorage
10. User redirected to main application

## Security Features

- OTP expiration (5 minutes)
- OTP verification flag
- Automatic cleanup of expired OTPs
- Phone number validation
- Rate limiting ready (can be added)

## Twilio Integration

To enable real SMS sending:

1. Get Twilio credentials
2. Add to `.env`:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   ```

If Twilio is not configured, OTPs are logged to console for development.

## Testing

For hackathon/demo purposes, the system allows OTP bypass if no OTP record exists in database. In production, this should be removed and proper OTP validation enforced.
