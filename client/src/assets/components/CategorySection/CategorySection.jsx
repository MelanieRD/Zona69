import { Category } from "../Category/Category";
import "./categorySection.css";
import { useState } from "react";

export const CategorySection = ({ 
    title = "Selecciona una categoria",
    description = "Descubre nuestra colección de productos",
    categories = [],
    onCategoryClick = (category) => console.log("Category clicked:", category)
}) => {
    const defaultCategories = [
        {
            id: "vibradores",
            name: "Vibradores",
            description: "Vibradores para todo tipo de gustos y necesidades",
            image:  "/images/categorias/categoria1.jpg",
            buttonText: "Shop Women",
            isLarge: true,
            route: "/category/women"
        },
        {
            id: "preservativos",
            name: "preservativos",
            description: "Lubricantes, preservativos y algo mas",
            image: "/images/categorias/categoria2.jpg",
            buttonText: "Shop Men",
            isLarge: false,
            route: "/category/men"
        },
        {
            id: "Juguete",
            name: "Juguetes Realistas",
            description: "Juguetes realistas para salir de lo cotidiano",
            image: "/images/categorias/categoria3.jpg",
            buttonText: "Shop Accessories",
            isLarge: false,
            route: "/category/accessories"
        },
    ];

    const categoriesToDisplay = categories.length > 0 ? categories : defaultCategories;

    return (
        <section className="categories-section">
            <div className="categories-header">
                <h2>{title}</h2>
                <p>{description}</p>
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
                        onCategoryClick={onCategoryClick}
                    />
                ))}
            </div>
        </section>
    );
};