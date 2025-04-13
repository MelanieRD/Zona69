import { Category } from "../Category/Category";
import "./categorySection.css";
import { useState } from "react";

export const CategorySection = ({ 
    title = "Shop by Category",
    description = "Discover our curated collections",
    categories = [],
    onCategoryClick = (category) => console.log("Category clicked:", category)
}) => {
    const defaultCategories = [
        {
            id: "women",
            name: "Women",
            description: "Elegant and comfortable lingerie for every occasion",
            image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop",
            buttonText: "Shop Women",
            isLarge: true,
            route: "/category/women"
        },
        {
            id: "men",
            name: "Men",
            description: "Premium underwear for the modern man",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1000&auto=format&fit=crop",
            buttonText: "Shop Men",
            isLarge: false,
            route: "/category/men"
        },
        {
            id: "accessories",
            name: "Accessories",
            description: "Complete your intimate wardrobe",
            image: "https://images.unsplash.com/photo-1585487000128-7c0044e295dc?q=80&w=1000&auto=format&fit=crop",
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