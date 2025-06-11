// src/pages/RegisterPage.jsx
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { AuthContext } from '../contexts/AuthContext'; // CAMBIO: de context a contexts
import "../styles/auth.css";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const registerPageStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${process.env.PUBLIC_URL}/snopyy.jpg')`,
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

    if (isLoggedIn) {
        return null;
    }

    return (
        <div className="register-page-container" style={registerPageStyle}>
            <RegisterForm />
            <div className="login-prompt">
                <p>
                    ¿Ya tienes una cuenta?{" "}
                    <span className="login-link" onClick={() => navigate("/login")}>
                        Inicia sesión aquí
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
