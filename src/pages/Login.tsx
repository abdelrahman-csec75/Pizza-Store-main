import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Pizza, ArrowRight, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('100');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login, register, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (isLogin) {
                const res = await login(email, password);
                if (!res.success) {
                    setError(res.error || 'Invalid email or password.');
                } else {
                    navigate('/dashboard');
                }
            } else {
                if (!name.trim()) {
                    setError('Please enter your full name.');
                    setIsLoading(false);
                    return;
                }
                const initialBalance = parseFloat(balance);
                if (isNaN(initialBalance) || initialBalance < 0) {
                    setError('Initial balance must be a non-negative number.');
                    setIsLoading(false);
                    return;
                }
                const res = await register(name, email, password, initialBalance);
                if (!res.success) {
                    setError(res.error || 'Registration failed.');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err: any) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (user) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-orange-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6"
                >
                    <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl text-primary-500">👋</span>
                    </div>
                    <h2 className="text-3xl font-display font-black text-slate-900">
                        Welcome back, <br />
                        <span className="text-primary-500">{user.name}</span>!
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Ready for your next delicious slice?
                    </p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary-500 transition-colors flex items-center justify-center gap-2 group"
                    >
                        Go to Dashboard
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] pt-20 flex bg-orange-50/50">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <Pizza className="h-12 w-12 text-primary-500 mx-auto" />
                        <h2 className="mt-8 text-3xl font-display font-black text-slate-900 tracking-tight">
                            {isLogin ? 'Welcome back!' : 'Join the PizzaHub'}
                        </h2>
                        <p className="mt-2 text-slate-600">
                            {isLogin ? "Let's get your favorite pizza order ready." : "Sign up for exclusive deals and faster checkout."}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-xl flex items-center gap-2.5"
                                    >
                                        <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!isLogin && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">Full Name</label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-slate-50 text-slate-900"
                                                placeholder="John Doe"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">Initial Balance ($)</label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                                                $
                                            </div>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                step="0.01"
                                                className="block w-full pl-8 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-slate-50 text-slate-900"
                                                placeholder="100.00"
                                                value={balance}
                                                onChange={(e) => setBalance(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700">Email Address</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-slate-50 text-slate-900"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">Password</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow bg-slate-50 text-slate-900"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {isLogin && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                                    </>
                                ) : (
                                    <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-slate-600">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError(null);
                                    }}
                                    className="font-bold text-primary-600 hover:text-primary-500"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2000&auto=format&fit=crop"
                    alt="Delicious pizza"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/90 to-transparent lg:from-transparent lg:to-transparent lg:bg-slate-900/40 mix-blend-multiply" />
            </div>
        </div>
    );
};
