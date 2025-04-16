import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, size, quantity) => {
        setCart(prevCart => {
            // Verificar si el producto ya está en el carrito
            const existingProductIndex = prevCart.findIndex(
                item => item.product._id === product._id && item.size === size
            );

            if (existingProductIndex >= 0) {
                // Si existe, actualizar la cantidad
                const newCart = [...prevCart];
                newCart[existingProductIndex].quantity += quantity;
                return newCart;
            } else {
                // Si no existe, agregar nuevo item
                return [...prevCart, { product, size, quantity }];
            }
        });
    };

    const removeFromCart = (productId, size) => {
        setCart(prevCart => 
            prevCart.filter(item => 
                !(item.product._id === productId && item.size === size)
            )
        );
    };

    const updateQuantity = (productId, size, newQuantity) => {
        setCart(prevCart => 
            prevCart.map(item => 
                item.product._id === productId && item.size === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 