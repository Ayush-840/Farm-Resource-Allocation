const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// Initialize crops from data.js
router.post('/initialize', async (req, res) => {
    try {
        // This would typically be called once to seed the database
        const cropData = req.body.crops || [];
        
        for (const crop of cropData) {
            await Crop.findOneAndUpdate(
                { cropId: crop.id },
                {
                    cropId: crop.id,
                    name: crop.name,
                    seasons: crop.seasons,
                    waterReq: crop.water_req,
                    yieldPerAcre: crop.yield_per_acre,
                    estPrice: crop.est_price,
                    soilTypes: crop.soil_types,
                    phMin: crop.ph_min,
                    phMax: crop.ph_max,
                    resilience: crop.resilience,
                    carbonPerKg: crop.carbon_per_kg,
                    groundwaterImpact: crop.groundwater_impact,
                    organicBonus: crop.organic_bonus
                },
                { upsert: true, new: true }
            );
        }
        
        res.json({ success: true, message: 'Crops initialized successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all crops
router.get('/', async (req, res) => {
    try {
        const crops = await Crop.find().sort({ name: 1 });
        res.json({ success: true, crops });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get crop by ID
router.get('/:id', async (req, res) => {
    try {
        const crop = await Crop.findOne({ cropId: req.params.id });
        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }
        res.json({ success: true, crop });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get crops by season
router.get('/season/:season', async (req, res) => {
    try {
        const crops = await Crop.find({ seasons: req.params.season });
        res.json({ success: true, crops });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
