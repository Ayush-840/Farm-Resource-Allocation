const mongoose = require('mongoose');

const soilHealthSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    phLevel: {
        type: Number,
        required: true,
        min: 4,
        max: 9
    },
    phStatus: {
        type: String,
        enum: ['Acidic', 'Neutral', 'Alkaline'],
        required: true
    },
    nutrients: {
        nitrogen: {
            type: Number,
            default: 0
        },
        phosphorus: {
            type: Number,
            default: 0
        },
        potassium: {
            type: Number,
            default: 0
        }
    },
    nutrientAlert: {
        type: String,
        default: ""
    },
    fertilizerSchedule: [{
        date: Date,
        fertilizerType: String,
        quantity: Number,
        method: String
    }],
    soilAdvice: {
        type: String,
        default: ""
    },
    testDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
soilHealthSchema.index({ userId: 1, farmId: 1, testDate: -1 });

module.exports = mongoose.model('SoilHealth', soilHealthSchema);
