import React from "react";
import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";
import "./Features.css";

export const Features = () => {
    const features = [
        {
            icon: <FaShippingFast />,
            title: "Envío Rápido",
            description: "Recibe tus productos en tiempo récord con nuestro servicio de envío express."
        },
        {
            icon: <FaShieldAlt />,
            title: "Compra Segura",
            description: "Tu seguridad es nuestra prioridad. Pagos 100% seguros y datos protegidos."
        },
        {
            icon: <FaHeadset />,
            title: "Soporte 24/7",
            description: "Nuestro equipo está disponible para ayudarte en cualquier momento."
        }
    ];

    return (
        <section className="features-section">
            <div className="features-container">
                <div className="features-title-container">
                    <h2 className="features-title">Lo que ofrecemos</h2>
                </div>
                <div className="features-content-container">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <div className="feature-content">
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}; 