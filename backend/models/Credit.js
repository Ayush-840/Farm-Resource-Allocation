const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    creditScore: {
        type: Number,
        required: true,
        min: 0,
        max: 1000
    },
    loanStatus: {
        type: String,
        enum: ['Eligible', 'Not Eligible', 'Pending'],
        default: 'Pending'
    },
    loanAmount: {
        type: Number,
        default: 0
    },
    interestRate: {
        type: Number,
        default: 0
    },
    creditAdvice: {
        type: String,
        default: ""
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
creditSchema.index({ userId: 1 });

module.exports = mongoose.model('Credit', creditSchema);
