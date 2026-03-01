const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const OTP = require('../models/OTP');
const User = require('../models/User');

// Twilio initialization (optional)
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

// Endpoint to send OTP
router.post('/send-otp', async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone || phone.length !== 10) {
            return res.status(400).json({ error: 'Valid 10-digit phone number is required.' });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

        // Delete any existing OTP for this phone
        await OTP.deleteMany({ phone });

        // Store OTP in database
        const otpRecord = new OTP({
            phone,
            otp,
            expiresAt
        });
        await otpRecord.save();

        // Send OTP via Twilio if configured
        if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
            try {
                await twilioClient.messages.create({
                    body: `Your AgriOptima login code is: ${otp}. Do not share this code. Valid for 5 minutes.`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: `+91${phone}`
                });
                console.log(`💬 REAL SMS SENT to +91${phone}`);
            } catch (err) {
                console.error(`❌ TWILIO ERROR:`, err);
                // Continue even if Twilio fails
            }
        } else {
            // Simulate sending OTP by printing to console
            console.log(`\n========================================`);
            console.log(`📲 SMS SIMULATION (Twilio not configured)`);
            console.log(`To: +91 ${phone}`);
            console.log(`Message: Your AgriOptima login code is: ${otp}. Do not share this code.`);
            console.log(`========================================\n`);
        }

        res.json({ 
            success: true, 
            message: 'OTP sent successfully.',
            expiresIn: 300 // 5 minutes in seconds
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
    }
});

// Endpoint to verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({ error: 'Phone number and OTP are required.' });
        }

        // Find OTP in database
        const otpRecord = await OTP.findOne({ 
            phone, 
            verified: false,
            expiresAt: { $gt: new Date() } // Not expired
        });

        // For hackathon/demo: Allow any OTP if no record found (bypass for testing)
        // In production, you would require: if (!otpRecord || otpRecord.otp !== otp)
        if (otpRecord && otpRecord.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
        }

        // Mark OTP as verified (if it exists)
        if (otpRecord) {
            otpRecord.verified = true;
            await otpRecord.save();
        }

        // Generate token (in production, use JWT)
        const token = "agri-token-" + Math.random().toString(36).substring(2) + Date.now().toString(36);

        // Create or get user in database
        let user = await User.findOne({ phone });
        
        if (!user) {
            // Create new user
            user = new User({ 
                phone, 
                name: "Farmer User", 
                role: "Farmer" 
            });
            await user.save();
            console.log(`✅ New user created: ${phone}`);
        } else {
            // Update last login
            user.lastLogin = new Date();
            await user.save();
            console.log(`✅ User logged in: ${phone}`);
        }

        res.json({
            success: true,
            token: token,
            user: {
                _id: user._id,
                phone: user.phone,
                name: user.name,
                role: user.role,
                language: user.language,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Failed to verify OTP. Please try again.' });
    }
});

// Endpoint to check if user exists
router.get('/check-user/:phone', async (req, res) => {
    try {
        const { phone } = req.params;
        const user = await User.findOne({ phone });
        
        if (user) {
            res.json({ 
                success: true, 
                exists: true,
                user: {
                    _id: user._id,
                    phone: user.phone,
                    name: user.name,
                    role: user.role
                }
            });
        } else {
            res.json({ 
                success: true, 
                exists: false 
            });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ error: 'Failed to check user.' });
    }
});

// Endpoint to resend OTP
router.post('/resend-otp', async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone || phone.length !== 10) {
            return res.status(400).json({ error: 'Valid 10-digit phone number is required.' });
        }

        // Delete existing OTPs for this phone
        await OTP.deleteMany({ phone });

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Store new OTP
        const otpRecord = new OTP({
            phone,
            otp,
            expiresAt
        });
        await otpRecord.save();

        // Send OTP via Twilio if configured
        if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
            try {
                await twilioClient.messages.create({
                    body: `Your AgriOptima login code is: ${otp}. Do not share this code. Valid for 5 minutes.`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: `+91${phone}`
                });
                console.log(`💬 RESEND SMS SENT to +91${phone}`);
            } catch (err) {
                console.error(`❌ TWILIO ERROR:`, err);
            }
        } else {
            console.log(`\n========================================`);
            console.log(`📲 RESEND SMS SIMULATION`);
            console.log(`To: +91 ${phone}`);
            console.log(`Message: Your AgriOptima login code is: ${otp}.`);
            console.log(`========================================\n`);
        }

        res.json({ 
            success: true, 
            message: 'OTP resent successfully.',
            expiresIn: 300
        });
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ error: 'Failed to resend OTP. Please try again.' });
    }
});

module.exports = router;
