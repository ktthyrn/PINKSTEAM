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
  onPlatformChange
}) => {
  const [dropdownValue, setDropdownValue] = useState('');

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setDropdownValue(value);
    if (value && !selectedTags.includes(value)) {
      onTagSelection(value);
    }
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