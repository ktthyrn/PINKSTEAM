// src/pages/LibraryPage.jsx
import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import LibraryGameItem from '../components/LibraryGameItem';
import '../styles/libraryPage.css';

const LibraryPage = () => {
    const { library, loading, error } = useContext(GameContext);

    const handleDownloadClick = (gameId) => {
        const gameToDownload = library.find(game => game.id === gameId);
        if (gameToDownload) {
            alert(`¡Iniciando la descarga/juego de "${gameToDownload.title}"!`);
            console.log(`Descargando/jugando: ${gameToDownload.title} (ID: ${gameId})`);
        }
    };

    return (
        <div className="library-page-container">
            <header className="library-header">
                <h1 className="library-title">Mi Biblioteca de Juegos</h1>
            </header>
            <main className="library-content">
                {loading ? (
                    <p>Cargando tu biblioteca...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : library.length === 0 ? (
                    <p className="empty-library-message">Tu biblioteca está vacía. Añade algunos juegos desde la página principal.</p>
                ) : (
                    <div className="library-games-list">
                        {library.map(game => (
                            <LibraryGameItem
                                key={game.id}
                                game={game}
                                onDownloadClick={handleDownloadClick}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LibraryPage;