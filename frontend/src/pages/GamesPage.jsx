import React, { useState, useEffect } from 'react'; // Asegúrate de que useState y useEffect estén importados
import axios from 'axios';
import FilterMenu from '../components/FilterMenu.jsx';
import GameList from '../components/GameList';
import '../styles/GameListPage.css';

const GamesPage = () => {
  // Estado para los filtros (ajustado para usar estados individuales)
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]); // Rango de precios inicial
  const [selectedPopularity, setSelectedPopularity] = useState(0); // Popularidad inicial (0 o null si no se filtra por popularidad)
  const [textFilter, setTextFilter] = useState(""); // Filtro de texto inicial

  // Lista de juegos (la mantienes como estaba, usando useState una vez para inicializarla)
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/games');
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  // Las funciones de manejo de cambios ya estaban correctas, solo necesitaban los estados declarados
  const handleTagSelection = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const handlePriceChange = (min, max) => {
    setSelectedPriceRange([min, max]);
  };

  const handlePopularityChange = (popularity) => {
    setSelectedPopularity(popularity);
  };

  const handleTextFilterChange = (text) => {
    setTextFilter(text.toLowerCase());
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setSelectedPlatform('');
    setSelectedPriceRange([0, 100]);
    setSelectedPopularity(0);
    setTextFilter("");
  };

  // Lógica de filtrado
  const filteredGames = games.filter((game) =>
    (selectedTags.length === 0 || selectedTags.every((tag) => game.tags.includes(tag))) &&
    (selectedPlatform === '' || game.platform.includes(selectedPlatform)) &&
    (game.price >= selectedPriceRange[0] && game.price <= selectedPriceRange[1]) &&
    (selectedPopularity === 0 || game.popularity === selectedPopularity) &&
    (textFilter === "" || game.title.toLowerCase().includes(textFilter))
  );

  // Extracción de tags y plataformas únicas para los filtros
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
          platforms={allPlatforms}
          selectedPriceRange={selectedPriceRange}
          onPriceChange={handlePriceChange}
          selectedPopularity={selectedPopularity}
          onPopularityChange={handlePopularityChange}
          // 'games' no es estrictamente necesario pasarlo a FilterMenu a menos que FilterMenu lo use para generar sus propias opciones dinámicamente,
          // pero si ya le pasas allTags y allPlatforms, no hay problema.
          // games={games} 
          onTextFilterChange={handleTextFilterChange}
        />
        <GameList games={filteredGames} />
      </div>
    </div>
  );
};

export default GamesPage;
