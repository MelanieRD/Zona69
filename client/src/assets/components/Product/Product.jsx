import { HiHeart, HiPencil, HiTrash } from "react-icons/hi";
import { Button } from "../Button/Button";
import "./product.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Product = ({addClass, productName, productDesc, productPrice, imgSrc, buttonTxt, hideHeartIcon, id }) => {
    const [imageError, setImageError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

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

    const handleImageError = () => {
        setImageError(true);
    };

    const handleProductClick = () => {
        if (id) {
            navigate(`/product/${id}`);
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        navigate(`/product/${id}/edit`);
    };

    const handleDeleteClick = async (e) => {
        e.stopPropagation();
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/app/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    window.location.reload();
                } else {
                    alert('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el producto');
            }
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
                    {isAdmin && (
                        <div className="admin-actions">
                            
                            <button 
                                className="delete-button"
                                onClick={handleDeleteClick}
                            >
                                <HiTrash />
                            </button>
                        </div>
                    )}
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