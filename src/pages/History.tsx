import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Package, Calendar, Clock, ArrowRight, ChevronRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const OrderHistory = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user || !token) return;

        setIsLoading(true);
        fetch('/api/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.data) {
                    setOrders(data.data);
                }
            })
            .catch((err) => console.error('Error fetching orders:', err))
            .finally(() => setIsLoading(false));
    }, [user, token]);

    if (!user) {
        return (
            <div className="min-h-screen pt-40 flex items-center justify-center bg-orange-50/30">
                <div className="text-center">
                    <History className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                    <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Login to view history</h2>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 bg-primary-500 text-white font-bold rounded-full shadow-lg"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 bg-orange-50/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                <div className="mb-12">
                    <h1 className="text-4xl font-display font-black text-slate-900 mb-4 flex items-center gap-4">
                        <History className="text-primary-500 w-10 h-10" />
                        My Orders
                    </h1>
                    <p className="text-slate-600 text-lg">Tracks all your delicious moments at PizzaHub.</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order, index) => {
                            const dateObj = new Date(order.createdAt);
                            const dateStr = dateObj.toLocaleDateString(undefined, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            });
                            const timeStr = dateObj.toLocaleTimeString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit'
                            });
                            const orderId = order._id.substring(order._id.length - 8).toUpperCase();

                            return (
                                <motion.div
                                    key={order._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-xl transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-slate-50">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl font-black text-slate-900">#{orderId}</span>
                                                <span className="px-3 py-1 bg-green-150 text-green-700 text-xs font-bold uppercase rounded-full">
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <Calendar className="w-4 h-4" /> {dateStr}
                                                </span>
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <Clock className="w-4 h-4" /> {timeStr}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-slate-400 text-sm font-bold uppercase mb-1">Total Paid</p>
                                            <p className="text-3xl font-display font-black text-primary-500">${order.total.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div>
                                            <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                                                <Package className="w-5 h-5 text-slate-400" />
                                                Items Ordered
                                            </h3>
                                            <div className="space-y-3">
                                                {order.items.map((item: any, i: number) => (
                                                    <div key={i} className="flex justify-between items-center text-slate-600 font-medium">
                                                        <span>{item.name} <span className="text-xs text-slate-400 font-semibold">({item.size})</span></span>
                                                        <span className="bg-slate-50 px-3 py-1 rounded-lg text-slate-900 font-bold">x{item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-end gap-3">
                                            <button
                                                onClick={() => navigate('/menu')}
                                                className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 text-white font-bold hover:bg-primary-500 transition-all flex items-center justify-center gap-2 group/btn"
                                            >
                                                Order More Items
                                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                            <button className="w-full py-3 text-slate-600 font-bold hover:text-slate-900 transition-colors flex items-center justify-center gap-1">
                                                Download Invoice <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {!isLoading && orders.length === 0 && (
                    <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-300">
                        <Package className="w-16 h-16 text-slate-205 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No orders yet</h3>
                        <p className="text-slate-500 mb-8">Ready to order your first pizza?</p>
                        <button
                            onClick={() => navigate('/menu')}
                            className="px-8 py-3 bg-primary-500 text-white font-bold rounded-full"
                        >
                            Browse Menu
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
