// src/pages/Home.jsx
import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { GameContext } from "../contexts/GameContext";
import { AuthContext } from '../contexts/AuthContext'; 

import GameItem from '../components/GameItem';

const Home = () => {
  const navigate = useNavigate();
  const { library} = useContext(GameContext); // removeFromLibrary ya no es necesario aquí
  const { isLoggedIn, user, logout } = useContext(AuthContext); 

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
          {isLoggedIn ? (
            <>
              {/* CAMBIO 1: Reordenar y ajustar el mensaje de bienvenida y biblioteca */}
              <button className="btn library" onClick={() => navigate("/library")}>
                MI BIBLIOTECA
              </button>
              <span className="welcome-message">Hola, {user ? user.username : 'Usuario'}</span>
              <button className="btn logout" onClick={logout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <button className="btn games" onClick={() => navigate("/games")}> 
                JUEGOS
              </button>
              <button className="btn login" onClick={() => navigate("/login")}>
                INICIAR SESIÓN
              </button>
              <button className="btn register" onClick={() => navigate("/register")}>
                REGISTRARSE
              </button>
            </>
          )}
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
          {/* CAMBIO 2: Eliminar "Añadir Test" y los asteriscos */}
          <span>Biblioteca: {library.length} juegos</span> 
        </div>
        <input type="text" className="search-bar" placeholder="BUSCAR" />
      </nav>

      <main className="main-content">
        <h2 className="section-title">NUESTROS JUEGOS ...</h2>
        <div className="game-gallery">
          {games.map((game) => (
            <div
              key={game.id} 
              className="game-card-link" 
              onClick={() => navigate(`/game/${game.id}`)} 
            >
              <GameItem game={game} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
