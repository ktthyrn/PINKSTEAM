// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.svg" alt="logo" className="logo-img" />
        <h1 className="title">PinkSteam</h1>
      </div>
      <div className="header-buttons">
        <button className="btn login" onClick={() => navigate("/login")}>
          INICIAR SESIÓN
        </button>
        <button className="btn register" onClick={() => navigate("/register")}>
          REGISTRARSE
        </button>
      </div>
    </header>
  );
};

export default Header;
