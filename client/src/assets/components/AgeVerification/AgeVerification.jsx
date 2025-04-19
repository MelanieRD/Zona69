import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgeVerification.css';

export const AgeVerification = ({ onVerified }) => {
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verified = localStorage.getItem('ageVerified');
        if (verified === 'true') {
            setShowModal(false);
            if (onVerified) onVerified();
        }
    }, [onVerified]);

    const handleVerification = (isAdult) => {
        if (isAdult) {
            localStorage.setItem('ageVerified', 'true');
            setShowModal(false);
            if (onVerified) onVerified();
        } else {
            navigate('/');
        }
    };

    if (!showModal) return null;

    return (
        <div className="age-verification-modal">
            <div className="age-verification-content">
                <h2>Verificación de Edad</h2>
                <p>Este sitio contiene contenido para adultos. Debes tener al menos 18 años para acceder.</p>
                <div className="verification-buttons">
                    <button 
                        className="confirm-button"
                        onClick={() => handleVerification(true)}
                    >
                        Soy mayor de 18 años
                    </button>
                    <button 
                        className="deny-button"
                        onClick={() => handleVerification(false)}
                    >
                        No soy mayor de 18 años
                    </button>
                </div>
            </div>
        </div>
    );
}; 