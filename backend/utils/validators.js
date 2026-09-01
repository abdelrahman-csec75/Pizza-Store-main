const { body, param } = require('express-validator');

/**
 * Validation rules for user registration
 */
const registerRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('balance')
    .notEmpty()
    .withMessage('Initial balance is required')
    .isFloat({ min: 0 })
    .withMessage('Balance must be a non-negative number'),
];

/**
 * Validation rules for user login
 */
const loginRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

/**
 * Validation rules for creating a new Pizza
 */
const createPizzaRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Pizza name is required'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Classic', 'Specialty', 'Veggie', 'BBQ', 'Seafood'])
    .withMessage('Category must be one of: Classic, Specialty, Veggie, BBQ, Seafood'),
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('Ingredients must be a non-empty array'),
];

/**
 * Validation rules for updating an existing Pizza (all fields optional)
 */
const updatePizzaRules = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Pizza name cannot be empty'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0'),
  body('category')
    .optional()
    .trim()
    .isIn(['Classic', 'Specialty', 'Veggie', 'BBQ', 'Seafood'])
    .withMessage('Category must be one of: Classic, Specialty, Veggie, BBQ, Seafood'),
  body('ingredients')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Ingredients must be a non-empty array'),
];

/**
 * Validation rules for adding an item to the cart
 */
const addToCartRules = [
  body('pizzaId')
    .notEmpty()
    .withMessage('Pizza ID is required')
    .isMongoId()
    .withMessage('Invalid Pizza ID format'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be an integer of at least 1'),
  body('size')
    .optional()
    .isIn(['small', 'medium', 'large'])
    .withMessage('Size must be small, medium, or large'),
];

/**
 * Validation rules for updating an item in the cart
 */
const updateCartRules = [
  body('pizzaId')
    .notEmpty()
    .withMessage('Pizza ID is required')
    .isMongoId()
    .withMessage('Invalid Pizza ID format'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be an integer of at least 1'),
  body('size')
    .optional()
    .isIn(['small', 'medium', 'large'])
    .withMessage('Size must be small, medium, or large'),
];

module.exports = {
  registerRules,
  loginRules,
  createPizzaRules,
  updatePizzaRules,
  addToCartRules,
  updateCartRules,
  body,
  param,
};
