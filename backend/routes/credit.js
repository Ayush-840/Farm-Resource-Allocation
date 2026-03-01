const express = require('express');
const router = express.Router();
const Credit = require('../models/Credit');

// Create or update credit record
router.post('/', async (req, res) => {
    try {
        const { userId } = req.body;
        
        let credit = await Credit.findOne({ userId });
        
        if (credit) {
            // Update existing
            Object.assign(credit, req.body);
            credit.lastUpdated = new Date();
            await credit.save();
        } else {
            // Create new
            credit = new Credit(req.body);
            await credit.save();
        }
        
        res.json({ success: true, credit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get credit for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const credit = await Credit.findOne({ userId: req.params.userId });
        if (!credit) {
            return res.status(404).json({ error: 'Credit record not found' });
        }
        res.json({ success: true, credit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update credit
router.put('/:id', async (req, res) => {
    try {
        const credit = await Credit.findByIdAndUpdate(
            req.params.id,
            { ...req.body, lastUpdated: new Date() },
            { new: true, runValidators: true }
        );
        if (!credit) {
            return res.status(404).json({ error: 'Credit record not found' });
        }
        res.json({ success: true, credit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
