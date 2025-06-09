// src/components/FilterMenu.js
import React, { useState } from 'react';
import '../styles/FilterMenu.css'; // Importa tus estilos CSS

const FilterMenu = ({
  tags,
  selectedTags,
  onTagSelection,
  onClearFilters,
  platforms,
  selectedPlatform,
  onPlatformChange,
  selectedPriceRange, // Recibe selectedPriceRange como prop para controlar el input
  onPriceChange,
  selectedPopularity, // AÑADIDO: Prop para la popularidad seleccionada
  onPopularityChange, // AÑADIDO: Prop para manejar el cambio de popularidad
  onTextFilterChange
}) => {
  const [dropdownValue, setDropdownValue] = useState('');
  // Usa selectedPriceRange de las props como valor inicial del input de rango de precio
  const [priceRange, setPriceRange] = useState(selectedPriceRange[1] || 100); 

  // Sincroniza el estado local de priceRange con el prop si cambia desde el padre
  React.useEffect(() => {
    setPriceRange(selectedPriceRange[1]);
  }, [selectedPriceRange]);


  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setDropdownValue(value);
    if (value && !selectedTags.includes(value)) {
      onTagSelection(value);
    }
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange(value);
    onPriceChange(0, value); // Filtra desde 0 hasta el precio máximo seleccionado
  };

  // Función para manejar el cambio en el filtro de popularidad
  const handlePopularityDropdownChange = (e) => {
    const value = parseInt(e.target.value, 10);
    onPopularityChange(value);
  };

  return (
    <div className="filter-menu">
      <h3>Filtrar Juegos</h3>

      {/* Text Filter Section */}
      <div className="filter-section text-filter-section">
        <input
          type="text"
          placeholder="🔍 Buscar juegos..."
          onChange={(e) => onTextFilterChange(e.target.value)}
          className="text-filter-input"
        />
      </div>

      {/* Tags Dropdown Section */}
      <div className="filter-section">
        <h4>Selecciona Etiquetas</h4>
        <select
          value={dropdownValue}
          onChange={handleDropdownChange}
          className="tags-dropdown"
        >
          <option value="">Selecciona una etiqueta</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <div className="selected-tags-container">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="selected-tag"
              onClick={() => onTagSelection(tag)} // Quitar etiqueta al hacer click
            >
              {tag} ✕
            </span>
          ))}
        </div>
      </div>

      {/* Platform Dropdown Section */}
      <div className="filter-section">
        <h4>Selecciona Plataforma</h4>
        <select
          value={selectedPlatform}
          onChange={(e) => onPlatformChange(e.target.value)}
          className="platform-dropdown"
        >
          <option value="">Todas las plataformas</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Section */}
      <div className="filter-section">
        <h4>Precio Máximo</h4>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={priceRange}
          onChange={handlePriceRangeChange}
          className="price-slider"
        />
        <div className="price-values">
          <span>Hasta: ${priceRange}</span>
        </div>
      </div>

      {/* Popularity Filter Section - AÑADIDO */}
      <div className="filter-section">
        <h4>Popularidad</h4>
        <select
          value={selectedPopularity}
          onChange={handlePopularityDropdownChange}
          className="popularity-dropdown"
        >
          <option value="0">Cualquiera</option>
          <option value="1">★☆☆☆☆ (1 estrella)</option>
          <option value="2">★★☆☆☆ (2 estrellas)</option>
          <option value="3">★★★☆☆ (3 estrellas)</option>
          <option value="4">★★★★☆ (4 estrellas)</option>
          <option value="5">★★★★★ (5 estrellas)</option>
        </select>
      </div>


      {/* Clear Filters Button */}
      <button className="clear-filters-button" onClick={onClearFilters}>
        Limpiar Filtros
      </button>
    </div>
  );
};

// AÑADIDO: Default props para las nuevas propiedades y las existentes
FilterMenu.defaultProps = {
  tags: [],
  platforms: [],
  selectedTags: [],
  selectedPlatform: '',
  selectedPriceRange: [0, 100], // Asegura un valor por defecto si no se pasa
  selectedPopularity: 0, // Valor por defecto
  onPopularityChange: () => {}, // Función vacía por defecto
  onTextFilterChange: () => {} // Función vacía por defecto
};

export default FilterMenu;
