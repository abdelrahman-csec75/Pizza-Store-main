import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PizzaCard } from '../components/PizzaCard';
import { Pizza } from '../types';
import { useCart } from '../context/CartContext';
import { Search, Filter, UtensilsCrossed, Loader2 } from 'lucide-react';

export const Menu = () => {
    const { addToCart } = useCart();
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['all', 'meat', 'vegetarian', 'vegan', 'seafood'];

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/pizzas')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const fetchedPizzas = data.data.map((p: any) => ({
                        id: p._id,
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        image: p.image !== 'no-image.jpg' ? p.image : 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
                        rating: 4.5,
                        category: p.category.toLowerCase(),
                        isSpicy: false
                    }));
                    setPizzas(fetchedPizzas);
                }
            })
            .catch(err => console.error('Error fetching menu:', err))
            .finally(() => setIsLoading(false));
    }, []);

    const filteredPizzas = pizzas.filter(pizza => {
        const matchesCategory = activeCategory === 'all' || pizza.category === activeCategory;
        const matchesSearch = pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pizza.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="pt-24 pb-20 min-h-screen bg-orange-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-black text-slate-900 mb-6"
                    >
                        Our Full <span className="text-primary-500">Menu</span>
                    </motion.h1>
                    <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                        Explore our curated selection of artisan pizzas, each crafted with premium ingredients and wood-fired to perfection.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    {/* Category Tabs */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                    : 'bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search pizzas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                    </div>
                </div>

                {/* Pizza Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                    </div>
                ) : (
                    <AnimatePresence mode='wait'>
                        {filteredPizzas.length > 0 ? (
                            <motion.div
                                key={activeCategory + searchQuery}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            >
                                {filteredPizzas.map((pizza) => (
                                    <PizzaCard key={pizza.id} pizza={pizza} onAdd={addToCart} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-20 text-center"
                            >
                                <UtensilsCrossed className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">No pizzas found</h3>
                                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

            </div>
        </div>
    );
};
