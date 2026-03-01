const express = require('express');
const router = express.Router();
const Farm = require('../models/Farm');

// Create farm
router.post('/', async (req, res) => {
    try {
        const farm = new Farm(req.body);
        await farm.save();
        res.status(201).json({ success: true, farm });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all farms for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const farms = await Farm.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json({ success: true, farms });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get farm by ID
router.get('/:id', async (req, res) => {
    try {
        const farm = await Farm.findById(req.params.id);
        if (!farm) {
            return res.status(404).json({ error: 'Farm not found' });
        }
        res.json({ success: true, farm });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update farm
router.put('/:id', async (req, res) => {
    try {
        const farm = await Farm.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!farm) {
            return res.status(404).json({ error: 'Farm not found' });
        }
        res.json({ success: true, farm });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete farm
router.delete('/:id', async (req, res) => {
    try {
        const farm = await Farm.findByIdAndDelete(req.params.id);
        if (!farm) {
            return res.status(404).json({ error: 'Farm not found' });
        }
        res.json({ success: true, message: 'Farm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
