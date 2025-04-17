import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import './AboutStore.css';

const AboutStore = () => {
    const [springs, api] = useSpring(() => ({
        from: { y: 0 },
        to: [
            { y: -10 },
            { y: 0 }
        ],
        config: {
            duration: 3000,
            tension: 170,
            friction: 26
        },
        loop: true
    }));

    return (
        <section className="about-store">
            <div className="about-container">
                <div className="about-content">
                    {/*<h2 className="about-title">Zona 69</h2>*/}
                    <img src="/images/logo.png" alt="logo" className='logo-about'/>
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
                <animated.div 
                    className="store-image"
                    style={{
                        ...springs,
                        transform: springs.y.to(y => `translateY(${y}px)`)
                    }}
                >
                    <img src="/images/imgAbout.png" alt="Nuestra Tienda" />
                </animated.div>
            </div>
        </section>
    );
};

export default AboutStore; 