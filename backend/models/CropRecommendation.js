const mongoose = require('mongoose');

const cropRecommendationSchema = new mongoose.Schema({
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    primaryRecommendation: {
        cropId: String,
        cropName: String,
        yield: Number,
        revenue: Number,
        cost: Number,
        profit: Number,
        waterEfficiency: Number,
        irrigationType: String
    },
    alternatives: [{
        cropId: String,
        cropName: String,
        yield: Number,
        revenue: Number,
        cost: Number,
        profit: Number,
        waterEfficiency: Number
    }],
    resourceAllocation: {
        landAllocation: [{
            cropId: String,
            cropName: String,
            acres: Number
        }],
        waterAllocation: [{
            cropId: String,
            cropName: String,
            liters: Number
        }]
    },
    aiReasoning: {
        type: String,
        default: ""
    },
    sustainabilityScore: {
        type: Number,
        default: 0
    },
    carbonFootprint: {
        type: Number,
        default: 0
    },
    groundwaterImpact: {
        type: Number,
        default: 0
    },
    organicBoost: {
        type: Number,
        default: 0
    },
    riskLevel: {
        type: String,
        enum: ['Low', 'Moderate', 'High'],
        default: 'Moderate'
    },
    stabilityScore: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CropRecommendation', cropRecommendationSchema);
