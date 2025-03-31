import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(`https://downflixia.onrender.com/api/movies/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
        setError("Failed to load movie details");
        setLoading(false);
      });
  }, [id]);

  const handleRateMovie = () => {
    if (rating < 1 || rating > 5) {
      alert("Please select a valid rating between 1 and 5");
      return;
    }

    axios
      .post(`https://downflixia.onrender.com/api/rate-movie/${id}`, { rating })
      .then((response) => {
        setSubmitted(true);
        setMovie((prevMovie) => ({
          ...prevMovie,
          avgRating: response.data.avgRating,
        }));
      })
      .catch((error) => {
        console.error("Error submitting rating:", error);
        alert("Failed to submit rating");
      });
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-danger">{error}</div>;

  return (
    <div 
      className="container-fluid d-flex align-items-center justify-content-center text-white" 
      style={{
        backgroundImage: "url('https://artbreederpublic-shortlived.s3.amazonaws.com/30d/imgs/aa2958a249854fc7a08b6f91.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "4rem",
        borderRadius: "10px",
        boxShadow: "0px 0px 20px rgba(0,0,0,0.5)"
      }}
    >
      <div className="container p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "10px" }}>
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={movie.poster}
              alt={movie.title}
              className="img-fluid rounded shadow-lg mb-3"
              style={{ maxHeight: "450px", objectFit: "cover", border: "3px solid white" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold text-warning">{movie.title}</h2>
            <p className="text-light">{movie.category}</p>
            <p><strong>Description:</strong> {movie.description}</p>
            <p><strong>Rating:</strong> ⭐ {movie.avgRating}/5</p>
            <div className="d-flex gap-2 mt-3">
              <a href={movie.watchLink} className="btn btn-primary px-4 shadow-sm">🎬 Watch Now</a>
              <a href={movie.downloadLink} className="btn btn-success px-4 shadow-sm">⬇️ Download</a>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <h4 className="fw-bold text-warning">Rate this Movie</h4>
          <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
            <select
              className="form-select w-auto"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value="0">Select Rating</option>
              <option value="1">⭐ 1 - Poor</option>
              <option value="2">⭐⭐ 2 - Fair</option>
              <option value="3">⭐⭐⭐ 3 - Good</option>
              <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
            </select>
            <button className="btn btn-warning" onClick={handleRateMovie}>
              {submitted ? "✅ Submitted" : "Submit Rating"}
            </button>
          </div>
          {submitted && <p className="text-success mt-2">Thank you for your rating! 🎉</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
