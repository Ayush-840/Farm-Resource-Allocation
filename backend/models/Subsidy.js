const mongoose = require('mongoose');

const subsidySchema = new mongoose.Schema({
    schemeName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: "All"
    },
    district: {
        type: String,
        default: "All"
    },
    eligibilityCriteria: {
        landSizeMin: Number,
        landSizeMax: Number,
        cropTypes: [String],
        soilTypes: [String]
    },
    benefits: {
        type: String,
        required: true
    },
    applicationLink: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Subsidy', subsidySchema);
