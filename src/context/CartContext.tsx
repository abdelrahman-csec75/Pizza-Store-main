import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pizza, CartItem } from '../types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (pizza: Pizza) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, amount: number) => void;
    clearCart: () => void;
    cartCount: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (pizza: Pizza) => {
        setCart((prev) => {
            const existingItem = prev.find(item => item.id === pizza.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === pizza.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...pizza, cartItemId: Math.random().toString(36).substr(2, 9), quantity: 1 }];
        });
    };

    const removeFromCart = (cartItemId: string) => {
        setCart((prev) => prev.filter(item => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId: string, amount: number) => {
        setCart((prev) => prev.map(item => {
            if (item.cartItemId === cartItemId) {
                const newQuantity = item.quantity + amount;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
