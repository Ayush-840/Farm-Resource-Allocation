const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
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
    activityType: {
        type: String,
        enum: ['planting', 'irrigation', 'fertilization', 'harvesting', 'pest_control', 'soil_testing', 'other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cropId: {
        type: String,
        default: ""
    },
    cropName: {
        type: String,
        default: ""
    },
    waterUsed: {
        type: Number,
        default: 0
    },
    fertilizerUsed: {
        type: String,
        default: ""
    },
    cost: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
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
activitySchema.index({ userId: 1, farmId: 1, date: -1 });

module.exports = mongoose.model('Activity', activitySchema);
