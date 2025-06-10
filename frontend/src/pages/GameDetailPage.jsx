// src/pages/GameDetailPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';
import '../styles/gameDetailPage.css';

export const GameDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { library, addToLibrary, removeFromLibrary, loading } = useContext(GameContext);
    const [game, setGame] = useState(null);
    const [isAddedToLibrary, setIsAddedToLibrary] = useState(false);

    useEffect(() => {
        const gameIdNum = parseInt(id);
        // Try to find the game in the user's library first
        let foundGame = library.find(g => (g.game_id || g.id) === gameIdNum);
        if (!foundGame && library.length > 0) {
            // If not found, try to fetch from backend (optional: you could fetch all games from backend if needed)
            // For now, just show not found
            setGame(null);
            setIsAddedToLibrary(false);
            return;
        }
        setGame({
            id: foundGame.game_id || foundGame.id,
            title: foundGame.name || foundGame.title,
            image: foundGame.thumbnail_image || foundGame.image,
            ...foundGame
        });
        setIsAddedToLibrary(true);
    }, [id, library]);

    const handleDownloadOrAddToLibrary = async () => {
        if (!game) return;
        if (!isAddedToLibrary) {
            await addToLibrary(game.id);
            setIsAddedToLibrary(true);
            alert(`¡"${game.title}" ha sido añadido a tu biblioteca!`);
        } else {
            await removeFromLibrary(game.id);
            setIsAddedToLibrary(false);
            alert(`¡"${game.title}" ha sido eliminado de tu biblioteca!`);
        }
    };

    if (loading) return <div className="game-detail-container loading">Cargando detalles del juego...</div>;
    if (!game) return <div className="game-detail-container loading">Juego no encontrado en tu biblioteca.</div>;

    return (
        <div className="game-detail-container">
            <header className="detail-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
                <h1>{game.title}</h1>
            </header>
            <div className="game-content-layout">
                <div className="top-section">
                    <div className="game-media">
                        <img src={game.image} alt={game.title} className="game-main-image" />
                    </div>
                    <div className="game-actions">
                        <button
                            className={`btn ${isAddedToLibrary ? 'download-btn' : 'add-to-library-btn'}`}
                            onClick={handleDownloadOrAddToLibrary}
                        >
                            {isAddedToLibrary ? 'Eliminar de la Biblioteca' : 'Añadir a la Biblioteca'}
                        </button>
                    </div>
                </div>
                <div className="game-details-main">
                    <h2 className="section-subtitle">Acerca de este juego</h2>
                    <p className="game-description">{game.description || "Descripción no disponible."}</p>
                    <div className="game-info-blocks">
                        <p><strong>Género:</strong> {game.genre || "No disponible"}</p>
                        <p><strong>Desarrollador:</strong> {game.developer || "No disponible"}</p>
                        <p><strong>Fecha de lanzamiento:</strong> {game.releaseDate || game.release_date || "No disponible"}</p>
                    </div>
                    <div className="game-tags">
                        {game.tags && game.tags.length > 0 ? (
                            game.tags.map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                            ))
                        ) : (
                            <span className="tag">Sin etiquetas</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetailPage;