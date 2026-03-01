const express = require('express');
const router = express.Router();
const Subsidy = require('../models/Subsidy');

// Create subsidy scheme
router.post('/', async (req, res) => {
    try {
        const subsidy = new Subsidy(req.body);
        await subsidy.save();
        res.status(201).json({ success: true, subsidy });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all active subsidies
router.get('/', async (req, res) => {
    try {
        const { state, district } = req.query;
        
        const query = { status: 'active' };
        if (state && state !== 'All') {
            query.$or = [
                { state: 'All' },
                { state: state }
            ];
        }
        if (district && district !== 'All') {
            query.$or = [
                ...(query.$or || []),
                { district: 'All' },
                { district: district }
            ];
        }
        
        const subsidies = await Subsidy.find(query).sort({ createdAt: -1 });
        res.json({ success: true, subsidies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get subsidies matching farm profile
router.get('/match', async (req, res) => {
    try {
        const { state, district, landSize, cropTypes, soilType } = req.query;
        
        const subsidies = await Subsidy.find({
            status: 'active',
            $or: [
                { state: 'All' },
                { state: state }
            ]
        });
        
        // Filter by eligibility criteria
        const matched = subsidies.filter(subsidy => {
            const criteria = subsidy.eligibilityCriteria;
            if (!criteria) return true;
            
            if (criteria.landSizeMin && landSize < criteria.landSizeMin) return false;
            if (criteria.landSizeMax && landSize > criteria.landSizeMax) return false;
            if (criteria.cropTypes && criteria.cropTypes.length > 0) {
                const cropMatch = cropTypes ? criteria.cropTypes.some(ct => cropTypes.includes(ct)) : true;
                if (!cropMatch) return false;
            }
            if (criteria.soilTypes && criteria.soilTypes.length > 0) {
                if (!criteria.soilTypes.includes(soilType)) return false;
            }
            return true;
        });
        
        res.json({ success: true, subsidies: matched });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get subsidy by ID
router.get('/:id', async (req, res) => {
    try {
        const subsidy = await Subsidy.findById(req.params.id);
        if (!subsidy) {
            return res.status(404).json({ error: 'Subsidy not found' });
        }
        res.json({ success: true, subsidy });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
