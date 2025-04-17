import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../utils/shopUtils";
import { HiHeart, HiShoppingCart, HiArrowLeft } from "react-icons/hi";
import { useCart } from "../../../context/CartContext";
import "./productDetail.css";

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('product-detail-overlay')) {
            handleBack();
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                // Si el producto tiene tallas disponibles, seleccionar la primera por defecto
                if (data.size && data.size.length > 0) {
                    setSelectedSize(data.size[0]);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Por favor, selecciona una talla");
            return;
        }
        addToCart(product, selectedSize, quantity);
        setShowAddedMessage(true);
        
        setTimeout(() => {
            setShowAddedMessage(false);
        }, 3000);
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (!product) {
        return <div className="error-message">Product not found</div>;
    }

    return (
        <div className="product-detail-overlay" onClick={handleOverlayClick}>
            <div className="product-detail-container" onClick={e => e.stopPropagation()}>
                <button className="back-button" onClick={handleBack}>
                    <HiArrowLeft /> Regresar
                </button>
                {showAddedMessage && (
                    <div className="added-to-cart-message">
                        Añadido al carrito correctamente!
                    </div>
                )}
                <div className="product-detail-grid">
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="product-header">
                            <h1 className="product-title">{product.name}</h1>
                            <button 
                                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <HiHeart />
                            </button>
                        </div>

                        <div className="product-price">${product.price}</div>

                        <div className="product-description">
                            <p>{product.description}</p>
                        </div>

                        {product.size && product.size.length > 0 && (
                            <div className="size-selector">
                                <h3>Talla</h3>
                                <div className="size-options">
                                    {product.size.map((size) => (
                                        <button
                                            key={size}
                                            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={() => handleSizeSelect(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="quantity-selector">
                            <h3>Cantidad</h3>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="quantity-input"
                            />
                        </div>

                        <button 
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                        >
                            <HiShoppingCart /> Añadir al carrito
                        </button>

                        <div className="product-details">
                            <h3>Detalles del producto</h3>
                            <ul>
                                <li><strong>Color:</strong> {product.color}</li>
                                <li><strong>Material:</strong> {product.material || "Not specified"}</li>
                                <li><strong>Categoria:</strong> {product.categoryTags?.join(", ") || "Not specified"}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};