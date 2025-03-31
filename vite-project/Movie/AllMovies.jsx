import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Movie/Movielist.css"; // Import CSS for styling

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((response) => {
        const groupedMovies = response.data.reduce((acc, movie) => {
          acc[movie.category] = acc[movie.category] || [];
          acc[movie.category].push(movie);
          return acc;
        }, {});
        setCategories(groupedMovies);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className="container-fluid movies-container">
      <h2 className="text-center text-white mb-4">🎥 All Movies</h2>
      {Object.keys(categories).map((category) => (
        <div key={category} className="category-section">
          <h3 className="text-white category-title">{category}</h3>
          <div className="movies-row">
            <div className="movies-slider">
              {categories[category].map((movie) => (
                <div className="movie-card" key={movie._id}>
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <div className="movie-info">
                    <h5 className="movie-title">{movie.title}</h5>
                    <p className="movie-rating">⭐ {movie.avgRating}/5</p>
                    <Link to={`/movies/${movie._id}`} className="btn btn-outline-light">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
