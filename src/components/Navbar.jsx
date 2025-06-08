// src/components/Navbar.jsx
import React from "react";
import "../styles/home.css";

const Navbar = () => (
  <nav className="navbar">
    <span className="menu">MENÚ</span>
    <span className="support">
      <i className="fa-solid fa-desktop"></i> ACERCA DE SOPORTE
    </span>
    <input type="text" className="search-bar" placeholder="BUSCAR" />
  </nav>
);

export default Navbar;
