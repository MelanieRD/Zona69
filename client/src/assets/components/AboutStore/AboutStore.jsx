import React from 'react';
import './AboutStore.css';

const AboutStore = () => {
    return (
        <section className="about-store">
            <div className="about-container">
                <div className="about-content">
                    <h2 className="about-title">Zona 69</h2>
                    <p className="about-description">
                        Somos una tienda especializada en productos eróticosde calidad, comprometidos con brindar la mejor experiencia a nuestros clientes. Nuestro objetivo es ofrecer productos únicos y excepcionales.
                    </p>
                    <div className="store-info">
                        <div className="info-item">
                            <span className="info-icon">📍</span>
                            <div className="info-text">
                                <h3>Ubicación</h3>
                                <p>Las Terrenas, Samaná</p>
                            </div>
                        </div>
                      
                    </div>
                </div>
                <div className="store-image">
                    <img src="/images/carousel/toys2.jpg" alt="Nuestra Tienda" />
                </div>
            </div>
        </section>
    );
};

export default AboutStore; 