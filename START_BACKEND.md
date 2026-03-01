# 🚀 How to Start the Backend Server

## **IMPORTANT: You need to start the server manually in your terminal**

The backend server needs to be running for the login to work. Follow these steps:

## Step-by-Step Instructions

### 1. Open Terminal
- Press `Cmd + Space` and type "Terminal"
- Or open Terminal from Applications

### 2. Navigate to Backend Directory
Copy and paste this command:
```bash
cd /Users/studentuse33gmail.com/Desktop/hackthon__/Farm-Resource-Allocation/backend
```

### 3. Start the Server
Copy and paste this command:
```bash
npm start
```

### 4. You Should See:
```
✅ MongoDB Connected: localhost:27017
✅ AgriOptima Server running on http://localhost:3000
📊 Database routes available at /api/*
```

**OR if MongoDB is not running:**
```
❌ MongoDB Connection Error: ...
⚠️  Server will continue but database features may not work.
✅ AgriOptima Server running on http://localhost:3000
```

### 5. Keep Terminal Open
**DO NOT CLOSE THE TERMINAL** - The server needs to keep running!

### 6. Test in Browser
Open: `http://localhost:3000`
- Should show: "AgriOptima Server is running..."

### 7. Now Try Login
- Open `login.html` in your browser
- Enter phone number
- Check terminal for OTP (if Twilio not configured)
- Enter OTP to login

## Troubleshooting

### If you see "Cannot find module"
Run this first:
```bash
npm install
```

### If you see "Port 3000 already in use"
Kill the existing process:
```bash
lsof -ti:3000 | xargs kill
```
Then try `npm start` again

### If MongoDB connection fails
The server will still work! Just database features won't be available.
To fix MongoDB:
1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Or use MongoDB Atlas (free cloud): https://www.mongodb.com/cloud/atlas

### Quick Test (No Database)
To test if server works without database:
```bash
node test-server.js
```
Then visit `http://localhost:3000` - should show "Test server is running!"

## Visual Guide

```
Terminal Window (Keep Open!)
┌─────────────────────────────────┐
│ cd backend                      │
│ npm start                       │
│                                 │
│ ✅ Server running on :3000      │
│ (Server stays running here)    │
└─────────────────────────────────┘
         ↓
    Browser Window
┌─────────────────────────────────┐
│ http://localhost:3000         │
│ login.html                      │
└─────────────────────────────────┘
```

## Need Help?

1. Make sure you're in the `backend` directory
2. Make sure you ran `npm install` first
3. Check that port 3000 is not already in use
4. Keep the terminal window open while using the app
