import { useState } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

export const Register = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            console.log('Intentando registrar usuario...');
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/app/auth/register`, {
                username,
                email,
                password,
                role
            });

            console.log('Respuesta del servidor:', response.data);

            // Guardar el token en localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            console.log('Datos guardados en localStorage:');
            console.log('Token:', localStorage.getItem('token'));
            console.log('User:', localStorage.getItem('user'));

            // Mostrar mensaje de éxito
            setSuccess('¡Registro exitoso!');
            
            // Limpiar el formulario
            setUsername("");
            setEmail("");
            setPassword("");
            setRole("user");

            // Cerrar el modal después de 2 segundos
            setTimeout(() => {
                onClose();
                setSuccess("");
            }, 2000);

        } catch (error) {
            console.error('Error en el registro:', error);
            if (error.response) {
                console.error('Respuesta de error:', error.response.data);
                setError(error.response.data.message || 'Error al registrar');
            } else {
                setError('Error de conexión. Por favor, intenta de nuevo.');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="register-overlay" onClick={onClose}>
            <div className="register-container" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    <HiX />
                </button>
                
                <div className="register-content">
                    <h2>Registro</h2>
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
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Ingresa tu email"
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

                        <div className="form-group">
                            <label htmlFor="role">Rol</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>

                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}

                        <button type="submit" className="register-button">
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}; 