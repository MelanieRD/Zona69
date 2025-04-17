import "./Collections.css";
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";

export const Collections = () => {
    const newArrivals = [
        {
            id: 1,
            name: "Vagina realista",
            description: "Vagina realista, suave, con textura y diferentes niveles de vibración",
            price: "$2,500",
            image: "/images/nuevo/nuevo1.jpg",
            route: "/product/lace-bralette",
            isNew: true
        },
        {
            id: 2,
            name: "PLUG METÁLICO",
            description: "Plug metálico, duradero",
            price: "$500",
            image: "/images/nuevo/nuevo5.jpg",
            route: "/product/silk-robe",
            isNew: true
        },
        {
            id: 3,
            name: "RealisticDick",
            description: "Textura premium, para los golosos",
            price: "$1,500",
            image: "/images/nuevo/nuevo3.jpg",
            route: "/product/cotton-briefs",
            isNew: true
        }
    ];

    const handleAddToCart = (e, item) => {
        e.preventDefault();
        // Aquí iría la lógica para añadir al carrito
        console.log("Añadiendo al carrito:", item);
    };

    return (
        <section className="collections-section">
            <div className="collections-container">
                <div className="section-header">
                    <h2 className="section-title">Nuevos Lanzamientos</h2>
                    <p className="section-subtitle">Descubre nuestras últimas incorporaciones</p>
                </div>
                
                <div className="collections-grid">
                    {newArrivals.map((item) => (
                        <Link 
                            key={item.id} 
                            to={item.route}
                            className="collection-card"
                        >
                            <div className="collection-image">
                                <img src={item.image} alt={item.name} />
                                {item.isNew && <span className="new-badge">Nuevo</span>}
                                <div className="collection-overlay">
                                    <div className="collection-info">
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <span className="collection-price">{item.price}</span>
                                    </div>
                                    <div className="collection-actions">
                                        <button 
                                            className="collection-button"
                                            onClick={(e) => handleAddToCart(e, item)}
                                        >
                                            <BiCart className="cart-icon" />
                                            Añadir al carrito
                                        </button>
                                        <Link to={item.route} className="collection-button details">
                                            Ver Detalles
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}; 