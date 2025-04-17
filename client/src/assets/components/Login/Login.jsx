import { useState } from "react";
import { HiX } from "react-icons/hi";
import "./login.css";

export const Login = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        console.log("Login attempt:", { username, password });
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
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" className="login-button">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}; 