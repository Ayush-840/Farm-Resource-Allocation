const mongoose = require('mongoose');

const resourceTrackingSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    waterUsage: {
        totalAvailable: Number,
        used: Number,
        remaining: Number
    },
    fertilizerUsage: {
        type: String,
        quantity: Number,
        cost: Number
    },
    laborHours: {
        type: Number,
        default: 0
    },
    expenses: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
resourceTrackingSchema.index({ userId: 1, farmId: 1, date: -1 });

module.exports = mongoose.model('ResourceTracking', resourceTrackingSchema);
