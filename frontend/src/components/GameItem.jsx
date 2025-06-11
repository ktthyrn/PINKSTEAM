// src/components/GameItem.jsx
import React from 'react';
import DownloadButton from './DownloadButton'; // Importa el botón de descarga

// Este componente puede recibir un objeto de juego completo, no solo el ID
export const GameItem = ({ game, showDownloadButton = false }) => {
  if (!game) return null; // Si no hay juego, no renderizar nada

  // Lógica de simulación de descarga (podría estar en un contexto superior)
  const handleDownloadClick = (gameId) => {
    // Aquí se manejaría la lógica de descarga real o simulación
    // Por ahora, el DownloadButton ya tiene una simulación básica
    console.log(`Lógica de descarga activada para: ${game.title} (ID: ${gameId})`);
  };

  return (
    <div className="game-card"> {/* Reutiliza tu clase game-card */}
      <img src={game.image|| '/default-game.jpg'} alt={game.title} className="game-image" />
      <p className="game-title">{game.title}</p>
      {/* Condicionalmente muestra el botón de descarga si es necesario */}
      {showDownloadButton && (
        <DownloadButton gameId={game.id} onDownload={handleDownloadClick} />
      )}
    </div>
  );
};

export default GameItem;