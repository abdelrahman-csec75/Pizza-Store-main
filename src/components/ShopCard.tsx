import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TicketPercent } from 'lucide-react';

interface PromoOffer {
    id: string;
    title: string;
    description: string;
    discount: string;
    image: string;
    bgColor: string;
}

export const ShopCard = ({ offer }: { offer: PromoOffer }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden rounded-[2rem] p-8 md:p-10 ${offer.bgColor} shadow-2xl flex flex-col md:flex-row items-center gap-8 group`}
        >
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <TicketPercent className="w-32 h-32" />
            </div>

            <div className="flex-1 relative z-10 text-white space-y-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-bold tracking-wider uppercase mb-2">
                    Limited Time
                </span>
                <h2 className="font-display font-black text-4xl md:text-5xl leading-tight">
                    {offer.title}
                </h2>
                <p className="text-white/80 text-lg max-w-sm leading-relaxed">
                    {offer.description}
                </p>
                <div className="pt-4">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all group/btn"
                    >
                        Claim Offer
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </div>

            <div className="w-full md:w-1/2 relative z-10 flex justify-center mt-8 md:mt-0">
                <motion.img
                    initial={{ rotate: -10, y: 10 }}
                    animate={{ rotate: 0, y: 0 }}
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    src={offer.image}
                    alt={offer.title}
                    className="w-64 md:w-80 object-cover drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />

                <div className="absolute -top-6 -right-6 bg-secondary text-slate-900 w-24 h-24 rounded-full flex flex-col items-center justify-center font-black shadow-xl shrink-0 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <span className="text-3xl leading-none">{offer.discount}</span>
                    <span className="text-sm uppercase tracking-wider">OFF</span>
                </div>
            </div>
        </motion.div>
    );
};
