import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Pizza } from '../types';
import clsx from 'clsx';

interface PizzaCardProps {
    pizza: Pizza;
    onAdd: (pizza: Pizza) => void;
}

export const PizzaCard = ({ pizza, onAdd }: PizzaCardProps) => {
    const navigate = useNavigate();

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full group transition-all"
        >
            <div className="relative mb-6 self-center">
                <motion.div
                    className="absolute inset-0 bg-primary-100/50 rounded-full scale-75 blur-2xl group-hover:scale-100 group-hover:bg-primary-200/50 transition-all duration-500"
                />
                <motion.img
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-48 h-48 object-cover rounded-full z-10 relative drop-shadow-2xl filter"
                />
                {pizza.isSpicy && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20 shadow-lg shadow-red-500/30">
                        Spicy 🔥
                    </span>
                )}
            </div>

            <div className="flex-grow flex flex-col mt-4">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-display font-bold text-xl text-slate-900 leading-tight">
                        {pizza.name}
                    </h3>
                    <span className="flex items-center gap-1 text-sm font-medium bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full shrink-0">
                        <Star className="h-3 w-3 fill-current" />
                        {pizza.rating}
                    </span>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {pizza.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-display font-bold text-2xl text-slate-900">
                        ${pizza.price.toFixed(2)}
                    </span>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            onAdd(pizza);
                            navigate('/cart');
                        }}
                        className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-primary-500 shadow-lg hover:shadow-primary-500/30 transition-all group/btn"
                    >
                        <ShoppingCart className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
