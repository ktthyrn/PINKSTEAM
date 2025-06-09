// src/components/RegisterForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // CAMBIO: de context a contexts
import './../styles/auth.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Simulando registro exitoso para:', email);
            login({ email: email, username: 'NuevoUsuario' });

        } catch (err) {
            setError('Error al registrar usuario. Inténtalo de nuevo.');
            console.error('Error de registro:', err);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Registrarse</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
                <label htmlFor="register-email">Correo electrónico</label>
                <input
                    type="email"
                    id="register-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="register-password">Contraseña</label>
                <input
                    type="password"
                    id="register-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="confirm-password">Confirmar Contraseña</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn submit-btn">
                Registrarse
            </button>
        </form>
    );
};

RegisterForm.propTypes = {
    // Ya no se requiere onRegisterSuccess
};

export default RegisterForm;
