import { HiHeart } from "react-icons/hi";
import { Button } from "../Button/Button";
import "./product.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Product = ({addClass, productName, productDesc, productPrice, imgSrc, buttonTxt, hideHeartIcon, id }) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();

    const handleImageError = () => {
        setImageError(true);
    };

    const handleProductClick = () => {
        if (id) {
            navigate(`/product/${id}`);
        }
    };

    return (
        <div style={{position: "relative"}}>
            <div 
                className={`product-container ${addClass}`}
                onClick={handleProductClick}
                style={{ cursor: 'pointer' }}
            >
                <div className="product-image">
                    {!imageError ? (
                        <img 
                            src={imgSrc} 
                            alt={productName || "product"} 
                            onError={handleImageError}
                        />
                    ) : (
                        <div className="image-placeholder">
                            <span>No image available</span>
                        </div>
                    )}
                    {hideHeartIcon ? "" : <HiHeart className="icon-product"/>}
                </div>

                <div className="product-info">
                    <h3>{productName}</h3>
                    <p>{productDesc}</p>
                    <p className="product-price">{productPrice}</p>
                </div>
            </div>
        </div>
    )
}