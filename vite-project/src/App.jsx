import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../Navigation/Navigation";
import Home from "./Home/Home";
import MovieDetails from "../Movie/Movie";
import AddMovie from "../Movie/Addmovie";
import MoviesList from "../Movie/AllMovies"; // Component to show all movies

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/add-movie" element={<AddMovie />} />
      </Routes>
    </Router>
  );
};

export default App;
