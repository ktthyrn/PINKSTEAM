import React, { useState } from 'react';
import FilterMenu from '../components/FilterMenu';
import GameList from '../components/GameList';
import '../styles/GameListPage.css';

const GamesPage = () => {
  const [filters, setFilters] = useState({ type: '', genre: '', platform: '' });
  const [games, setGames] = useState([

    {
        id: 1,
        title: "The Witcher 3",
        type: "RPG",
        genre: "Fantasy",
        platform: "PC, PS4, Xbox One, Switch",
        rating: 9.7,
        price: 29.99,
        popularity: 5, // 1-5 scale
        releaseYear: 2015,
        thumbnail: "/games/witcher.jpg"
      },
      {
        id: 2,
        title: "Doom Eternal",
        type: "FPS",
        genre: "Action",
        platform: "PC, PS4, Xbox One, Switch",
        rating: 9.0,
        price: 39.99,
        popularity: 4,
        releaseYear: 2020,
        thumbnail: "/games/doom.jpg"
      },
      {
        id: 3,
        title: "Cyberpunk 2077",
        type: "RPG",
        genre: "Sci-Fi",
        platform: "PC, PS5, Xbox Series X",
        rating: 7.5,
        price: 59.99,
        popularity: 4,
        releaseYear: 2020,
        thumbnail: "/games/cyberpunk.jpg"
      },
      {
        id: 4,
        title: "Minecraft",
        type: "Sandbox",
        genre: "Survival, Building",
        platform: "Multi",
        rating: 9.2,
        price: 26.99,
        popularity: 5,
        releaseYear: 2011, // Original release
        thumbnail: "/games/minecraft.jpg"
      },
      {
        id: 5,
        title: "Overwatch",
        type: "FPS",
        genre: "Team-based Shooter",
        platform: "PC, PS4, Xbox One, Switch",
        rating: 8.5,
        price: 0.00, // Free-to-play
        popularity: 3,
        releaseYear: 2016,
        thumbnail: "/games/overwatch.jpg"
      },
      {
        id: 6,
        title: "Hades",
        type: "Roguelike",
        genre: "Action-RPG",
        platform: "PC, Switch, PS5, Xbox Series X",
        rating: 9.3,
        price: 24.99,
        popularity: 4,
        releaseYear: 2020,
        thumbnail: "/games/hades.jpg"
      },
      {
        id: 7,
        title: "Celeste",
        type: "Platformer",
        genre: "Adventure",
        platform: "PC, PS4, Xbox One, Switch",
        rating: 9.4,
        price: 19.99,
        popularity: 3,
        releaseYear: 2018,
        thumbnail: "/games/celeste.jpg"
      },
      {
        id: 8,
        title: "Hollow Knight",
        type: "Metroidvania",
        genre: "Action-Adventure",
        platform: "PC, PS4, Xbox One, Switch",
        rating: 9.6,
        price: 14.99,
        popularity: 4,
        releaseYear: 2017,
        thumbnail: "/games/hollowknight.jpg"
      },
      {
        id: 9,
        title: "God of War",
        type: "Action-Adventure",
        genre: "Mythology",
        platform: "PS4, PC",
        rating: 9.5,
        price: 19.99,
        popularity: 5,
        releaseYear: 2018,
        thumbnail: "/games/godofwar.jpg"
      },
      {
        id: 10,
        title: "Red Dead Redemption 2",
        type: "Action-Adventure",
        genre: "Western",
        platform: "PS4, Xbox One, PC",
        rating: 9.8,
        price: 39.99,
        popularity: 5,
        releaseYear: 2018,
        thumbnail: "/games/reddead2.jpg"
      },
      {
        id: 11,
        title: "Stardew Valley",
        type: "Simulation",
        genre: "Life Sim, Farming",
        platform: "Multi",
        rating: 9.1,
        price: 14.99,
        popularity: 4,
        releaseYear: 2016,
        thumbnail: "/games/stardew.jpg"
      },
      {
        id: 12,
        title: "Valorant",
        type: "FPS",
        genre: "Tactical Shooter",
        platform: "PC",
        rating: 8.7,
        price: 0.00, // Free-to-play
        popularity: 4,
        releaseYear: 2020,
        thumbnail: "/games/valorant.jpg"
      },
      {
        id: 13,
        title: "Apex Legends",
        type: "FPS",
        genre: "Battle Royale",
        platform: "PC, PS4, Xbox One, Switch",
        rating: 8.3,
        price: 0.00, // Free-to-play
        popularity: 3,
        releaseYear: 2019,
        thumbnail: "/games/apex.jpg"
      },
      {
        id: 14,
        title: "Elden Ring",
        type: "RPG",
        genre: "Action-RPG, Fantasy",
        platform: "PC, PS5, Xbox Series X",
        rating: 9.6,
        price: 59.99,
        popularity: 5,
        releaseYear: 2022,
        thumbnail: "/games/eldenring.jpg"
      },
      {
        id: 15,
        title: "Terraria",
        type: "Sandbox",
        genre: "Adventure, Building",
        platform: "Multi",
        rating: 9.0,
        price: 9.99,
        popularity: 4,
        releaseYear: 2011,
        thumbnail: "/games/terraria.jpg"
      }
  // Add more games as needed
  ]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const filteredGames = games.filter((game) => {
    return (
      (!filters.type || game.type === filters.type) &&
      (!filters.genre || game.genre === filters.genre) &&
      (!filters.platform || game.platform === filters.platform)
    );
  });

  return (
    <div className="game-list-page">
      <h1>Search and Filter Games</h1>
      <div className="content-wrapper">
        <FilterMenu
          filters={filters}
          onFilterChange={handleFilterChange}
          types={[...new Set(games.map((game) => game.type))]}
          genres={[...new Set(games.map((game) => game.genre))]}
          platforms={[...new Set(games.map((game) => game.platform))]}
        />
        <GameList games={filteredGames} activeFilters={filters} />
      </div>
    </div>
  );
};

export default GamesPage;