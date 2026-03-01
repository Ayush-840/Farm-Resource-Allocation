const express = require('express');
const router = express.Router();
const MarketPrice = require('../models/MarketPrice');

// Create or update market price
router.post('/', async (req, res) => {
    try {
        const { state, district, cropId } = req.body;
        
        // Check if price exists for today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let marketPrice = await MarketPrice.findOne({
            state,
            district,
            cropId,
            date: { $gte: today }
        });
        
        if (marketPrice) {
            // Update existing
            if (!marketPrice.priceHistory) {
                marketPrice.priceHistory = [];
            }
            marketPrice.priceHistory.push({
                date: new Date(),
                price: marketPrice.currentPrice
            });
            Object.assign(marketPrice, req.body);
            await marketPrice.save();
        } else {
            // Create new
            marketPrice = new MarketPrice(req.body);
            await marketPrice.save();
        }
        
        res.json({ success: true, marketPrice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get market prices by location
router.get('/location', async (req, res) => {
    try {
        const { state, district, cropId } = req.query;
        
        const query = { state, district };
        if (cropId) query.cropId = cropId;
        
        const prices = await MarketPrice.find(query)
            .sort({ date: -1 })
            .limit(10);
        
        res.json({ success: true, prices });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get latest price for a crop
router.get('/latest', async (req, res) => {
    try {
        const { state, district, cropId } = req.query;
        
        const price = await MarketPrice.findOne({
            state,
            district,
            cropId
        }).sort({ date: -1 });
        
        if (!price) {
            return res.status(404).json({ error: 'Price data not found' });
        }
        
        res.json({ success: true, price });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
