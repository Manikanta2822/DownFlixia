import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://downflixia.onrender.com/api/movies")
      .then(response => {
        const moviesData = response.data;
        setMovies(moviesData);
        setTrendingMovies(moviesData.sort((a, b) => b.avgRating - a.avgRating).slice(0, 5));
      })
      .catch(error => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div 
      className="container-fluid d-flex flex-column align-items-center justify-content-center text-white" 
      style={{ 
        backgroundImage: "url('https://artbreederpublic-shortlived.s3.amazonaws.com/30d/imgs/cbd2e209975d47c494efb7d8.jpeg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        width: "100vw", 
        minHeight: "100vh", 
        padding: "20px" 
      }}
    >
      <h1 className="text-center fw-bold mt-4">🎬 Welcome to DownFlixia</h1>
      <p className="lead text-center">Discover & stream the highest-rated movies instantly!</p>
      
      <div className="container mt-4">
        <h3 className="text-center">🔥 Trending Movies</h3>
        <div id="trendingMoviesCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {trendingMovies.map((movie, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={movie._id}
                onClick={() => navigate(`/movies/${movie._id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={movie.poster}
                  className="d-block w-100 rounded shadow-lg"
                  alt={movie.title}
                  style={{ height: "550px", objectFit: "cover", borderRadius: "10px" }}
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 p-3 rounded">
                  <h5 className="fw-bold text-light">{movie.title}</h5>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#trendingMoviesCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#trendingMoviesCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      
      <h2 className="text-center mt-5">🎥 All Movies</h2>
      <div className="row justify-content-center w-100 mt-4">
        {movies.map(movie => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={movie._id}>
            <div className="card shadow-lg border-0 text-white" style={{ backgroundColor: "#1c1c1c", borderRadius: "10px" }}>
              <img src={movie.poster} className="card-img-top" alt={movie.title} style={{ height: "350px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-light">{movie.title}</h5>
                <p className="card-text">⭐ {movie.avgRating}/5</p>
                <Link to={`/movies/${movie._id}`} className="btn btn-outline-light">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
