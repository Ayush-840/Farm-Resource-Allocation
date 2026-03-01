const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    cropId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    seasons: [{
        type: String,
        enum: ['Kharif', 'Rabi', 'Zaid']
    }],
    waterReq: {
        type: Number,
        required: true
    },
    yieldPerAcre: {
        type: Number,
        required: true
    },
    estPrice: {
        type: Number,
        required: true
    },
    soilTypes: [{
        type: String,
        enum: ['loamy', 'sandy', 'clay']
    }],
    phMin: {
        type: Number,
        required: true
    },
    phMax: {
        type: Number,
        required: true
    },
    resilience: {
        type: Number,
        default: 0.5
    },
    carbonPerKg: {
        type: Number,
        default: 0
    },
    groundwaterImpact: {
        type: Number,
        default: 0
    },
    organicBonus: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Crop', cropSchema);
