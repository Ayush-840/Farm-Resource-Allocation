#!/bin/bash

# AgriOptima Backend Startup Script

echo "🚀 Starting AgriOptima Backend Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating default .env..."
    cat > .env << EOF
PORT=3000
MONGODB_URI=mongodb://localhost:27017/agrioptima
EOF
    echo "✅ Created .env file with default settings"
    echo ""
fi

# Start the server
echo "🔌 Starting server on http://localhost:3000"
echo "📊 Make sure MongoDB is running!"
echo ""
npm start
