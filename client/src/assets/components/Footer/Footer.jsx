import { FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import "./Footer.css";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Inicio", path: "/" },
        { name: "Catálogo", path: "/shop" },

    ];

    const customerService = [
        { name: "Shipping & Returns", path: "/shipping" },
        { name: "Size Guide", path: "/size-guide" },
        { name: "FAQ", path: "/faq" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms & Conditions", path: "/terms" }
    ];

    const socialLinks = [
        { icon: <FaInstagram />, url: "https://instagram.com" },
        { icon: <FaFacebook />, url: "https://facebook.com" },
        { icon: <FaTwitter />, url: "https://twitter.com" },
        { icon: <FaPinterest />, url: "https://pinterest.com" }
    ];

    const contactMethods = [
        {
            icon: <FaWhatsapp />,
            label: "WhatsApp",
            info: "Yan Carlos Herrera",
            url: "https://wa.me/18493772440",
            description: "Chatea con nosotros directamente"
        }
    ];

    const contactMethods2 = [
        {
            icon: <FaEnvelope />,
            label: "Email",
            info: "contact@zona69.com",
            url: "mailto:contact@lzona69.com",
            description: "Envianos un email"
        }
    ];

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">Zona 69</h3>
                    <p className="footer-description">
                        69 formas de llegar al cielo
                    </p>
                    <p className="footer-description"> Imagenes Diseñadas por Freepik</p>
                    <div className="social-links">
                        {socialLinks.map((social, index) => (
                            <a 
                                key={index} 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Enlaces Rapidos</h3>
                    <ul className="footer-links">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <a href={link.path} className="footer-link">{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="footer-section">
                    <h3 className="footer-title">Whatsapp</h3>
                    <div className="contact-methods">
                        {contactMethods.map((method, index) => (
                            <a 
                                key={index}
                                href={method.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-method"
                            >
                                <div className="contact-icon">{method.icon}</div>
                                <div className="contact-info">
                                    <span className="contact-label">{method.label}</span>
                                    <span className="contact-detail">{method.info}</span>
                                    <span className="contact-description">{method.description}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Email</h3>
                    <div className="contact-methods">
                        {contactMethods2.map((method, index) => (
                            <a 
                                key={index}
                                href={method.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-method"
                            >
                                <div className="contact-icon">{method.icon}</div>
                                <div className="contact-info">
                                    <span className="contact-label">{method.label}</span>
                                    <span className="contact-detail">{method.info}</span>
                                    <span className="contact-description">{method.description}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>


            <div className="footer-bottom">
                <p className="copyright">
                    © {currentYear} Zona 69. Todos los derechos reservados.
                </p>
                <div className="payment-methods">
                    <span className="payment-icon">💳</span>
                    <span className="payment-icon">💵</span>
                    <span className="payment-icon">💲</span>
                </div>
            </div>
        </footer>
    );
};