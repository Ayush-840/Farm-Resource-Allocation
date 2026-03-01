const express = require('express');
const router = express.Router();
const CropRecommendation = require('../models/CropRecommendation');

// Create crop recommendation
router.post('/', async (req, res) => {
    try {
        const recommendation = new CropRecommendation(req.body);
        await recommendation.save();
        res.status(201).json({ success: true, recommendation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recommendations for a farm
router.get('/farm/:farmId', async (req, res) => {
    try {
        const recommendations = await CropRecommendation.find({ farmId: req.params.farmId })
            .sort({ createdAt: -1 });
        res.json({ success: true, recommendations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recommendations for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const recommendations = await CropRecommendation.find({ userId: req.params.userId })
            .sort({ createdAt: -1 });
        res.json({ success: true, recommendations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get latest recommendation for a farm
router.get('/farm/:farmId/latest', async (req, res) => {
    try {
        const recommendation = await CropRecommendation.findOne({ farmId: req.params.farmId })
            .sort({ createdAt: -1 });
        if (!recommendation) {
            return res.status(404).json({ error: 'No recommendation found' });
        }
        res.json({ success: true, recommendation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recommendation by ID
router.get('/:id', async (req, res) => {
    try {
        const recommendation = await CropRecommendation.findById(req.params.id);
        if (!recommendation) {
            return res.status(404).json({ error: 'Recommendation not found' });
        }
        res.json({ success: true, recommendation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
