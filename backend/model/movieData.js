const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    poster: { type: String, required: true }, // URL to movie poster
    description: { type: String, required: true },
    watchLink: { type: String, required: true }, // Link to watch movie
    downloadLink: { type: String, required: true }, // Link to download movie
    category: { type: String, required: true },
    ratings: [{ type: Number, min: 1, max: 5 }], // Array of ratings (1-5 scale)
    avgRating: { type: Number, default: 0 } // Calculated dynamically
});

// Method to update average rating
movieSchema.methods.calculateAverageRating = function () {
    if (this.ratings.length === 0) {
        this.avgRating = 0;
    } else {
        const sum = this.ratings.reduce((a, b) => a + b, 0);
        this.avgRating = sum / this.ratings.length;
    }
};

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
