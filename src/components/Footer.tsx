import React from 'react';
import { Link } from 'react-router-dom';
import { Pizza, Instagram, Twitter, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-dark text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 group mb-6">
                            <Pizza className="h-8 w-8 text-primary-500" />
                            <span className="font-display font-bold text-2xl tracking-tight text-white">
                                PIZZA<span className="text-primary-500">HUB</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Serving the most delicious hand-tossed pizzas in town.
                            Baked with love and fresh ingredients since 2010.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:-translate-y-1 transition-all text-white">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#00acee] hover:text-white hover:-translate-y-1 transition-all text-white">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-white hover:text-blue-600 hover:-translate-y-1 transition-all text-white">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-display font-semibold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>Home</Link></li>
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>Contact</Link></li>
                            <li><Link to="/cart" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>My Cart</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-display font-semibold text-lg mb-6">Contact Info</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
                                <span>123 Pizza Street, Food City, FC 12345</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                                <span>hello@pizzahub.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-display font-semibold text-lg mb-6">Opening Hours</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between border-b border-slate-800 pb-2">
                                <span>Mon - Fri:</span>
                                <span className="text-white font-medium">10:00 AM - 11:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-800 pb-2">
                                <span>Saturday:</span>
                                <span className="text-white font-medium">10:00 AM - 12:00 AM</span>
                            </li>
                            <li className="flex justify-between pb-2">
                                <span>Sunday:</span>
                                <span className="text-white font-medium">11:00 AM - 10:00 PM</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>&copy; {new Date().getFullYear()} PizzaHub. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
