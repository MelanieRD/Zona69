import { CgProfile } from "react-icons/cg";
import { HiHeart } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./nav.css";

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
                        <img src="/logo.png" alt="LOGO" />
                    </Link>
                </div>
                
                <div className={`nav-center ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <ul className="nav-links">
                        <li>
                            <Link 
                                to="/" 
                                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/shop" 
                                className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                                onClick={closeMobileMenu}
                            >
                                About us
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="nav-right">
                    <ul className="nav-icons">
                        <li>
                            <Link to="/wishlist" className="nav-icon-link">
                                <HiHeart className="icon-nav" />
                                <span className="icon-badge">0</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="nav-icon-link">
                                <BiCart className="icon-nav" />
                                <span className="icon-badge">0</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};