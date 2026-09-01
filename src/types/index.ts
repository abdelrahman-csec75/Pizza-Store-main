export interface Pizza {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    category: 'vegetarian' | 'meat' | 'vegan' | 'seafood';
    isSpicy?: boolean;
}

export interface CartItem extends Pizza {
    cartItemId: string;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role?: 'user' | 'admin';
    balance: number;
    avatar?: string;
}

export interface Order {
    id: string;
    date: string;
    items: { pizzaId: string; quantity: number }[];
    total: number;
    status: 'preparing' | 'baking' | 'ready' | 'delivered';
}
