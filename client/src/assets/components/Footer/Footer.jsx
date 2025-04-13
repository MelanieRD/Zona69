import { FaInstagram, FaFacebook, FaTwitter, FaPinterest, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import "./Footer.css";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Collections", path: "/collections" },
        { name: "About Us", path: "/about" }
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
            info: "+1 234 567 890",
            url: "https://wa.me/1234567890",
            description: "Chat with us directly"
        }
    ];

    const contactMethods2 = [
        {
            icon: <FaEnvelope />,
            label: "Email",
            info: "contact@lingerieshop.com",
            url: "mailto:contact@lingerieshop.com",
            description: "Send us an email"
        }
    ];

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-title">Lingerie Shop</h3>
                    <p className="footer-description">
                        Discover the perfect blend of comfort and elegance in our collection of premium lingerie.
                    </p>
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
                    <h3 className="footer-title">Quick Links</h3>
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
                    © {currentYear} Lingerie Shop. All rights reserved.
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