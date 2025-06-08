import React, { useState } from 'react';
import FilterMenu from '../components/FilterMenu';
import GameList from '../components/GameList';
import '../styles/GameListPage.css';

const GamesPage = () => {
  const [filters, setFilters] = useState({ type: '', genre: '', platform: '' });
  const [games, setGames] = useState([
    { id: 1, title: 'The Witcher 3', type: 'RPG', genre: 'Fantasy', platform: 'PC', rating: 9.5 },
    { id: 2, title: 'Doom Eternal', type: 'Shooter', genre: 'Action', platform: 'PC', rating: 9.0 },
    { id: 3, title: 'Minecraft', type: 'Sandbox', genre: 'Adventure', platform: 'Console', rating: 8.5 },
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
        <GameList games={filteredGames} />
      </div>
    </div>
  );
};

export default GamesPage;