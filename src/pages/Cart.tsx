import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, ShoppingCart, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
    const { user, token, updateBalance } = useAuth();

    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const tax = subtotal * 0.08; // 8% tax
    const deliveryFee = subtotal > 0 ? 5.00 : 0;
    const total = subtotal + tax + deliveryFee;

    const isInsufficientBalance = user ? user.balance < total : false;

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setError(null);
        setSuccess(null);
        setIsCheckoutLoading(true);

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        pizzaId: item.id,
                        quantity: item.quantity,
                        size: 'medium'
                    }))
                })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                setError(data.error || 'Failed to place order.');
            } else {
                setSuccess('Order placed successfully! Enjoy your pizza.');
                updateBalance(data.updatedBalance);
                setTimeout(() => {
                    clearCart();
                    navigate('/dashboard');
                }, 2500);
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please check your connection.');
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-40 pb-20 bg-orange-50/50 flex flex-col items-center px-4">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-md w-full border border-slate-100">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="w-12 h-12 text-primary-500" />
                    </div>
                    <h2 className="text-3xl font-display font-black text-slate-900 mb-4">Your cart is empty</h2>
                    <p className="text-slate-600 mb-8 text-lg">Looks like you haven't added any delicious pizzas yet!</p>
                    <button
                        onClick={() => navigate('/menu')}
                        className="w-full py-4 bg-primary-500 text-white font-bold rounded-2xl hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/30"
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-orange-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-3xl font-display font-black text-slate-900 flex items-center gap-3">
                        <ShoppingCart className="w-8 h-8 text-primary-500" />
                        Your Cart
                    </h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-2xl flex items-center gap-3"
                                >
                                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-2xl flex items-center gap-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                    <span>{success}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {cart.map((item, index) => (
                            <motion.div
                                key={item.cartItemId}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover rounded-full shadow-md"
                                />

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h3>
                                    <p className="text-primary-600 font-bold text-lg">${item.price}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center bg-slate-50 rounded-full border border-slate-200 p-1">
                                        <button
                                            onClick={() => updateQuantity(item.cartItemId, -1)}
                                            className="w-8 h-8 rounded-full bg-white text-slate-600 shadow-sm flex items-center justify-center font-bold hover:text-primary-600 hover:shadow transition-all"
                                        >
                                            -
                                        </button>
                                        <span className="w-10 text-center font-bold text-slate-900">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.cartItemId, 1)}
                                            className="w-8 h-8 rounded-full bg-white text-slate-600 shadow-sm flex items-center justify-center font-bold hover:text-primary-600 hover:shadow transition-all"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.cartItemId)}
                                        className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 border border-slate-100 border-dashed text-center mt-4"
                        >
                            <button
                                onClick={() => navigate('/menu')}
                                className="text-primary-600 font-bold hover:underline"
                            >
                                + Add more items
                            </button>
                        </motion.div>
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-28">
                            <h2 className="text-2xl font-display font-black text-slate-900 mb-6">Order Summary</h2>

                            {user && (
                                <div className="mb-6 p-4 bg-orange-50/75 rounded-2xl border border-orange-100">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600 font-medium">Your Wallet Balance:</span>
                                        <span className="font-bold text-slate-900">${user.balance.toFixed(2)}</span>
                                    </div>
                                    {isInsufficientBalance && (
                                        <div className="mt-2 text-xs text-red-600 font-bold flex items-center gap-1">
                                            <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                                            <span>Insufficient funds. You need ${(total - user.balance).toFixed(2)} more.</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-4 text-slate-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (8%)</span>
                                    <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span className="font-bold text-slate-900">${deliveryFee.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold text-slate-900">Total</span>
                                    <span className="text-3xl font-black text-primary-500">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckoutLoading}
                                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg shadow-slate-900/20 hover:bg-primary-500 hover:shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:shadow-none"
                            >
                                {isCheckoutLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Processing Payment...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Pay with Wallet Balance</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};
