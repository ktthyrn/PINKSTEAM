// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate here
import "../styles/home.css";

const Navbar = () => { // Change to a functional component to use hooks
  const navigate = useNavigate(); // Call the hook inside the component

  return (
    <nav className="navbar">
      {/* Use the button with the onClick handler */}
      <button className="btn menu" onClick={() => navigate("/GamesPage")}>
          MENÚ
        </button>
      <span className="support">
        <i className="fa-solid fa-desktop"></i> ACERCA DE SOPORTE
      </span>
      <input type="text" className="search-bar" placeholder="BUSCAR" />
      {/* This Link to /games is redundant if you're already navigating with the menu button.
          You might want to remove it or use it for a different purpose. */}
    </nav>
  );
};

export default Navbar;