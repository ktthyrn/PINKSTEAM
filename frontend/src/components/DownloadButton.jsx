// src/components/DownloadButton.jsx
import React from 'react';

export const DownloadButton = ({ gameId, onDownload }) => {
  const handleDownload = () => {
    // Aquí podrías simular la descarga
    console.log(`Simulando descarga para el juego con ID: ${gameId}`);
    if (onDownload) {
      onDownload(gameId); // Llama a la lógica de descarga que venga de la prop
    }
    alert(`¡Descargando ${gameId}! (Simulado)`); // Mensaje simple de confirmación
    // Opcional: mostrar un modal de progreso, etc.
  };

  return (
    <button className="btn download-btn" onClick={handleDownload}>
      Descargar
    </button>
  );
};

export default DownloadButton;