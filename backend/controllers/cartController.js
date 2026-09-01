/**
 * @file cartController.js
 * @description Controller functions for shopping cart operations.
 */

const Cart = require('../models/Cart');
const Pizza = require('../models/Pizza');
const ErrorResponse = require('../utils/errorResponse');

/**
 * Helper function to recalculate the total price of cart items
 * @param {Array} items - Array of cart item objects containing pizzaId, quantity, size
 * @returns {Promise<number>} - Calculated total price
 */
const calculateTotalPrice = async (items) => {
  let totalPrice = 0;
  for (const item of items) {
    const pizza = await Pizza.findById(item.pizzaId);
    if (pizza) {
      totalPrice += pizza.price * item.quantity;
    }
  }
  return totalPrice;
};

/**
 * @desc    Get user cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      'items.pizzaId',
      'name price image'
    );

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { items: [], totalPrice: 0 }
      });
    }

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart/add
 * @access  Private
 */
const addToCart = async (req, res, next) => {
  try {
    const { pizzaId, quantity = 1, size = 'medium' } = req.body;

    if (!pizzaId) {
      return next(new ErrorResponse('Please provide a pizzaId', 400));
    }

    // Verify pizza exists and is available
    const pizza = await Pizza.findById(pizzaId);

    if (!pizza) {
      return next(new ErrorResponse(`Pizza not found with id of ${pizzaId}`, 404));
    }

    if (!pizza.available) {
      return next(new ErrorResponse('Pizza is currently unavailable', 400));
    }

    // Find or create cart for the logged-in user
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [],
        totalPrice: 0
      });
    }

    // Check if item with same pizzaId AND same size already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.pizzaId.toString() === pizzaId.toString() && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        pizzaId,
        quantity: Number(quantity),
        size
      });
    }

    // Recalculate total price
    cart.totalPrice = await calculateTotalPrice(cart.items);

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update cart item quantity/size
 * @route   PUT /api/cart/update
 * @access  Private
 */
const updateCart = async (req, res, next) => {
  try {
    const { pizzaId, quantity, size } = req.body;

    if (!pizzaId) {
      return next(new ErrorResponse('Please provide a pizzaId', 400));
    }

    // Find user's cart
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return next(new ErrorResponse('Cart not found', 404));
    }

    // Find item matching pizzaId (and optionally size if provided)
    const itemIndex = cart.items.findIndex((item) => {
      const matchId = item.pizzaId.toString() === pizzaId.toString();
      return size ? matchId && item.size === size : matchId;
    });

    if (itemIndex === -1) {
      return next(new ErrorResponse('Item not found in cart', 404));
    }

    // Update quantity and size if provided
    if (quantity !== undefined) {
      cart.items[itemIndex].quantity = Number(quantity);
    }
    if (size !== undefined) {
      cart.items[itemIndex].size = size;
    }

    // Recalculate total price
    cart.totalPrice = await calculateTotalPrice(cart.items);

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove item from cart by pizzaId
 * @route   DELETE /api/cart/remove/:pizzaId
 * @access  Private
 */
const removeFromCart = async (req, res, next) => {
  try {
    const { pizzaId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return next(new ErrorResponse('Cart not found', 404));
    }

    // Filter out items with matching pizzaId
    cart.items = cart.items.filter(
      (item) => item.pizzaId.toString() !== pizzaId.toString()
    );

    // Recalculate total price
    cart.totalPrice = await calculateTotalPrice(cart.items);

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear all items from user's cart
 * @route   DELETE /api/cart/clear
 * @access  Private
 */
const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { items: [], totalPrice: 0 }
      });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  calculateTotalPrice,
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart
};
