// src/contexts/GameContext.js
import { createContext, useState } from 'react';

// 1. Crear el contexto
export const GameContext = createContext();

// 2. Crear el Provider (proveedor de estado)
export const GameProvider = ({ children }) => {
  const [library, setLibrary] = useState([]); // Estado de la biblioteca

  // Función para añadir juegos a la biblioteca
  const addToLibrary = (gameId) => {
    setLibrary([...library, gameId]);
  };

  // 3. Exportar el contexto con los valores necesarios
  return (
    <GameContext.Provider value={{ library, addToLibrary }}>
      {children}
    </GameContext.Provider>
  );
};