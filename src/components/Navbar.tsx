import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Pizza, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 glass-effect">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ rotate: 90 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <Pizza className="h-8 w-8 text-primary-500 fill-primary-500/20" />
                            </motion.div>
                            <span className="font-display font-bold text-2xl tracking-tight text-dark">
                                PIZZA<span className="text-primary-500">HUB</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }: { isActive: boolean }) =>
                                    clsx(
                                        "font-medium transition-colors hover:text-primary-500",
                                        isActive ? "text-primary-600" : "text-slate-600"
                                    )
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/cart" className="relative text-slate-600 hover:text-primary-500 transition-colors">
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-primary-750 font-black rounded-full text-sm border border-orange-200 shadow-sm shrink-0">
                                    <span>💳</span>
                                    <span>${(user.balance || 0).toFixed(2)}</span>
                                </div>
                                <Link to="/dashboard" className="flex items-center gap-2 text-slate-700 hover:text-primary-600 font-medium">
                                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-primary-100 bg-orange-50 shrink-0" />
                                    <span>Hi, {user.name.split(' ')[0]}</span>
                                </Link>
                                <button
                                    onClick={() => { logout(); navigate('/'); }}
                                    className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-full hover:bg-primary-50 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-6 py-2.5 bg-primary-500 text-white font-medium rounded-full shadow-lg shadow-primary-500/30 hover:bg-primary-600 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <Link to="/cart" className="relative text-slate-600">
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={toggleMenu} className="text-slate-600 hover:text-primary-500">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }: { isActive: boolean }) =>
                                        clsx(
                                            "block px-3 py-2.5 rounded-xl font-medium",
                                            isActive ? "bg-primary-50 text-primary-600" : "text-slate-600 hover:bg-slate-50 hover:text-primary-500"
                                        )
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-2 px-3 py-2 text-slate-900 font-bold bg-orange-50 rounded-xl">
                                            <span>💳 Balance:</span>
                                            <span className="text-primary-600">${(user.balance || 0).toFixed(2)}</span>
                                        </div>
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-slate-700 font-medium"
                                        >
                                            <User className="h-5 w-5" />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setIsOpen(false); navigate('/'); }}
                                            className="w-full text-left px-3 py-2 text-primary-600 font-medium"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-center px-4 py-3 bg-primary-500 text-white font-medium rounded-xl"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
