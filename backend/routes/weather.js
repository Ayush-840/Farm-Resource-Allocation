const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');

// Create or update weather data
router.post('/', async (req, res) => {
    try {
        const { state, district, block } = req.body;
        
        // Check if weather data exists for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let weather = await Weather.findOne({
            state,
            district,
            block,
            date: { $gte: today }
        });
        
        if (weather) {
            // Update existing
            Object.assign(weather, req.body);
            await weather.save();
        } else {
            // Create new
            weather = new Weather(req.body);
            await weather.save();
        }
        
        res.json({ success: true, weather });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get weather data by location
router.get('/location', async (req, res) => {
    try {
        const { state, district, block } = req.query;
        
        const weather = await Weather.findOne({
            state,
            district,
            block
        }).sort({ date: -1 });
        
        if (!weather) {
            return res.status(404).json({ error: 'Weather data not found' });
        }
        
        res.json({ success: true, weather });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get weather history
router.get('/history', async (req, res) => {
    try {
        const { state, district, block, days = 30 } = req.query;
        
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));
        
        const weatherHistory = await Weather.find({
            state,
            district,
            block,
            date: { $gte: startDate }
        }).sort({ date: -1 });
        
        res.json({ success: true, weatherHistory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
