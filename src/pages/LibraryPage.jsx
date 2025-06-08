// src/pages/LibraryPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext'; // Verifica esta ruta: '../context/GameContext'
import GameItem from '../components/GameItem';
import { allAvailableGames } from '../data/mockGames'; // ¡IMPORTA la lista desde aquí!

export const LibraryPage = () => {
  const { library } = useContext(GameContext);
  const [libraryGamesData, setLibraryGamesData] = useState([]);

  useEffect(() => {
      // Filtra los datos completos de 'allAvailableGames' para obtener solo los que tienen ID en 'library'
      const gamesInLibrary = allAvailableGames.filter(game => library.includes(game.id));
      setLibraryGamesData(gamesInLibrary);
  }, [library]);

  return (
    <div className="library-page-container">
      <h1>Mi Biblioteca de Juegos</h1>
      {libraryGamesData.length === 0 ? (
        <p>Aún no tienes juegos en tu biblioteca. ¡Añade algunos desde la sección de juegos!</p>
      ) : (
        <div className="game-list game-gallery">
          {libraryGamesData.map((game) => (
            <GameItem key={game.id} game={game} showDownloadButton={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;