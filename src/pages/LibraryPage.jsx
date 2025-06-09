// src/pages/LibraryPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../contexts/GameContext'; // Asegúrate de la ruta correcta a tu GameContext
import { allAvailableGames } from '../data/mockGames'; // Para obtener los detalles completos de los juegos
import LibraryGameItem from '../components/LibraryGameItem'; // ¡Importa el nuevo componente!
import '../styles/libraryPage.css'; // Tus estilos para la página de la biblioteca

const LibraryPage = () => {
    const { library } = useContext(GameContext); // Solo necesitamos 'library' (los IDs)
    const [libraryGamesDetails, setLibraryGamesDetails] = useState([]);

    useEffect(() => {
        // Filtrar y obtener los detalles completos de los juegos en la biblioteca del usuario
        const filteredGames = allAvailableGames.filter(game => library.includes(game.id));
        setLibraryGamesDetails(filteredGames);
    }, [library]); // Se vuelve a ejecutar cada vez que cambia la 'library' en el contexto

    const handleDownloadClick = (gameId) => {
        // Lógica para simular la descarga/juego
        const gameToDownload = libraryGamesDetails.find(game => game.id === gameId);
        if (gameToDownload) {
            alert(`¡Iniciando la descarga/juego de "${gameToDownload.title}"!`);
            console.log(`Descargando/jugando: ${gameToDownload.title} (ID: ${gameId})`);
            // Aquí podrías añadir más lógica: cambiar estado del juego, etc.
        }
    };

    return (
        <div className="library-page-container">
            <header className="library-header">
                <h1 className="library-title">Mi Biblioteca de Juegos</h1>
            </header>

            <main className="library-content">
                {libraryGamesDetails.length === 0 ? (
                    <p className="empty-library-message">Tu biblioteca está vacía. Añade algunos juegos desde la página principal.</p>
                ) : (
                    <div className="library-games-list"> {/* Nuevo contenedor para las tarjetas horizontales */}
                        {libraryGamesDetails.map(game => (
                            <LibraryGameItem
                                key={game.id}
                                game={game}
                                onDownloadClick={handleDownloadClick}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Puedes añadir un footer si lo necesitas */}
            {/* <footer className="library-footer">
                <p>&copy; 2023 PinkSteam. Todos los derechos reservados.</p>
            </footer> */}
        </div>
    );
};

export default LibraryPage;