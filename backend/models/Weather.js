const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    block: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    rainfall: {
        type: Number,
        default: 0
    },
    rainProbability: {
        type: Number,
        default: 0
    },
    weatherImpact: {
        type: String,
        default: ""
    },
    forecast: [{
        date: Date,
        temperature: Number,
        humidity: Number,
        rainfall: Number,
        rainProbability: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
weatherSchema.index({ state: 1, district: 1, block: 1, date: -1 });

module.exports = mongoose.model('Weather', weatherSchema);
