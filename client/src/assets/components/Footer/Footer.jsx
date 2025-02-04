import { useState } from "react";
import "./footer.css";

export const Footer = () => {
    const [login, setLogin] = useState(false); 

    function handleLogin(){
        setLogin(!login);
        console.log("login value: "+login);
    }

    return (
        <footer className="footer">
            <div className="footer-info">
                 <div className="policy">
                 <p>© 2024</p>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                 </div>
            </div>

            <img src="" alt="LOGO" />
            
            <div className="login">
            <p onClick={ handleLogin}>admin</p>
               {login && <><input type="text" placeholder="user" />
                <input type="text" placeholder="password"/>
                <button>Log in</button></>} 
            </div>
           
        </footer>
    )
}