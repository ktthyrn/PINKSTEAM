import React from 'react';

function GameList({ games }) {
  return (
    <div className="game-list">
      {games.length > 0 ? (
        games.map((game) => (
          <div key={game.id} className="game-item">
            <h4>{game.title}</h4>
            <p>Type: {game.type}</p>
            <p>Genre: {game.genre}</p>
            <p>Platform: {game.platform}</p>
            <p>Rating: {game.rating}</p>
          </div>
        ))
      ) : (
        <p>No games found.</p>
      )}
    </div>
  );
}

export default GameList;