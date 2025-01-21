import { CgProfile } from "react-icons/cg";

import { HiHeart } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import "./nav.css";

export const Nav = () =>{

    return (
        <nav>
            <img src="logo" alt="LOGO" />
            
            <ul className="nav-center">
                <li><a>Home</a></li>
                <li><a>Shop</a></li>
                <li><a>About us</a></li>
               
            </ul>

             <ul className="nav-right">
                {/* <li ><a> <CgProfile className="icon-nav"/></a></li> */}
                <li ><HiHeart className="icon-nav"/></li>
                <li ><BiCart className="icon-nav"/></li>
            </ul>
        </nav>
    )
}