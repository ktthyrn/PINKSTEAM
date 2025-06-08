// src/components/FilterMenu.js
import React, { useState } from 'react';
import '../styles/FilterMenu.css'; // Import your CSS styles

const FilterMenu = ({
  tags,
  selectedTags,
  onTagSelection,
  onClearFilters,
  platforms,
  selectedPlatform,
  onPlatformChange,
  onPriceChange
}) => {
  const [dropdownValue, setDropdownValue] = useState('');
  const [priceRange, setPriceRange] = useState(100);

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
    onPriceChange(0, value); // Always filter from 0 to the selected maximum price
  };

  return (
    <div className="filter-menu">
      <h3>Filtrar Juegos</h3>

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
              onClick={() => onTagSelection(tag)} // Remove tag on click
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

      {/* Clear Filters Button */}
      <button className="clear-filters-button" onClick={onClearFilters}>
        Limpiar Filtros
      </button>
    </div>
  );
};

FilterMenu.defaultProps = {
  tags: [],
  platforms: [],
  selectedTags: [],
  selectedPlatform: '',
};

export default FilterMenu;