import { CgProfile } from "react-icons/cg";

import { HiHeart } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import "./nav.css";
import { Link } from "react-router-dom";

export const Nav = () =>{

    return (

        
        <div className="nav-container">
        <nav>
            
            <ul></ul>
            
            <ul className="nav-center">
                <li><Link to="/">Inicio</Link></li>
                 <li><a>Zona 69</a></li>
                <li><Link to="/shop">Tienda</Link></li>    
            </ul>

             <ul className="nav-right">
                {/* <li ><a> <CgProfile className="icon-nav"/></a></li> */}
                <li ><HiHeart className="icon-nav"/></li>
                <li ><BiCart className="icon-nav"/></li>
            </ul>
        </nav></div>
    )
}