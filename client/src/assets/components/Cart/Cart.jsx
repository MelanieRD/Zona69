import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { HiX, HiPlus, HiMinus } from 'react-icons/hi';
import { BiCart } from 'react-icons/bi';
import './cart.css';

export const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const handleQuantityChange = (productId, size, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            updateQuantity(productId, size, newQuantity);
        }
    };

    const handleCheckout = () => {
        // Formatear el mensaje para WhatsApp
        const message = `¡Hola! Quiero realizar el siguiente pedido:\n\n${
            cart.map(item => 
                `- ${item.product.name} (Talla: ${item.size}) x${item.quantity} - $${item.product.price * item.quantity}`
            ).join('\n')
        }\n\nTotal: $${getCartTotal().toFixed(2)}`;

        // Codificar el mensaje para la URL
        const encodedMessage = encodeURIComponent(message);
        
        // Crear el enlace de WhatsApp
        const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`;
        
        // Abrir WhatsApp en una nueva pestaña
        window.open(whatsappUrl, '_blank');
    };

    return (
        <li 
            className="nav-icon-item"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button 
                className="nav-icon-link"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BiCart className="icon-nav" />
                {cart.length > 0 && (
                    <span className="icon-badge">{cart.length}</span>
                )}
            </button>

            <div className={`cart-dropdown ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>Your Cart</h3>
                    <button 
                        className="close-cart"
                        onClick={() => setIsOpen(false)}
                    >
                        <HiX />
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div key={`${item.product._id}-${item.size}-${index}`} className="cart-item">
                                    <img 
                                        src={item.product.imageUrl} 
                                        alt={item.product.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h4>{item.product.name}</h4>
                                        <p>Size: {item.size}</p>
                                        <p>${item.product.price}</p>
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => handleQuantityChange(
                                                    item.product._id, 
                                                    item.size, 
                                                    item.quantity, 
                                                    -1
                                                )}
                                            >
                                                <HiMinus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button 
                                                onClick={() => handleQuantityChange(
                                                    item.product._id, 
                                                    item.size, 
                                                    item.quantity, 
                                                    1
                                                )}
                                            >
                                                <HiPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-item"
                                        onClick={() => removeFromCart(item.product._id, item.size)}
                                    >
                                        <HiX />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Total:</span>
                                <span>${getCartTotal().toFixed(2)}</span>
                            </div>
                            <button 
                                className="checkout-btn"
                                onClick={handleCheckout}
                            >
                                Checkout via WhatsApp
                            </button>
                        </div>
                    </>
                )}
            </div>
        </li>
    );
}; 