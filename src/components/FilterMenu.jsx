// src/components/FilterMenu.js
import React from 'react';
import '../styles/FilterMenu.css'; // Import your CSS styles

const FilterMenu = ({ filters, onFilterChange, types, genres, platforms }) => {
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleClearFilters = () => {
    onFilterChange({ type: '', genre: '', platform: '' });
  };

  return (
    <div className="filter-menu">


      <div className="filter-groups-container"> {/* NEW: Wrapper for filter groups */}
        <div className="filter-group">
          <label htmlFor="type-filter">Tipo:</label>
          <div className="filter-select-wrapper">
            <select
              id="type-filter"
              name="type"
              value={filters.type}
              onChange={handleSelectChange}
            >
              <option value="">Todos los tipos</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="genre-filter">Género:</label>
          <div className="filter-select-wrapper">
            <select
              id="genre-filter"
              name="genre"
              value={filters.genre}
              onChange={handleSelectChange}
            >
              <option value="">Todos los géneros</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="platform-filter">Plataforma:</label>
          <div className="filter-select-wrapper">
            <select
              id="platform-filter"
              name="platform"
              value={filters.platform}
              onChange={handleSelectChange}
            >
              <option value="">Todas las plataformas</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="clear-filters-button" onClick={handleClearFilters}>
        Limpiar Filtros
      </button>
      </div> {/* END: Wrapper for filter groups */}


    </div>
  );
};

export default FilterMenu;