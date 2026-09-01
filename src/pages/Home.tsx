import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Pizza as PizzaIcon, CheckCircle2 } from 'lucide-react';
import { PizzaCard } from '../components/PizzaCard';
import { ShopCard } from '../components/ShopCard';
import { Pizza } from '../types';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [featuredPizzas, setFeaturedPizzas] = useState<Pizza[]>([]);

    useEffect(() => {
        fetch('/api/pizzas')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const fetchedPizzas = data.data.slice(0, 6).map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        image: p.image !== 'no-image.jpg' ? p.image : 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
                        rating: 4.8,
                        category: p.category.toLowerCase(),
                        isSpicy: false
                    }));
                    setFeaturedPizzas(fetchedPizzas);
                }
            })
            .catch(err => console.error('Error fetching pizzas:', err));
    }, []);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=2000&auto=format&fit=crop"
                        alt="Pizza background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-2 text-primary-500 font-bold tracking-wider uppercase mb-4">
                                <Flame className="h-6 w-6" />
                                <span>Hot & Ready in 30 minutes</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8">
                                Slice of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary">Heaven</span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
                                Hand-tossed artisan pizzas made with San Marzano tomatoes, fresh mozzarella, and a whole lot of love.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => navigate('/menu')}
                                    className="px-8 py-4 bg-primary-500 text-white font-bold rounded-full text-lg hover:bg-primary-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-500/30 group"
                                >
                                    Order Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Popular Menu Section */}
            <section className="py-24 bg-orange-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Most Popular <span className="text-primary-500">Pizzas</span></h2>
                        <p className="text-lg text-slate-600">
                            Discover our most loved creations, baked to perfection in our traditional wood-fired oven.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredPizzas.map((pizza, index) => (
                            <motion.div
                                key={pizza.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <PizzaCard pizza={pizza} onAdd={addToCart} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate('/menu')}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded-full hover:border-primary-500 hover:text-primary-500 transition-colors shadow-sm"
                        >
                            View Full Menu
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Our Story / Features */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1000&auto=format&fit=crop"
                                alt="Chef making pizza"
                                className="rounded-[3rem] shadow-2xl"
                            />
                            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl max-w-xs hidden md:block">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-slate-900">Premium Quality</h4>
                                </div>
                                <p className="text-slate-600 text-sm">100% organic ingredients sourced directly from local Italian farms.</p>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                                The secret is in the <span className="text-primary-500">dough</span>.
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Since 1995, we've been crafting authentic Neapolitan pizzas. Our dough is fermented for 48 hours, yielding a light, airy crust with the perfect amount of chew and char.
                            </p>
                            
                            <ul className="space-y-4">
                                {[
                                    'Wood-fired at 900°F for authentic char',
                                    'San Marzano tomatoes imported from Italy',
                                    'Hand-stretched dough made fresh daily',
                                    'Locally sourced organic vegetables'
                                ].map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3 text-slate-700 font-medium"
                                    >
                                        <PizzaIcon className="w-5 h-5 text-primary-500 shrink-0" />
                                        {feature}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
