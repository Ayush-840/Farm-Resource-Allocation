const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get or create user
router.post('/create-or-get', async (req, res) => {
    try {
        const { phone, name, role } = req.body;
        
        let user = await User.findOne({ phone });
        
        if (!user) {
            user = new User({ phone, name, role });
            await user.save();
        } else {
            user.lastLogin = new Date();
            await user.save();
        }
        
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
