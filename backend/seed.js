/**
 * @file seed.js
 * @description Database seeding script to populate initial users and pizzas.
 * Execute using command: npm run seed or node seed.js
 */

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Pizza = require('./models/Pizza');

// Load environment variables
dotenv.config();

// Connect to MongoDB database
connectDB();

// Seed data
const usersData = [
  // 1 Admin user
  {
    name: 'Admin User',
    email: 'admin@pizzahub.com',
    password: 'admin123',
    role: 'admin',
    balance: 500,
  },
  // 5 Normal users
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    balance: 150,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    balance: 100,
  },
  {
    name: 'Michael Brown',
    email: 'michael@example.com',
    password: 'password123',
    role: 'user',
    balance: 75,
  },
  {
    name: 'Emily Davis',
    email: 'emily@example.com',
    password: 'password123',
    role: 'user',
    balance: 120,
  },
  {
    name: 'David Wilson',
    email: 'david@example.com',
    password: 'password123',
    role: 'user',
    balance: 50,
  },
];

const pizzasData = [
  // --- Classic (3) ---
  {
    name: 'Margherita',
    description:
      'Classic Italian pizza topped with rich tomato sauce, fresh mozzarella cheese, and sweet basil leaves.',
    price: 10.99,
    image: 'margherita.jpg',
    category: 'Classic',
    ingredients: ['Tomato Sauce', 'Fresh Mozzarella', 'Basil', 'Olive Oil'],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Pepperoni',
    description:
      'Timeless favorite loaded with savory tomato sauce, melted mozzarella, and generous slices of crispy pepperoni.',
    price: 12.99,
    image: 'pepperoni.jpg',
    category: 'Classic',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Oregano'],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Hawaiian',
    description:
      'Sweet and savory combination of sliced ham, juicy pineapple chunks, tomato sauce, and melted mozzarella.',
    price: 13.99,
    image: 'hawaiian.jpg',
    category: 'Classic',
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Ham', 'Pineapple'],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },

  // --- Specialty (3) ---
  {
    name: 'Truffle Mushroom',
    description:
      'Gourmet pie featuring wild roasted mushrooms, truffle cream sauce, garlic, mozzarella, and fresh parsley.',
    price: 17.99,
    image: 'truffle-mushroom.jpg',
    category: 'Specialty',
    ingredients: [
      'Truffle Cream Sauce',
      'Wild Mushrooms',
      'Garlic',
      'Mozzarella',
      'Parsley',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Four Cheese',
    description:
      'Rich blend of mozzarella, creamy gorgonzola, aged parmesan, and velvety ricotta on garlic olive oil base.',
    price: 15.99,
    image: 'four-cheese.jpg',
    category: 'Specialty',
    ingredients: ['Mozzarella', 'Gorgonzola', 'Parmesan', 'Ricotta', 'Garlic Oil'],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Prosciutto & Arugula',
    description:
      'Crispy crust topped with mozzarella, thinly sliced Italian prosciutto, fresh arugula, and shaved parmesan.',
    price: 18.99,
    image: 'prosciutto-arugula.jpg',
    category: 'Specialty',
    ingredients: [
      'Mozzarella',
      'Prosciutto',
      'Fresh Arugula',
      'Shaved Parmesan',
      'Balsamic Glaze',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },

  // --- Veggie (3) ---
  {
    name: 'Garden Fresh',
    description:
      'Loaded with colorful bell peppers, crisp red onions, sliced mushrooms, black olives, and juicy tomatoes.',
    price: 11.99,
    image: 'garden-fresh.jpg',
    category: 'Veggie',
    ingredients: [
      'Tomato Sauce',
      'Mozzarella',
      'Bell Peppers',
      'Red Onions',
      'Mushrooms',
      'Black Olives',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Mediterranean',
    description:
      'Flavorful pie with spinach, crumbled feta cheese, kalamata olives, sun-dried tomatoes, and garlic.',
    price: 14.99,
    image: 'mediterranean.jpg',
    category: 'Veggie',
    ingredients: [
      'Olive Oil',
      'Spinach',
      'Feta Cheese',
      'Kalamata Olives',
      'Sun-dried Tomatoes',
      'Garlic',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Spinach & Artichoke',
    description:
      'Creamy white sauce base topped with tender artichoke hearts, fresh baby spinach, mozzarella, and parmesan.',
    price: 13.99,
    image: 'spinach-artichoke.jpg',
    category: 'Veggie',
    ingredients: [
      'White Sauce',
      'Baby Spinach',
      'Artichoke Hearts',
      'Mozzarella',
      'Parmesan',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },

  // --- BBQ (3) ---
  {
    name: 'BBQ Chicken',
    description:
      'Tender grilled chicken breast tossed in smoky BBQ sauce with red onions, mozzarella, and fresh cilantro.',
    price: 14.99,
    image: 'bbq-chicken.jpg',
    category: 'BBQ',
    ingredients: ['BBQ Sauce', 'Grilled Chicken', 'Red Onions', 'Mozzarella', 'Cilantro'],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Smoky Bacon',
    description:
      'Crispy bacon bits, smoked gouda cheese, caramelized red onions, mozzarella, and a drizzle of tangy BBQ sauce.',
    price: 15.99,
    image: 'smoky-bacon.jpg',
    category: 'BBQ',
    ingredients: [
      'BBQ Sauce',
      'Crispy Bacon',
      'Smoked Gouda',
      'Caramelized Onions',
      'Mozzarella',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Texas BBQ Brisket',
    description:
      'Slow-cooked smoked brisket, sweet & spicy Texas BBQ sauce, spicy jalapeños, red onions, and melted cheddar.',
    price: 17.99,
    image: 'texas-brisket.jpg',
    category: 'BBQ',
    ingredients: [
      'Texas BBQ Sauce',
      'Smoked Brisket',
      'Jalapeños',
      'Red Onions',
      'Cheddar',
      'Mozzarella',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },

  // --- Seafood (3) ---
  {
    name: 'Shrimp Scampi',
    description:
      'Succulent sautéed shrimp, rich garlic butter sauce, red pepper flakes, fresh parsley, and melted mozzarella.',
    price: 16.99,
    image: 'shrimp-scampi.jpg',
    category: 'Seafood',
    ingredients: [
      'Garlic Butter Sauce',
      'Sautéed Shrimp',
      'Red Pepper Flakes',
      'Parsley',
      'Mozzarella',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Smoked Salmon',
    description:
      'Delicate smoked salmon slices over dill cream sauce, topped with capers, red onion rings, and mozzarella.',
    price: 18.99,
    image: 'smoked-salmon.jpg',
    category: 'Seafood',
    ingredients: [
      'Dill Cream Sauce',
      'Smoked Salmon',
      'Capers',
      'Red Onions',
      'Mozzarella',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
  {
    name: 'Tuna & Olive',
    description:
      'Mediterranean favorite with premium tuna flakes, kalamata olives, red onions, oregano, and mozzarella.',
    price: 12.99,
    image: 'tuna-olive.jpg',
    category: 'Seafood',
    ingredients: [
      'Tomato Sauce',
      'Tuna Flakes',
      'Kalamata Olives',
      'Red Onions',
      'Oregano',
      'Mozzarella',
    ],
    sizes: ['small', 'medium', 'large'],
    available: true,
  },
];

/**
 * Main seeding function
 */
const seedDB = async () => {
  try {
    // Delete existing users and pizzas
    await User.deleteMany({});
    await Pizza.deleteMany({});
    console.log('Cleared existing users and pizzas from database.');

    // Seed Users (1 admin + 5 normal users)
    const createdUsers = await User.create(usersData);
    console.log(`Seeded ${createdUsers.length} users successfully.`);

    // Seed Pizzas (15 pizzas across 5 categories)
    const createdPizzas = await Pizza.create(pizzasData);
    console.log(`Seeded ${createdPizzas.length} pizzas successfully.`);

    console.log('Database seeding process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error during database seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
