const express = require('express');
const router = express.Router();
const ResourceTracking = require('../models/ResourceTracking');

// Create resource tracking entry
router.post('/', async (req, res) => {
    try {
        const tracking = new ResourceTracking(req.body);
        await tracking.save();
        res.status(201).json({ success: true, tracking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get resource tracking for a farm
router.get('/farm/:farmId', async (req, res) => {
    try {
        const { limit = 30, skip = 0 } = req.query;
        const tracking = await ResourceTracking.find({ farmId: req.params.farmId })
            .sort({ date: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));
        res.json({ success: true, tracking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get latest resource tracking for a farm
router.get('/farm/:farmId/latest', async (req, res) => {
    try {
        const tracking = await ResourceTracking.findOne({ farmId: req.params.farmId })
            .sort({ date: -1 });
        if (!tracking) {
            return res.status(404).json({ error: 'No tracking data found' });
        }
        res.json({ success: true, tracking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update resource tracking
router.put('/:id', async (req, res) => {
    try {
        const tracking = await ResourceTracking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!tracking) {
            return res.status(404).json({ error: 'Tracking not found' });
        }
        res.json({ success: true, tracking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
