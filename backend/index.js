const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const movieRoutes = require('./routes/movie');
const connectDB = require('./auth/db'); // Import MongoDB connection

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB(); // Calls the function from db.js

// Routes
app.use('/api', movieRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
