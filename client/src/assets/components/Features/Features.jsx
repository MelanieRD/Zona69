import React from "react";
import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";
import { useSpring, animated, config } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import "./Features.css";

export const Features = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: false
    });

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

    const chainAnimation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-50px)',
        config: {
            tension: 170,
            friction: 26,
            mass: 1
        }
    });

    return (
        <section className="features-section">
            <div className="features-container">
                <div className="features-title-container">
                    <h2 className="features-title">Lo que ofrecemos</h2>
                </div>
                <animated.div 
                    ref={ref} 
                    className="features-content-container"
                    style={chainAnimation}
                >
                    {features.map((feature, index) => {
                        const itemAnimation = useSpring({
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateX(0)' : 'translateX(-50px)',
                            delay: index * 200,
                            config: {
                                tension: 170,
                                friction: 26,
                                mass: 1
                            }
                        });

                        return (
                            <animated.div 
                                key={index} 
                                className="feature-card"
                                style={itemAnimation}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <div className="feature-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </animated.div>
                        );
                    })}
                </animated.div>
            </div>
        </section>
    );
}; 