require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const farmRoutes = require('./routes/farms');
const cropRecommendationRoutes = require('./routes/cropRecommendations');
const weatherRoutes = require('./routes/weather');
const activityRoutes = require('./routes/activities');
const resourceTrackingRoutes = require('./routes/resourceTracking');
const marketPriceRoutes = require('./routes/marketPrices');
const subsidyRoutes = require('./routes/subsidies');
const soilHealthRoutes = require('./routes/soilHealth');
const creditRoutes = require('./routes/credit');
const cropRoutes = require('./routes/crops');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/crop-recommendations', cropRecommendationRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/resource-tracking', resourceTrackingRoutes);
app.use('/api/market-prices', marketPriceRoutes);
app.use('/api/subsidies', subsidyRoutes);
app.use('/api/soil-health', soilHealthRoutes);
app.use('/api/credit', creditRoutes);
app.use('/api/crops', cropRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('AgriOptima Server is running. Database integrated for all sections.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ AgriOptima Server running on http://localhost:${PORT}`);
    console.log(`📊 Database routes available at /api/*`);
});
