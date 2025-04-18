import { HiHeart, HiTrash } from "react-icons/hi";
import { Button } from "../Button/Button";
import "./product.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Product = ({addClass, productName, productDesc, productPrice, imgSrc, buttonTxt, hideHeartIcon, id, onProductDeleted }) => {
    const [imageError, setImageError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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

    const getImageUrl = () => {
        if (!imgSrc) return 'https://placehold.co/600x400?text=No+Image';
        if (imgSrc.startsWith('http')) return imgSrc;
        // Asegurarse de que la URL base termine con / y la ruta de la imagen no empiece con /
        const baseUrl = import.meta.env.VITE_API_URL.endsWith('/') 
            ? import.meta.env.VITE_API_URL.slice(0, -1) 
            : import.meta.env.VITE_API_URL;
        const imagePath = imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`;
        return `${baseUrl}${imagePath}`;
    };

    const handleProductClick = () => {
        if (id) {
            navigate(`/product/${id}`);
        }
    };

    const handleDeleteClick = async (e) => {
        e.stopPropagation();
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/app/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                if (onProductDeleted) {
                    onProductDeleted(id);
                }
                setShowDeleteModal(false);
            } else {
                alert('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el producto');
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
                            src={getImageUrl()} 
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

            {showDeleteModal && (
                <div className="delete-modal-overlay">
                    <div className="delete-modal">
                        <h3>¿Estás seguro?</h3>
                        <p>Esta acción eliminará el producto "{productName}" permanentemente.</p>
                        <div className="delete-modal-buttons">
                            <button 
                                className="delete-modal-cancel"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancelar
                            </button>
                            <button 
                                className="delete-modal-confirm"
                                onClick={confirmDelete}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}