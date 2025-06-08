// Home.jsx (Página principal de PinkSteam)
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  const games = [
    { title: "The Witcher 3", image: "/games/witcher.jpg" },
    { title: "Doom Eternal", image: "/games/doom.jpg" },
    { title: "Cyberpunk 2077", image: "/games/cyberpunk.jpg" },
    { title: "Minecraft", image: "/games/minecraft.jpg" },
    { title: "Overwatch", image: "/games/overwatch.jpg" },
    { title: "Hades", image: "/games/hades.jpg" },
    { title: "Celeste", image: "/games/celeste.jpg" },
    { title: "Hollow Knight", image: "/games/hollowknight.jpg" },
    { title: "God of War", image: "/games/godofwar.jpg" },
    { title: "Red Dead Redemption 2", image: "/games/reddead2.jpg" },
    { title: "Stardew Valley", image: "/games/stardew.jpg" },
    { title: "Valorant", image: "/games/valorant.jpg" },
    { title: "Apex Legends", image: "/games/apex.jpg" },
    { title: "Elden Ring", image: "/games/eldenring.jpg" },
    { title: "Terraria", image: "/games/terraria.jpg" }
  ];

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <img src="/games/logowo.png" alt="logo" className="logo-img" />
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

      <nav className="navbar">
      <button className="btn menu" onClick={() => navigate("/GamesPage")}>
          MENU
        </button>
        <span className="support">
          <i className="fa-solid fa-desktop"></i> ACERCA DE SOPORTE
        </span>
        <input type="text" className="search-bar" placeholder="BUSCAR" />
      </nav>

      <main className="main-content">
        <h2 className="section-title">NUESTROS JUEGOS ...</h2>
        <div className="game-gallery">
          {games.map((game, index) => (
            <div key={index} className="game-card">
              <img src={game.image} alt={game.title} className="game-image" />
              <p className="game-title">{game.title}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
