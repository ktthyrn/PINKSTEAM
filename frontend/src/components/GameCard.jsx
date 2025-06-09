// src/components/GameCard.jsx
import React from "react";
import "../styles/home.css";

const GameCard = ({ image, title }) => (
  <div className="game-card">
    <img src={image} alt={title} className="game-image" />
  </div>
);

export default GameCard;
