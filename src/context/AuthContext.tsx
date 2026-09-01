import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthResponse {
    success: boolean;
    error?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (name: string, email: string, password: string, balance: number) => Promise<AuthResponse>;
    logout: () => void;
    updateBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Verify existing token on initial load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            fetch('/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success && data.data) {
                        setToken(storedToken);
                        setUser({
                            id: data.data._id || data.data.id,
                            name: data.data.name,
                            email: data.data.email,
                            role: data.data.role,
                            balance: data.data.balance || 0,
                            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.data.name)}`,
                        });
                    } else {
                        localStorage.removeItem('token');
                        setToken(null);
                        setUser(null);
                    }
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                const errorMessage =
                    data.error ||
                    (data.errors && data.errors[0]?.msg) ||
                    'Invalid email or password.';
                return { success: false, error: errorMessage };
            }

            const userObj: User = {
                id: data.user.id || data.user._id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role,
                balance: data.user.balance || 0,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.user.name)}`,
            };

            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(userObj);

            return { success: true };
        } catch (err: any) {
            return {
                success: false,
                error: err.message || 'Unable to connect to server. Please check your connection.',
            };
        }
    };

    const register = async (name: string, email: string, password: string, balance: number): Promise<AuthResponse> => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, balance }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                const errorMessage =
                    data.error ||
                    (data.errors && data.errors[0]?.msg) ||
                    'Registration failed. Please check your details.';
                return { success: false, error: errorMessage };
            }

            const userObj: User = {
                id: data.user.id || data.user._id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role,
                balance: data.user.balance || 0,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.user.name)}`,
            };

            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(userObj);

            return { success: true };
        } catch (err: any) {
            return {
                success: false,
                error: err.message || 'Unable to connect to server. Please check your connection.',
            };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'GET' });
        } catch (error) {
            console.error('Error logging out:', error);
        }
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const updateBalance = (newBalance: number) => {
        setUser((prev) => {
            if (!prev) return null;
            return { ...prev, balance: newBalance };
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, updateBalance }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
