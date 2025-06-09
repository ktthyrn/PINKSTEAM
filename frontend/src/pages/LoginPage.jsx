// src/pages/LoginPage.jsx
import React, { useContext, useEffect } from "react"; // <--- Añade useContext y useEffect
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthContext } from '../contexts/AuthContext'; // <--- Importa AuthContext
import "../styles/auth.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext); // <--- Obtén isLoggedIn del contexto

    // Este useEffect se ejecutará cada vez que isLoggedIn cambie
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/"); // Redirige a la página principal si el usuario ya está logueado
        }
    }, [isLoggedIn, navigate]); // Depende de isLoggedIn y navigate

    // YA NO NECESITAMOS handleLoginSuccess aquí, la redirección es por el useEffect
    // const handleLoginSuccess = () => { navigate("/"); };

    const loginPageStyle = {
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/snopyy.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        color: "#3d1f2d",
    };

    // Si el usuario ya está logueado, no renderizamos el formulario, simplemente redirigimos
    if (isLoggedIn) {
        return null; // O un spinner de carga
    }

    return (
        <div className="login-page-container" style={loginPageStyle}>
            {/* Ya NO pasamos la prop onLoginSuccess */}
            <LoginForm /> {/* <--- Ya no pasamos la prop onLoginSuccess */}
            <div className="register-prompt">
                <p>
                    ¿No tienes una cuenta?{" "}
                    <span className="register-link" onClick={() => navigate("/register")}>
                        Regístrate aquí
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;