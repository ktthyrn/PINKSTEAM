// Home.jsx (Página principal de PinkSteam)
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useContext } from 'react';
import { GameContext } from "../contexts/GameContext";
import GameItem from '../components/GameItem';

const Home = () => {
  const navigate = useNavigate();
  const { library, addToLibrary } = useContext(GameContext);

  const games = [
    { id: 1, title: "The Witcher 3", image: "/games/witcher.jpg" },
    { id: 2, title: "Doom Eternal", image: "/games/doom.jpg" },
    { id: 3, title: "Cyberpunk 2077", image: "/games/cyberpunk.jpg" },
    { id: 4, title: "Minecraft", image: "/games/minecraft.jpg" },
    { id: 5, title: "Overwatch", image: "/games/overwatch.jpg" },
    { id: 6, title: "Hades", image: "/games/hades.jpg" },
    { id: 7, title: "Celeste", image: "/games/celeste.jpg" },
    { id: 8, title: "Hollow Knight", image: "/games/hollowknight.jpg" },
    { id: 9, title: "God of War", image: "/games/godofwar.jpg" },
    { id: 10, title: "Red Dead Redemption 2", image: "/games/reddead2.jpg" },
    { id: 11, title: "Stardew Valley", image: "/games/stardew.jpg" },
    { id: 12, title: "Valorant", image: "/games/valorant.jpg" },
    { id: 13, title: "Apex Legends", image: "/games/apex.jpg" },
    { id: 14, title: "Elden Ring", image: "/games/eldenring.jpg" },
    { id: 15, title: "Terraria", image: "/games/terraria.jpg" }
  ];

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <img src="/games/logowo.png" alt="logo" className="logo-img" />
          <h1 className="title">PinkSteam</h1>
        </div>
        <div className="header-buttons">
          <button className="btn library" onClick={() => navigate("/library")}>
            MI BIBLIOTECA
          </button>
          <button className="btn login" onClick={() => navigate("/login")}>
            INICIAR SESIÓN
          </button>
          <button className="btn register" onClick={() => navigate("/register")}>
            REGISTRARSE
          </button>
        </div>
      </header>

      <nav className="navbar">
      <button className="btn menu" onClick={() => navigate("/games")}>
          MENU
        </button>
        <span className="support">
          <i className="fa-solid fa-desktop"></i> ACERCA DE SOPORTE
        </span>
                <div className="game-context-test">
          <span>Biblioteca: **{library.length}** juegos</span>
          <button className="btn add-game-btn" onClick={() => addToLibrary(Math.floor(Math.random() * 1000) + 1)}>
            Añadir Test
          </button>
        </div>
        <input type="text" className="search-bar" placeholder="BUSCAR" />
      </nav>

      <main className="main-content">
        <h2 className="section-title">NUESTROS JUEGOS ...</h2>
        <div className="game-gallery">
        {games.map((game) => (
          <div
            key={game.id} // Siempre usa un ID único si lo tienes
            className="game-card-link" // Una nueva clase para estilos de cursor, etc.
            onClick={() => navigate(`/game/${game.id}`)} // ¡Hace el GameItem clicable!
          >
            <GameItem game={game} /> {/* Aquí no queremos showDownloadButton */}
          </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
