import "./Collections.css";
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useCart } from "../../../context/CartContext";

export const Collections = () => {
    const { addToCart } = useCart();

    const newArrivals = [
        {
            id: "vagina-realista-1",
            name: "Vagina realista",
            description: "Vagina realista, suave, con textura y diferentes niveles de vibración",
            price: "$2,500",
            image: "/images/nuevo/nuevo1.jpg",
            route: "/product/lace-bralette",
            isNew: true
        },
        {
            id: "plug-metalico-2",
            name: "PLUG METÁLICO",
            description: "Plug metálico, duradero",
            price: "$2,500",
            image: "/images/nuevo/nuevo5.jpg",
            route: "/product/silk-robe",
            isNew: true
        },
        {
            id: "realistic-dick-3",
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
        e.stopPropagation();
        const product = {
            _id: item.id,
            name: item.name,
            price: parseFloat(item.price.replace('$', '')),
            imageUrl: item.image,
            description: item.description
        };
        addToCart(product, 'M', 1);
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
                        <div key={item.id} className="collection-card">
                            <Link to={item.route} className="collection-image">
                                <img src={item.image} alt={item.name} />
                                {item.isNew && <span className="new-badge">Nuevo</span>}
                            </Link>
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
                    ))}
                </div>
            </div>
        </section>
    );
}; 