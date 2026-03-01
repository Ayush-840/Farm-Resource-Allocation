const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    village: {
        type: String,
        default: ""
    },
    landSize: {
        type: Number,
        required: true,
        min: 0.5
    },
    soilType: {
        type: String,
        enum: ['loamy', 'sandy', 'clay'],
        required: true
    },
    soilPh: {
        type: Number,
        required: false,
        default: 6.5,
        min: 4,
        max: 9
    },
    waterAvailable: {
        type: Number,
        required: true,
        min: 0
    },
    totalBudget: {
        type: Number,
        required: true,
        min: 0
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Farm', farmSchema);
