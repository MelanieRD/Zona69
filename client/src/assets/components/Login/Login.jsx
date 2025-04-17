import { useState } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const Login = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/app/auth/login`, {
                username,
                password
            });

            // Guardar el token en localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Mostrar mensaje de éxito
            setSuccess('¡Inicio de sesión exitoso!');
            
            // Limpiar el formulario
            setUsername("");
            setPassword("");

            // Cerrar el modal después de 2 segundos
            setTimeout(() => {
                onClose();
                setSuccess("");
            }, 2000);

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Error al iniciar sesión');
            } else {
                setError('Error de conexión. Por favor, intenta de nuevo.');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="login-overlay" onClick={onClose}>
            <div className="login-container" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <HiX />
                </button>
                
                <div className="login-content">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Usuario</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Ingresa tu usuario"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}

                        <button type="submit" className="login-button">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}; 