// RegisterForm.jsx
import React, { useState } from "react";
import "./../styles/auth.css"; // Mantén la importación del CSS

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      alert("Completa todos los campos");
      return;
    }
    // TODO: conectar con backend
    console.log("Registrando usuario:", form);
  };

  return (
    <form className="auth-form" onSubmit={handleRegister}> {/* Usa la clase auth-form */}
      <h2>Crear Cuenta</h2> {/* Mantiene el h2 con estilos de auth.css */}
      <input
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
      />
      <button type="submit" className="auth-button">Registrarse</button> {/* Añadida clase auth-button */}
    </form>
  );
};

export default RegisterForm;