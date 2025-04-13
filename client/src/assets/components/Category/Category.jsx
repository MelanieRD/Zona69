import { useState } from "react";
import "./Category.css";

export const Category = ({
    name,
    description,
    image,
    buttonText,
    isLarge = false,
    route,
    onCategoryClick
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (onCategoryClick) {
            onCategoryClick({ name, description, image, route });
        }
    };

    return (
        <div 
            className={`category-card ${isLarge ? 'large' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div className="category-image">
                <img 
                    src={image} 
                    alt={name}
                    className={isHovered ? 'hovered' : ''}
                />
            </div>
            <div className="category-content">
                <h3>{name}</h3>
                <p>{description}</p>
                <button className="category-button">
                    {buttonText}
                </button>
            </div>
        </div>
    );
}; 