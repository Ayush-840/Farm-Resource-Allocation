const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// Create activity
router.post('/', async (req, res) => {
    try {
        const activity = new Activity(req.body);
        await activity.save();
        res.status(201).json({ success: true, activity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get activities for a farm
router.get('/farm/:farmId', async (req, res) => {
    try {
        const { limit = 50, skip = 0 } = req.query;
        const activities = await Activity.find({ farmId: req.params.farmId })
            .sort({ date: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get activities for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const { limit = 50, skip = 0 } = req.query;
        const activities = await Activity.find({ userId: req.params.userId })
            .sort({ date: -1 })
            .limit(parseInt(limit))
            .skip(parseInt(skip));
        res.json({ success: true, activities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get activity by ID
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ success: true, activity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update activity
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ success: true, activity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete activity
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json({ success: true, message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
