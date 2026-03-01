const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URI || 'mongodb://localhost:27017/agrioptima',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error(`⚠️  Server will continue but database features may not work.`);
        console.error(`💡 Make sure MongoDB is running or check your MONGODB_URI in .env file`);
        // Don't exit - allow server to run without DB for testing
        // process.exit(1);
        return null;
    }
};

module.exports = connectDB;
