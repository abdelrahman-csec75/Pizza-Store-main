import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Heart, ShieldCheck, Flame, Users } from 'lucide-react';

export const About = () => {
    const values = [
        {
            icon: <Leaf className="w-8 h-8 text-green-500" />,
            title: 'Fresh Ingredients',
            description: 'We source the highest quality, farm-fresh ingredients locally and from authentic Italian producers.',
        },
        {
            icon: <Award className="w-8 h-8 text-yellow-500" />,
            title: 'Artisan Craftsmanship',
            description: 'Every pizza is meticulously handcrafted by our passionate pizzaiolos who mastered the art of dough.',
        },
        {
            icon: <Heart className="w-8 h-8 text-red-500" />,
            title: 'Baked with Love',
            description: 'We believe that the secret ingredient to any remarkable dish is the passion and love poured into it.',
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
            title: 'Uncompromised Quality',
            description: 'From our wood-fired ovens to your table, we maintain the highest standards in every slice.',
        },
    ];

    return (
        <div className="pt-20 bg-orange-50/30">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542834369-f10ebf06d3e0?q=80&w=2000&auto=format&fit=crop"
                        alt="People enjoying pizza"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6">
                            Our <span className="text-primary-500">Story</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed">
                            More than just a pizzeria, we are a family dedicated to bringing people together over the universal language of incredible food.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Brand Identity / Our Story */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-bold uppercase tracking-wider text-sm">
                            <Flame className="w-5 h-5" />
                            Est. 2010
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
                            A Decade of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary">Culinary Excellence</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            It all started with a simple wood-fired oven in a small neighborhood and a dream to craft the perfect pizza. We spent years perfecting our dough recipe—allowing it to ferment slowly for 72 hours, creating that signature airy, charred, and crispy crust.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            At PizzaHub, we don't just serve food; we serve memories. Every crackle of the wood fire, every bubble in the dough, and every freshly torn basil leaf is a testament to our relentless pursuit of authenticity.
                        </p>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                            <div className="space-y-2">
                                <h4 className="text-4xl font-black text-slate-900">1M+</h4>
                                <p className="text-slate-500 font-medium">Pizzas Served</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-4xl font-black text-slate-900">50+</h4>
                                <p className="text-slate-500 font-medium">Unique Recipes</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary-500 rounded-[3rem] rotate-3 blur-sm opacity-20"></div>
                        <img
                            src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1000&auto=format&fit=crop"
                            alt="Artisan pizza making"
                            className="relative z-10 w-full rounded-[3rem] shadow-2xl object-cover h-[600px]"
                        />
                        {/* Floating Badge */}
                        <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-slate-100 hidden md:flex">
                            <div className="bg-orange-100 p-4 rounded-full text-orange-600">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase">Community</p>
                                <p className="text-xl font-black text-slate-900">Loved by locals</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-display font-black">Our Core Values</h2>
                        <p className="text-slate-400 text-lg">
                            The principles that define who we are and guide every decision we make in our kitchen.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.6 }}
                                className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:bg-slate-800 transition-colors group"
                            >
                                <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 font-display">{value.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-600"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513104890d38-7c0f4fff45f1?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white">
                            Taste the passion today.
                        </h2>
                        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                            Join thousands of happy customers who have made PizzaHub their go-to spot for authentic, delicious moments.
                        </p>
                        <div className="pt-4">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-10 py-5 bg-white text-primary-600 font-black text-lg rounded-full shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all w-full sm:w-auto"
                            >
                                Order Your Favorite Pizza
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
