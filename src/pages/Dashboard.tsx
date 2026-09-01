import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, History as HistoryIcon, Star, ArrowRight, Pizza as PizzaIcon, Loader2, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PizzaCard } from '../components/PizzaCard';
import { Pizza } from '../types';

export const Dashboard = () => {
    const { user, token } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [realOrders, setRealOrders] = useState<any[]>([]);
    const [isOrdersLoading, setIsOrdersLoading] = useState(false);

    useEffect(() => {
        if (!user || !token) return;

        setIsOrdersLoading(true);
        fetch('/api/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.data) {
                    setRealOrders(data.data);
                }
            })
            .catch((err) => console.error('Error fetching orders:', err))
            .finally(() => setIsOrdersLoading(false));
    }, [user, token]);

    const [recommendations, setRecommendations] = useState<Pizza[]>([]);

    useEffect(() => {
        fetch('/api/pizzas')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const fetchedPizzas = data.data.slice(0, 2).map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        image: p.image !== 'no-image.jpg' ? p.image : 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop',
                        rating: 4.8,
                        category: p.category.toLowerCase(),
                        isSpicy: false
                    }));
                    setRecommendations(fetchedPizzas);
                }
            })
            .catch(err => console.error('Error fetching recommendations:', err));
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen pt-40 px-4 text-center">
                <h2 className="text-3xl font-display font-black text-slate-900 mb-4">Please login first</h2>
                <p className="text-slate-600 mb-8">You need to be logged in to view your dashboard.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 bg-primary-500 text-white font-bold rounded-full"
                >
                    Go Login
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 bg-orange-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Welcome Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] p-8 md:p-12 mb-12 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-8 justify-between border border-slate-100"
                >
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-primary-100 shrink-0 bg-orange-50" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <h1 className="text-4xl font-display font-black text-slate-900 leading-tight">
                                Hello, <span className="text-primary-500">{user.name.split(' ')[0]}</span>!
                            </h1>
                            <p className="text-slate-600 font-medium text-lg mt-1">Ready for your usual order?</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/menu')}
                        className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold flex items-center gap-3 hover:bg-primary-500 transition-colors shadow-lg shadow-slate-900/20 hover:shadow-primary-500/30 group"
                    >
                        <Clock className="h-5 w-5 group-hover:animate-spin-slow" />
                        Order Pizza Now
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Wallet & Recent Orders */}
                    <div className="lg:col-span-1 space-y-8">
                        
                        {/* Wallet balance Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden"
                        >
                            <div className="absolute right-[-10px] top-[-10px] opacity-10 select-none">
                                <Wallet className="w-32 h-32 text-white" />
                            </div>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Available Wallet Balance</span>
                            <h3 className="text-4xl font-display font-black mt-1 mb-6">${(user.balance || 0).toFixed(2)}</h3>
                            <div className="flex justify-between items-center text-sm pt-4 border-t border-white/10 text-slate-300">
                                <span>💳 Linked Account</span>
                                <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-white font-mono font-bold">Active</span>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <HistoryIcon className="h-6 w-6 text-primary-500" />
                                <h2 className="text-2xl font-display font-bold text-slate-900">Recent Orders</h2>
                            </div>

                            {isOrdersLoading ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                                </div>
                            ) : realOrders.length > 0 ? (
                                <div className="space-y-4">
                                    {realOrders.slice(0, 3).map((order, i) => {
                                        const dateStr = new Date(order.createdAt).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        });
                                        const itemsStr = order.items.map((item: any) => `${item.quantity}x ${item.name}`).join(', ');

                                        return (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={order._id}
                                                onClick={() => navigate('/history')}
                                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer"
                                            >
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="font-bold text-slate-900">
                                                        #{order._id.substring(order._id.length - 8).toUpperCase()}
                                                    </span>
                                                    <span className="text-xs font-semibold text-slate-500 bg-slate-150 px-2.5 py-1 rounded-full">
                                                        {dateStr}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-600 mb-4 line-clamp-1">{itemsStr}</p>
                                                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                                    <span className="font-bold text-lg text-slate-900">${order.total.toFixed(2)}</span>
                                                    <span className="text-primary-600 font-bold text-xs group-hover:underline flex items-center gap-1">
                                                        Details <ArrowRight className="h-3 w-3" />
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="p-6 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                                    <p className="text-slate-500 text-sm">No orders placed yet.</p>
                                </div>
                            )}

                            <button
                                onClick={() => navigate('/history')}
                                className="w-full py-4 text-slate-600 font-bold border-2 border-dashed border-slate-300 rounded-2xl hover:bg-white hover:border-slate-400 hover:text-slate-800 transition-colors"
                            >
                                View All History
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Recommendations & Points */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                                <h2 className="text-2xl font-display font-bold text-slate-900">Based on your taste</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {recommendations.map((pizza, i) => (
                                    <motion.div
                                        key={pizza.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                    >
                                        <PizzaCard pizza={pizza} onAdd={(p) => addToCart(p)} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary-600 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden group">
                            <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:scale-110 transition-transform duration-500">
                                <PizzaIcon className="w-64 h-64" />
                            </div>
                            <div className="relative z-10 max-w-sm">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold tracking-wider uppercase mb-4">Loyalty Program</span>
                                <h3 className="text-4xl font-display font-black mb-4">You have 450 Slice Points!</h3>
                                <p className="text-primary-100 mb-8 text-lg">You're just 50 points away from a free Large Pizza of your choice.</p>
                                <div className="w-full bg-primary-900/30 rounded-full h-4 mb-2 overflow-hidden border border-white/10">
                                    <div className="bg-secondary h-4 rounded-full w-[90%] shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                                </div>
                                <div className="flex justify-between text-sm font-bold opacity-80 mb-8">
                                    <span>0</span>
                                    <span>500pts</span>
                                </div>
                                <button className="bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                                    Redeem Rewards
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
