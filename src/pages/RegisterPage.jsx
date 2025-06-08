// RegisterPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import "../styles/auth.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const registerPageStyle = {
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

  return (
    <div className="register-page-container" style={registerPageStyle}>
      <RegisterForm />
      {/* ¡Este es el div que necesita la clase `login-prompt`! */}
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