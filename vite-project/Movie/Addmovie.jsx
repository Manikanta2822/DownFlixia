import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({
    title: "",
    poster: "",
    description: "",
    watchLink: "",
    downloadLink: "",
    category: "",
  });

  useEffect(() => {
    const checkAdminAccess = () => {
      const adminKey = localStorage.getItem("adminKey");
      const storedKey = import.meta.env.VITE_ADMIN_KEY || "";

      if (adminKey === storedKey) {
        setIsAdmin(true);
      } else {
        navigate("/"); // Redirect unauthorized users
      }
      setLoading(false);
    };

    checkAdminAccess();
  }, [navigate]);

  if (loading) {
    return <h3 className="text-center mt-4 text-primary">⏳ Checking Authorization...</h3>;
  }

  if (!isAdmin) {
    return <h3 className="text-center mt-4 text-danger">⚠ Unauthorized Access</h3>;
  }

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/add-movie", movie, {
        headers: { "x-admin-key": localStorage.getItem("adminKey") },
      });
      alert("✅ Movie added successfully!");
      navigate("/movies");
    } catch (error) {
      console.error("❌ Error adding movie:", error);
    }
  };

  return (
    <div 
      className="container-fluid d-flex flex-column align-items-center justify-content-center text-dark" 
      style={{ 
        backgroundImage: "url('https://artbreederpublic-shortlived.s3.amazonaws.com/30d/imgs/c8787dc1c28d4cfd904d402d.jpeg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        width: "100vw", 
        minHeight: "100vh", 
        padding: "20px", 
        filter: "brightness(70%)" 
      }}
    >
      <div className="container p-4 rounded shadow-lg border" style={{ backgroundColor: "#ffebcd", opacity: 1.0 }}>
        <h2 className="text-center text-dark fw-bold">➕ Add Movie</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <input type="text" name="title" placeholder="Title" className="form-control mb-3 text-dark fw-bold" onChange={handleChange} required />
          <input type="text" name="poster" placeholder="Poster URL" className="form-control mb-3 text-dark fw-bold" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" className="form-control mb-3 text-dark fw-bold" onChange={handleChange} required />
          <input type="text" name="watchLink" placeholder="Watch Link" className="form-control mb-3 text-dark fw-bold" onChange={handleChange} required />
          <input type="text" name="downloadLink" placeholder="Download Link" className="form-control mb-3 text-dark fw-bold" onChange={handleChange} required />
          <input type="text" name="category" placeholder="Category" className="form-control mb-3 text-dark fw-bold" onChange={handleChange} required />
          <button type="submit" className="btn btn-danger w-100">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
