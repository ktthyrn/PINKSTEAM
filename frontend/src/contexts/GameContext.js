// src/contexts/GameContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

// 1. Crear el contexto
export const GameContext = createContext();

// 2. Crear el Provider (proveedor de estado)
export const GameProvider = ({ children }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [library, setLibrary] = useState([]); // Array of game objects
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch library from backend when user logs in
  useEffect(() => {
    const fetchLibrary = async () => {
      if (isLoggedIn && user && user.id) {
        setLoading(true);
        setError(null);
        try {
          const res = await axios.get(`http://localhost:5000/api/auth/games/user/${user.id}`);
          setLibrary(res.data);
        } catch (err) {
          setError('Error fetching user library');
        } finally {
          setLoading(false);
        }
      } else {
        setLibrary([]);
      }
    };
    fetchLibrary();
  }, [isLoggedIn, user]);

  // Add game to library in backend
  const addToLibrary = async (gameId) => {
    if (!user || !user.id) return;
    try {
      await axios.post(`http://localhost:5000/api/auth/games/user/${user.id}/add`, { game_id: gameId });
      // Refetch library after add
      const res = await axios.get(`http://localhost:5000/api/auth/games/user/${user.id}`);
      setLibrary(res.data);
    } catch (err) {
      setError('Error adding game to library');
    }
  };

  // Remove game from library in backend
  const removeFromLibrary = async (gameId) => {
    if (!user || !user.id) return;
    try {
      await axios.post(`http://localhost:5000/api/auth/games/user/${user.id}/remove`, { game_id: gameId });
      // Refetch library after remove
      const res = await axios.get(`http://localhost:5000/api/auth/games/user/${user.id}`);
      setLibrary(res.data);
    } catch (err) {
      setError('Error removing game from library');
    }
  };

  // 3. Exportar el contexto con los valores necesarios
  return (
    <GameContext.Provider value={{ library, addToLibrary, removeFromLibrary, loading, error }}>
      {children}
    </GameContext.Provider>
  );
};