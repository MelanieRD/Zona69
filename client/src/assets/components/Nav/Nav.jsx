import { CgProfile } from "react-icons/cg";
import { HiHeart } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import { useState, useEffect } from "react";
import "./nav.css";
import { Link } from "react-router-dom";

export const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    return (
        <div className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
            <nav>
                <div className="nav-left">
                    <button 
                        className="mobile-menu-button"
                        onClick={toggleMobileMenu}
                    >
                        <span className="hamburger"></span>
                        <span className="hamburger"></span>
                        <span className="hamburger"></span>
                    </button>
                    <img src="logo" alt="LOGO" />
                </div>
                
                <ul className={`nav-center ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><a>About us</a></li>
                </ul>

                <ul className="nav-right">
                    {/* <li ><a> <CgProfile className="icon-nav"/></a></li> */}
                    <li><HiHeart className="icon-nav"/></li>
                    <li><BiCart className="icon-nav"/></li>
                </ul>
            </nav>
        </div>
    )
}