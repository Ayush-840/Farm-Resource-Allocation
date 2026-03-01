const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    cropId: {
        type: String,
        required: true
    },
    cropName: {
        type: String,
        required: true
    },
    apmcName: {
        type: String,
        default: ""
    },
    currentPrice: {
        type: Number,
        required: true
    },
    forecastPrice: {
        type: Number,
        default: 0
    },
    transportCost: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    priceHistory: [{
        date: Date,
        price: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
marketPriceSchema.index({ state: 1, district: 1, cropId: 1, date: -1 });

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
