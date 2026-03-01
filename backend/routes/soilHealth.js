const express = require('express');
const router = express.Router();
const SoilHealth = require('../models/SoilHealth');

// Create soil health record
router.post('/', async (req, res) => {
    try {
        const soilHealth = new SoilHealth(req.body);
        await soilHealth.save();
        res.status(201).json({ success: true, soilHealth });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get soil health for a farm
router.get('/farm/:farmId', async (req, res) => {
    try {
        const soilHealth = await SoilHealth.find({ farmId: req.params.farmId })
            .sort({ testDate: -1 });
        res.json({ success: true, soilHealth });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get latest soil health for a farm
router.get('/farm/:farmId/latest', async (req, res) => {
    try {
        const soilHealth = await SoilHealth.findOne({ farmId: req.params.farmId })
            .sort({ testDate: -1 });
        if (!soilHealth) {
            return res.status(404).json({ error: 'No soil health data found' });
        }
        res.json({ success: true, soilHealth });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update soil health
router.put('/:id', async (req, res) => {
    try {
        const soilHealth = await SoilHealth.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!soilHealth) {
            return res.status(404).json({ error: 'Soil health record not found' });
        }
        res.json({ success: true, soilHealth });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
