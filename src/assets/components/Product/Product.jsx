import { HiHeart } from "react-icons/hi";
import { Button } from "../Button/Button";
import "./product.css";
import { useEffect } from "react";

export const Product = ({addClass, productName, productDesc, productPrice, imgSrc, buttonTxt, hideHeartIcon }) => {
        


    return (
        <div className={`product-container ${addClass}`} >

            <div className="product-image">
                <img src={imgSrc} alt="product" />
               {hideHeartIcon?  "" : <HiHeart className="icon-product"/>}
            </div>
            <div className="product-info">
                <h3>{productName}</h3>
                <p>{productDesc}</p>
                <p>{productPrice}</p>

                     <Button text={buttonTxt} />
                    

               
            </div>
            
       
        </div>
    )
}