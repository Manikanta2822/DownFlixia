const express = require('express');
const router = express.Router();
const Movie = require('../model/movieData');
require('dotenv').config();

// Middleware to check admin access
const isAdmin = (req, res, next) => {
    if (req.headers['x-admin-key'] === process.env.ADMIN_KEY) {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};

// ✅ Add Movie API (Admin Only)
router.post('/add-movie', isAdmin, async (req, res) => {
    try {
        const { title, poster, description, watchLink, downloadLink, category } = req.body;
        const newMovie = new Movie({ title, poster, description, watchLink, downloadLink, category });
        await newMovie.save();
        res.json({ message: 'Movie added successfully!', movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Fetch All Movies API (For All Users)
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Fetch Single Movie by ID API (For All Users)
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ Rate Movie API (Users Can Submit Ratings)
router.post('/rate-movie/:id', async (req, res) => {
    try {
        const { rating } = req.body;
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        movie.ratings.push(rating);
        movie.calculateAverageRating();
        await movie.save();

        res.json({ message: 'Rating submitted successfully!', avgRating: movie.avgRating });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
