import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap"; // ✅ Import Modal, Button, and Form
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [adminKeyInput, setAdminKeyInput] = useState("");

  const handleAdminAccess = () => {
    setShowModal(true);
  };

  const handleAdminKeySubmit = () => {
    const storedKey = import.meta.env.VITE_ADMIN_KEY || "";
    if (adminKeyInput.trim() === storedKey.trim()) {
      localStorage.setItem("adminKey", adminKeyInput);
      setShowModal(false);
      setTimeout(() => {
        window.location.href = "/add-movie"; // Force reload for immediate effect
      }, 100);
    } else {
      alert("❌ Incorrect Admin Key! Access Denied.");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">🎬 DownFlixia</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/movies">All Movies</Link>
              </li>

              <li className="nav-item">
                <button className="nav-link btn btn-link text-warning" onClick={handleAdminAccess}>
                  ➕ Add Movie (Admin)
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Access Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="adminKey">
              <Form.Label>Enter Admin Key:</Form.Label>
              <Form.Control
                type="password"
                value={adminKeyInput}
                onChange={(e) => setAdminKeyInput(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAdminKeySubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
