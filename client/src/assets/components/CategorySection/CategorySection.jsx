import { Category } from "../Category/Category";
import "./categorySection.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const CategorySection = ({ 
    title = "Explora Nuestras Categorías",
    description = "Descubre una amplia selección de productos para todos los gustos",
    categories = [],
    onCategoryClick = () => {}
}) => {
    const navigate = useNavigate();
    const defaultCategories = [
        {
            id: "vibradores",
            name: "Vibradores",
            description: "Explora nuestra colección de vibradores para todas las necesidades",
            image: "/images/categorias/categoria1.jpg",
            buttonText: "Explorar",
            isLarge: true,
            route: "/category/vibradores"
        },
        {
            id: "preservativos",
            name: "Preservativos",
            description: "Encuentra los mejores preservativos y lubricantes",
            image: "/images/categorias/categoria2.jpg",
            buttonText: "Explorar",
            isLarge: false,
            route: "/category/preservativos"
        },
        {
            id: "juguetes",
            name: "Juguetes",
            description: "Descubre juguetes realistas para experiencias únicas",
            image: "/images/categorias/categoria3.jpg",
            buttonText: "Explorar",
            isLarge: false,
            route: "/category/juguetes"
        }
    ];

    const categoriesToDisplay = categories.length > 0 ? categories : defaultCategories;

    const handleCategoryClick = (category) => {
        navigate(`/shop?category=${encodeURIComponent(category.name)}`);
        onCategoryClick(category);
    };

    return (
        <section className="category-section">
            <div className="category-container">
                <div className="section-header">
                    <h2 className="a-section-title">{title}</h2>
                    <p className="section-subtitle">{description}</p>
                </div>
                
                <div className="categories-grid">
                    {categoriesToDisplay.map((category) => (
                        <Category
                            key={category.id}
                            name={category.name}
                            description={category.description}
                            image={category.image}
                            buttonText={category.buttonText}
                            isLarge={category.isLarge}
                            route={category.route}
                            onCategoryClick={() => handleCategoryClick(category)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};