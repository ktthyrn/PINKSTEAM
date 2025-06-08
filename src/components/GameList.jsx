// src/components/GameList.js
import React from 'react';
import '../styles/GameList.css'; // Import your CSS styles

// Receive activeFilters as a prop
function GameList({ games, activeFilters }) {
  if (games.length === 0) {
    return (
      <div className="game-list-empty">
        <p>No encontramos juegos con tus criterios.</p>
      </div>
    );
  }

  return (
    <div className="game-list-container">
      {games.map((game, index) => (
        game && game.title ? (
          <div key={game.id || index} className="game-list-item">
            {game.thumbnail && (
              <img src={game.thumbnail} alt={`${game.title} Thumbnail`} className="game-list-item-thumbnail" />
            )}
            <div className="game-list-item-details">
              <h3 className="game-list-item-title">{game.title}</h3>

              {/* Conditionally render Type based on activeFilters */}
              {!activeFilters.type && <p><strong>Tipo:</strong> {game.type || 'N/A'}</p>}

              {/* Conditionally render Genre based on activeFilters */}
              {!activeFilters.genre && <p><strong>Género:</strong> {game.genre || 'N/A'}</p>}

              {/* Conditionally render Platform based on activeFilters */}
              {!activeFilters.platform && <p><strong>Plataforma:</strong> {game.platform || 'N/A'}</p>}

              {/* Always show Price, Popularity, and Release Year */}
              <p><strong>Precio:</strong> ${game.price?.toFixed(2) || 'N/A'}</p>
              <p><strong>Popularidad:</strong> {game.popularity || 'N/A'} / 5</p>
              <p><strong>Año de lanzamiento:</strong> {game.releaseYear || 'N/A'}</p>
            </div>
          </div>
        ) : (
          <div key={index} className="game-list-item">
            <p>Invalid game data</p>
          </div>
        )
      ))}
    </div>
  );
}

export default GameList;