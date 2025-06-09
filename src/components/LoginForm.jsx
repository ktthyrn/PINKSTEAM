// src/components/LoginForm.jsx
import React, { useState, useContext } from 'react'; // Importa useContext

import { AuthContext } from '../contexts/AuthContext'; // Importa AuthContext
import './../styles/auth.css'; // Asegúrate de que esta ruta sea correcta para tus estilos de formularios

const LoginForm = () => { // Quita { onLoginSuccess } de la declaración de props del componente
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para mostrar mensajes de error al usuario

    // Obtiene la función 'login' del AuthContext. Esta función actualizará el estado global de autenticación.
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto de recarga de la página
        setError(''); // Limpiar cualquier mensaje de error anterior

        // Validación básica de campos vacíos
        if (!email || !password) {
            setError('Todos los campos son obligatorios.');
            return; // Detiene la ejecución si los campos están vacíos
        }

        // --- LÓGICA DE INICIO DE SESIÓN (SIMULADA O CON BACKEND REAL) ---
        // Aquí es donde harías la llamada a tu API/backend para autenticar al usuario.
        // Por ahora, usamos una lógica simulada para que puedas probar la funcionalidad.
        try {
            // Simular un retraso de red o una operación de backend (ej. una petición fetch)
            await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo

            // *** REEMPLAZA ESTA LÓGICA CON TU CONEXIÓN REAL AL BACKEND ***
            // Ejemplo de validación simulada:
            if (email === 'test@example.com' && password === 'password123') {
                console.log('Inicio de sesión exitoso!');
                // Llama a la función 'login' del AuthContext para actualizar el estado global
                // Puedes pasar datos del usuario que obtengas de tu backend si lo deseas.
                login({ email: email, username: 'TestUser' }); // Ejemplo: pasa el email y un nombre de usuario
                // La redirección a la página principal ahora será manejada por LoginPage
                // a través de un useEffect que reacciona al cambio en el estado de isLoggedIn del AuthContext.
            } else {
                // Si las credenciales no coinciden con las simuladas
                setError('Correo electrónico o contraseña incorrectos.');
                console.log('Intento de inicio de sesión fallido.');
            }
        } catch (err) {
            // Manejo de errores si la llamada al backend falla (ej. problemas de red, servidor caído)
            setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            console.error('Error durante el inicio de sesión:', err);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Iniciar Sesión</h2>
            {/* Muestra el mensaje de error si existe */}
            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
                <label htmlFor="email">Correo electrónico</label> {/* Etiqueta para accesibilidad */}
                <input
                    type="email"
                    id="email" // ID único para el input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico" // Placeholder más descriptivo
                    required // Hace que el campo sea obligatorio
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Contraseña</label> {/* Etiqueta para accesibilidad */}
                <input
                    type="password"
                    id="password" // ID único para el input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña" // Placeholder más descriptivo
                    required // Hace que el campo sea obligatorio
                />
            </div>
            <button type="submit" className="btn submit-btn"> {/* Clases de botón más consistentes */}
                Iniciar Sesión
            </button>
        </form>
    );
};

// Ya NO necesitamos PropTypes para 'onLoginSuccess' ya que ya no es una prop de este componente.
LoginForm.propTypes = {
    // onLoginSuccess: PropTypes.func.isRequired, // <--- COMENTA O ELIMINA ESTA LÍNEA
};

export default LoginForm;
