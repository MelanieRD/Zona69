import { CgProfile } from "react-icons/cg";

import { HiHeart } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import "./nav.css";
import { Link } from "react-router-dom";

export const Nav = () =>{

    return (
        <div className="nav-container">
        <nav>
            <img src="logo" alt="LOGO" />
            
            <ul className="nav-center">
                <li><Link to="/">Home</Link></li>
               
                <li><Link to="/shop">Shop</Link></li>
                <li><a>About us</a></li>
               
            </ul>

             <ul className="nav-right">
                {/* <li ><a> <CgProfile className="icon-nav"/></a></li> */}
                <li ><HiHeart className="icon-nav"/></li>
                <li ><BiCart className="icon-nav"/></li>
            </ul>
        </nav></div>
    )
}