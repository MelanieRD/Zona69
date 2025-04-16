import { CgProfile } from "react-icons/cg";
import { HiHeart } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav.css";
import { Cart } from "../Cart/Cart";

export const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="nav">
                <div className="nav-left">
                    <button 
                        className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span className="hamburger"></span>
                        <span className="hamburger"></span>
                        <span className="hamburger"></span>
                    </button>
                    <Link to="/" className="nav-logo">
                       {/* <img src="/logo.png" alt="LOGO" />*/}
                        <h1 className={`nav-logo-text ${isScrolled ? 'scrolled' : ''}`}>ZONA69</h1>
                    </Link>
                </div>
                
                <div className={`nav-center ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <Link 
                                to="/" 
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/shop" 
                                className={`nav-link ${location.pathname === '/shop' ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Productos
                            </Link>
                        </li>
                        
                        {/*<li>
                            <Link 
                                to="/about" 
                                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                About us
                            </Link>
                        </li>*/}
                        
                    </ul>
                </div>

                <div className="nav-right">
                    <ul className="nav-icons">
                        {/*<li>
                            <Link to="/wishlist" className="nav-icon-link">
                                <HiHeart className="icon-nav" />
                                <span className="icon-badge">0</span>
                            </Link>
                        </li>*/}
                        <li>
                            <Cart />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};