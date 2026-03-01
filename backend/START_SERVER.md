# How to Start the Backend Server

## Quick Start

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup MongoDB

**Option A: Use Local MongoDB**
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - **macOS**: `brew services start mongodb-community` (if installed via Homebrew)
   - **Windows**: Start MongoDB service from Services
   - **Linux**: `sudo systemctl start mongod`

**Option B: Use MongoDB Atlas (Cloud - Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Use it in `.env` file

### Step 3: Create .env File

Create a file named `.env` in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/agrioptima
```

**For MongoDB Atlas, use:**
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrioptima
```

**Optional (for SMS):**
```env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

### Step 4: Start the Server

```bash
npm start
```

Or:
```bash
node server.js
```

You should see:
```
✅ MongoDB Connected: localhost:27017
✅ AgriOptima Server running on http://localhost:3000
📊 Database routes available at /api/*
```

## Troubleshooting

### Error: "Cannot find module"
**Solution:** Run `npm install` in the backend directory

### Error: "MongoDB Connection Error"
**Solutions:**
1. Make sure MongoDB is running
2. Check your MONGODB_URI in `.env` file
3. For local MongoDB, try: `mongodb://127.0.0.1:27017/agrioptima`
4. For Atlas, check your connection string and network access settings

### Error: "Port 3000 already in use"
**Solutions:**
1. Change PORT in `.env` to another port (e.g., 3001)
2. Or kill the process using port 3000:
   - **macOS/Linux**: `lsof -ti:3000 | xargs kill`
   - **Windows**: `netstat -ano | findstr :3000` then `taskkill /PID <pid> /F`

### Network Error in Frontend
**Solutions:**
1. Make sure backend is running (check terminal)
2. Verify backend URL in frontend matches your PORT
3. Check CORS settings (should be enabled by default)
4. Try accessing `http://localhost:3000` in browser - should show server message

### Test Backend is Running

Open browser and go to:
```
http://localhost:3000
```

You should see:
```
AgriOptima Server is running. Database integrated for all sections.
```

### Test API Endpoint

Try:
```
http://localhost:3000/api/auth/check-user/1234567890
```

Should return JSON response.

## Development Tips

1. **Keep terminal open** - Server runs in foreground
2. **Check logs** - All errors and OTPs will be logged to console
3. **Restart after .env changes** - Restart server after modifying .env
4. **MongoDB Compass** - Use MongoDB Compass to view database (optional)

## Next Steps

Once server is running:
1. Open `login.html` in browser
2. Enter phone number
3. Check terminal for OTP (if Twilio not configured)
4. Enter OTP to login
