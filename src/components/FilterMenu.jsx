import React from 'react';

function FilterMenu({ filters, onFilterChange, types, genres, platforms }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="filter-menu">
      <h3>Filters</h3>
      <div>
        <label>Type:</label>
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">All</option>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Genre:</label>
        <select name="genre" value={filters.genre} onChange={handleChange}>
          <option value="">All</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Platform:</label>
        <select name="platform" value={filters.platform} onChange={handleChange}>
          <option value="">All</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterMenu;