// LoginForm.jsx
import React, { useState } from "react";
import "./../styles/auth.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: conectar con backend
    if (!email || !password) {
      alert("Todos los campos son obligatorios");
      return;
    }
    console.log("Iniciando sesión con:", { email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="auth-button">Iniciar Sesión</button> {/* Añadida clase auth-button */}
    </form>
  );
};

export default LoginForm;