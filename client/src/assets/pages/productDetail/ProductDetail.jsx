import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../utils/shopUtils";
import { HiHeart, HiShoppingCart, HiArrowLeft, HiPencil } from "react-icons/hi";
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
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Verificar si el usuario es administrador
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                setIsAdmin(user.role === 'admin' || user.role === 'superadmin');
            } catch (error) {
                console.error('Error parsing user data:', error);
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }, []);

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
                setEditedProduct(data);
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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // Aquí iría la lógica para guardar los cambios en el backend
            const response = await fetch(`${import.meta.env.VITE_API_URL}/app/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editedProduct)
            });

            if (!response.ok) {
                throw new Error('Error al guardar los cambios');
            }

            const updatedProduct = await response.json();
            setProduct(updatedProduct);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar los cambios');
        }
    };

    const handleCancel = () => {
        setEditedProduct(product);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prev => ({
            ...prev,
            [name]: value
        }));
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
                <div className="product-detail-header">
                    <button className="back-button" onClick={handleBack}>
                        <HiArrowLeft /> Regresar
                    </button>
                    {isAdmin && !isEditing && (
                        <button className="edit-button" onClick={handleEdit}>
                            <HiPencil /> Editar
                        </button>
                    )}
                </div>
                {showAddedMessage && (
                    <div className="added-to-cart-message">
                        Añadido al carrito correctamente!
                    </div>
                )}
                <div className="product-detail-grid">
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={isEditing ? editedProduct.imageUrl : product.imageUrl} alt={product.name} />
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="product-header">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleInputChange}
                                    className="edit-input"
                                />
                            ) : (
                                <h1 className="product-title">{product.name}</h1>
                            )}
                            <button 
                                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <HiHeart />
                            </button>
                        </div>

                        {isEditing ? (
                            <input
                                type="number"
                                name="price"
                                value={editedProduct.price}
                                onChange={handleInputChange}
                                className="edit-input"
                            />
                        ) : (
                            <div className="product-price">${product.price}</div>
                        )}

                        {isEditing ? (
                            <textarea
                                name="description"
                                value={editedProduct.description}
                                onChange={handleInputChange}
                                className="edit-textarea"
                            />
                        ) : (
                            <div className="product-description">
                                <p>{product.description}</p>
                            </div>
                        )}

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

                        {!isEditing && (
                            <button 
                                className="add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                <HiShoppingCart /> Añadir al carrito
                            </button>
                        )}

                        {isEditing && (
                            <div className="edit-buttons">
                                <button className="save-button" onClick={handleSave}>
                                    Guardar cambios
                                </button>
                                <button className="cancel-button" onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        )}

                        <div className="product-details">
                            <h3>Detalles del producto</h3>
                            <ul>
                                {isEditing ? (
                                    <>
                                        <li>
                                            <strong>Color:</strong>
                                            <input
                                                type="text"
                                                name="color"
                                                value={editedProduct.color}
                                                onChange={handleInputChange}
                                                className="edit-input"
                                            />
                                        </li>
                                        <li>
                                            <strong>Material:</strong>
                                            <input
                                                type="text"
                                                name="material"
                                                value={editedProduct.material}
                                                onChange={handleInputChange}
                                                className="edit-input"
                                            />
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li><strong>Color:</strong> {product.color}</li>
                                        <li><strong>Material:</strong> {product.material || "Not specified"}</li>
                                        <li><strong>Categoria:</strong> {product.categoryTags?.join(", ") || "Not specified"}</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};