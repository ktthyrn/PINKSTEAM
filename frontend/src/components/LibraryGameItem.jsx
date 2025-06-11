// src/components/LibraryGameItem.jsx
import React from 'react';
import PropTypes from 'prop-types'; // No olvides instalar: npm install prop-types
import '../styles/libraryGameItem.css'; // Crearemos este CSS en el siguiente paso

const LibraryGameItem = ({ game, onDownloadClick }) => {
    if (!game) {
        return null; // O un placeholder si el juego no existe
    }

    return (
        <div className="library-game-card">
            <img src={`${process.env.PUBLIC_URL}/games/${game.thumbnail_image}.jpg`} alt={game.title} className="library-game-image" />
            <div className="library-game-info">
                <h3 className="library-game-title">{game.title}</h3>
                {/* Puedes añadir más detalles aquí si los tienes en 'game' y quieres mostrarlos */}
                {/* <p className="library-game-status">Estado: Descargado</p> */}
                {/* <p className="library-game-last-played">Última vez jugado: Hace 2 días</p> */}
            </div>
            <button
                className="btn library-download-btn"
                onClick={() => onDownloadClick(game.id)}
            >
                Descargar
            </button>
        </div>
    );
};

LibraryGameItem.propTypes = {
    game: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        // Agrega más propTypes si tu objeto game tiene otras propiedades como description, etc.
    }).isRequired,
    onDownloadClick: PropTypes.func.isRequired,
};

export default LibraryGameItem;