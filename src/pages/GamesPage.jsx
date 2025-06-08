import React, { useState } from 'react';
import FilterMenu from '../components/FilterMenu';
import GameList from '../components/GameList';
import '../styles/GameListPage.css';

const GamesPage = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(''); // State for platform filter
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]); // State for price filter
  const [selectedPopularity, setSelectedPopularity] = useState(0); // State for popularity filter
  const [games, setGames] = useState([
    {
      id: 1,
      title: "The Witcher 3",
      tags: ["RPG", "Fantasy", "PC", "PS4", "Xbox One", "Switch"],
      platform: "PC, PS4, Xbox One, Switch",
      rating: 9.7,
      price: 29.99,
      popularity: 5,
      releaseYear: 2015,
      thumbnail: "/games/witcher.jpg"
    },
    {
      id: 2,
      title: "Doom Eternal",
      tags: ["FPS", "Action", "PC", "PS4", "Xbox One", "Switch"],
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
      tags: ["RPG", "Sci-Fi", "PC", "PS5", "Xbox Series X"],
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
      tags: ["Sandbox", "Survival", "Building", "Multi"],
      platform: "Multi",
      rating: 9.2,
      price: 26.99,
      popularity: 5,
      releaseYear: 2011,
      thumbnail: "/games/minecraft.jpg"
    },
    {
      id: 5,
      title: "Overwatch",
      tags: ["FPS", "Team-based Shooter", "PC", "PS4", "Xbox One", "Switch"],
      platform: "PC, PS4, Xbox One, Switch",
      rating: 8.5,
      price: 0.00,
      popularity: 3,
      releaseYear: 2016,
      thumbnail: "/games/overwatch.jpg"
    },
    {
      id: 6,
      title: "Hades",
      tags: ["Roguelike", "Action-RPG", "PC", "Switch", "PS5", "Xbox Series X"],
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
      tags: ["Platformer", "Adventure", "PC", "PS4", "Xbox One", "Switch"],
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
      tags: ["Metroidvania", "Action-Adventure", "PC", "PS4", "Xbox One", "Switch"],
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
      tags: ["Action-Adventure", "Mythology", "PS4", "PC"],
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
      tags: ["Action-Adventure", "Western", "PS4", "Xbox One", "PC"],
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
      tags: ["Simulation", "Life Sim", "Farming", "Multi"],
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
      tags: ["FPS", "Tactical Shooter", "PC"],
      platform: "PC",
      rating: 8.7,
      price: 0.00,
      popularity: 4,
      releaseYear: 2020,
      thumbnail: "/games/valorant.jpg"
    },
    {
      id: 13,
      title: "Apex Legends",
      tags: ["FPS", "Battle Royale", "PC", "PS4", "Xbox One", "Switch"],
      platform: "PC, PS4, Xbox One, Switch",
      rating: 8.3,
      price: 0.00,
      popularity: 3,
      releaseYear: 2019,
      thumbnail: "/games/apex.jpg"
    },
    {
      id: 14,
      title: "Elden Ring",
      tags: ["RPG", "Action-RPG", "Fantasy", "PC", "PS5", "Xbox Series X"],
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
      tags: ["Sandbox", "Adventure", "Building", "Multi"],
      platform: "Multi",
      rating: 9.0,
      price: 9.99,
      popularity: 4,
      releaseYear: 2011,
      thumbnail: "/games/terraria.jpg"
    }
    // Add more games as needed
  ]);

  const handleTagSelection = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform); // Update the selected platform
  };

  const handlePriceChange = (min, max) => {
    setSelectedPriceRange([min, max]); // Update the selected price range
  };

  const handlePopularityChange = (popularity) => {
    setSelectedPopularity(popularity); // Update the selected popularity
  };

  const handleClearFilters = () => {
    setSelectedTags([]); // Clear all selected tags
    setSelectedPlatform(''); // Clear the selected platform
    setSelectedPriceRange([0, 100]); // Clear the selected price range
    setSelectedPopularity(0); // Clear the selected popularity
  };

  const filteredGames = games.filter((game) =>
    (selectedTags.length === 0 || selectedTags.every((tag) => game.tags.includes(tag))) &&
    (selectedPlatform === '' || game.platform.includes(selectedPlatform)) &&
    (game.price >= selectedPriceRange[0] && game.price <= selectedPriceRange[1]) && // Filter by price range
    (selectedPopularity === 0 || game.popularity === selectedPopularity) // Filter by popularity
  );

  const allTags = [...new Set(games.flatMap((game) => game.tags))];
  const allPlatforms = [...new Set(games.flatMap((game) => game.platform.split(', ')))];

  return (
    <div className="game-list-page">
      <h1>Buscar y Filtrar Juegos</h1>
      <div className="content-wrapper">
        <FilterMenu
          tags={allTags}
          selectedTags={selectedTags}
          onTagSelection={handleTagSelection}
          onClearFilters={handleClearFilters}
          selectedPlatform={selectedPlatform}
          onPlatformChange={handlePlatformChange}
          platforms={allPlatforms} // Pass the unique platforms to FilterMenu
          selectedPriceRange={selectedPriceRange}
          onPriceChange={handlePriceChange}
          selectedPopularity={selectedPopularity}
          onPopularityChange={handlePopularityChange}
          games={games}
        />
        <GameList games={filteredGames} />
      </div>
    </div>
  );
};

export default GamesPage;