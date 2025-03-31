const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 5000, // Reduce timeout to 5 sec
            socketTimeoutMS: 45000, // Increase socket timeout
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB Connection Failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
