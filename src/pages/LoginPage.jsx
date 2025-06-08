// LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "../styles/auth.css"; // Keep importing auth.css for form styles

const LoginPage = () => {
  const navigate = useNavigate();

  // Define the background style here
  const loginPageStyle = {
    // THIS IS THE KEY CHANGE for the "transparentona" effect
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/snopyy.jpg')",
    // The first part `linear-gradient(...)` creates the semi-transparent black overlay.
    // `rgba(0, 0, 0, 0.5)` means:
    //   - 0, 0, 0: Black color
    //   - 0.5: 50% opacity (you can adjust this value from 0.1 for very subtle to 0.8 for quite dark)
    // The comma `,` allows you to stack multiple background layers. The gradient goes on top of the image.

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
    <div className="login-page-container" style={loginPageStyle}>
      <LoginForm />
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