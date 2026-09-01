import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    return (
        <div className="min-h-screen pt-20 bg-orange-50/30">

            {/* Page Header */}
            <section className="bg-slate-900 py-20 text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=2000&auto=format&fit=crop')] opacity-10 object-cover bg-center"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-black text-white mb-6">
                            Get in <span className="text-primary-500">Touch</span>
                        </h1>
                        <p className="text-xl text-slate-300">
                            Have a question about our menu, catering, or just want to say hi? We'd love to hear from you!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Contact Information & Hours */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-3xl font-display font-black text-slate-900 mb-8">Reach Out to Us</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Location</h3>
                                        <p className="text-slate-600 mt-1 leading-relaxed">
                                            123 Pizza Street, Food City,<br />
                                            State, FC 12345
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    <div className="bg-green-100 p-3 rounded-full text-green-600 shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Phone Number</h3>
                                        <p className="text-slate-600 mt-1">
                                            +1 (555) 123-4567<br />
                                            <span className="text-sm text-slate-400">Available during operating hours</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                                    <div className="bg-blue-100 p-3 rounded-full text-blue-600 shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Email</h3>
                                        <p className="text-slate-600 mt-1">
                                            hello@pizzahub.com<br />
                                            <span className="text-sm text-slate-400">We'll respond within 24 hours</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-dark text-white rounded-[2rem] p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Clock className="w-32 h-32" />
                            </div>
                            <h3 className="text-2xl font-display font-black mb-6 relative z-10">Operating Hours</h3>
                            <ul className="space-y-4 relative z-10 text-slate-300">
                                <li className="flex justify-between border-b border-slate-700 pb-3">
                                    <span>Monday - Friday</span>
                                    <span className="font-medium text-white">10:00 AM - 11:00 PM</span>
                                </li>
                                <li className="flex justify-between border-b border-slate-700 pb-3">
                                    <span>Saturday</span>
                                    <span className="font-medium text-white">10:00 AM - 12:00 AM</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-medium text-white">11:00 AM - 10:00 PM</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                            <h2 className="text-3xl font-display font-black text-slate-900 mb-2">Send a Message</h2>
                            <p className="text-slate-500 mb-8">Fill out the form below and we will contact you shortly.</p>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-50 text-green-800 p-8 rounded-2xl flex flex-col items-center text-center space-y-4"
                                >
                                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                                    <h3 className="text-2xl font-bold">Message Sent!</h3>
                                    <p>Thank you for reaching out. Our team will get back to you as soon as possible.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">First Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="John"
                                                className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Last Name</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Doe"
                                                className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="hello@example.com"
                                            className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="How can we help?"
                                            className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            placeholder="Write your message here..."
                                            className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                                        ></textarea>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-4 bg-primary-500 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 group"
                                    >
                                        Send Message
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};
