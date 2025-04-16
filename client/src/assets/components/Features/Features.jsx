import "./Features.css";
import { FaUserSecret, FaAward, FaShieldAlt, FaHeadset } from 'react-icons/fa';

export const Features = ({ features = [] }) => {
    const defaultFeatures = [
        {
            icon: <FaUserSecret />,
            title: "Discreción",
            description: "Tu privacidad es nuestra prioridad. Envíos discretos y confidenciales",
            highlight: "100% Privado"
        },
        {
            icon: <FaAward />,
            title: "Calidad",
            description: "Productos de la más alta calidad, seleccionados cuidadosamente",
            highlight: "Premium"
        },
        {
            icon: <FaShieldAlt />,
            title: "Garantía",
            description: "Garantía de satisfacción en todos nuestros productos",
            highlight: "Seguridad"
        },
        {
            icon: <FaHeadset />,
            title: "Soporte",
            description: "Atención personalizada y soporte 24/7 para nuestros clientes",
            highlight: "Asistencia"
        }
    ];

    const featuresToDisplay = features.length > 0 ? features : defaultFeatures;

    return (
        <section className="features-section">
            <div className="features-container">
                {featuresToDisplay.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon-wrapper">
                            <div className="icon-background"></div>
                            <span className="feature-icon">{feature.icon}</span>
                        </div>
                        <div className="feature-content">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <div className="feature-highlight">
                                <span>{feature.highlight}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}; 