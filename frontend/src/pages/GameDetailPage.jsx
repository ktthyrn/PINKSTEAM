// src/pages/GameDetailPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext'; // Asegúrate de que la ruta sea correcta aquí
import { allAvailableGames } from '../data/mockGames'; // Fuente de datos temporal

import '../styles/gameDetailPage.css'; // Tus estilos actuales para esta página

export const GameDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { library, addToLibrary } = useContext(GameContext);

    const [game, setGame] = useState(null);
    const [isAddedToLibrary, setIsAddedToLibrary] = useState(false);

    useEffect(() => {
        const gameIdNum = parseInt(id);
        const foundGame = allAvailableGames.find(g => g.id === gameIdNum);

        if (foundGame) {
            setGame(foundGame);
            setIsAddedToLibrary(library.includes(gameIdNum));
        } else {
            // Si el juego no se encuentra, redirige a Home o a una página de error
            navigate('/'); // Redirigir a Home por ahora
        }
    }, [id, library, navigate]);

    // La función que te daba la advertencia "no-unused-vars"
    const handleDownloadOrAddToLibrary = () => {
        if (!game) return;

        if (!isAddedToLibrary) {
            addToLibrary(game.id);
            setIsAddedToLibrary(true);
            alert(`¡"${game.title}" ha sido añadido a tu biblioteca!`);
        } else {
            alert(`¡Simulando la descarga de "${game.title}"! (Ya está en tu biblioteca)`);
            console.log(`Iniciando descarga/lanzamiento de: ${game.title} (ID: ${game.id})`);
        }
    };

    if (!game) {
        return <div className="game-detail-container loading">Cargando detalles del juego...</div>;
    }

    return (
        <div className="game-detail-container">
            <header className="detail-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Volver
                </button>
                <h1>{game.title}</h1>
            </header>

            <div className="game-content-layout"> {/* Nuevo contenedor principal para el layout */}
                {/* Sección Superior: Imagen Grande / Video Placeholder y Botón */}
                <div className="top-section">
                    <div className="game-media">
                        {/* Aquí puedes poner un video real o simplemente la imagen grande como principal */}
                        <img src={game.image} alt={game.title} className="game-main-image" />
                        {/* Si tuvieras un video, sería algo como esto:
                        <iframe
                            width="100%"
                            height="315"
                            src="URL_DEL_VIDEO_DE_YOUTUBE" // Ejemplo: https://www.youtube.com/embed/ejhV07W4QdI
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Game Trailer"
                            className="game-video"
                        ></iframe>
                        */}
                    </div>
                    <div className="game-actions">
                        <button
                            className={`btn ${isAddedToLibrary ? 'download-btn' : 'add-to-library-btn'}`}
                            onClick={handleDownloadOrAddToLibrary} // <--- Aquí se utiliza la función
                        >
                            {isAddedToLibrary ? 'Descargar / Jugar' : 'Añadir a la Biblioteca'}
                        </button>
                        {/* Aquí podrías añadir más botones como "Añadir a lista de deseados", etc. */}
                        {/* <button className="btn wishlist-btn">Añadir a lista de deseados</button> */}
                    </div>
                </div>

                {/* Sección de Descripción y Detalles (columna de la izquierda en el ejemplo de Steam) */}
                <div className="game-details-main">
                    <h2 className="section-subtitle">Acerca de este juego</h2>
                    <p className="game-description">{game.description || "Descripción no disponible."}</p>

                    {/* BLOQUES DE INFORMACIÓN DINÁMICA - ESTO ES LO QUE QUEREMOS MOSTRAR */}
                    <div className="game-info-blocks">
                        <p><strong>Género:</strong> {game.genre || "No disponible"}</p>
                        <p><strong>Desarrollador:</strong> {game.developer || "No disponible"}</p>
                        <p><strong>Fecha de lanzamiento:</strong> {game.releaseDate || "No disponible"}</p>
                    </div>

                    {/* ETIQUETAS DINÁMICAS */}
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

                {/* Podrías añadir una sección de "Reseñas" o "Requisitos del Sistema" aquí abajo si quieres */}
                {/*
                <div className="additional-sections">
                    <h2 className="section-subtitle">Requisitos del Sistema</h2>
                    <p>Mínimos: ... Recomendados: ...</p>
                </div>
                */}
            </div>
        </div>
    );
};

export default GameDetailPage;