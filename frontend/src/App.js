// src/App.js
import React from "react";
// Ya no necesitamos importar BrowserRouter como Router aquí si ya está en index.js
import { Routes, Route } from "react-router-dom"; 

// Importa tus componentes de página
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GamesPage from "./pages/GamesPage";
import LibraryPage from "./pages/LibraryPage";
import GameDetailPage from "./pages/GameDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/game/:id" element={<GameDetailPage />} />
    </Routes>
  );
}

export default App;