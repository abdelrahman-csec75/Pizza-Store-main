/**
 * @file orderController.js
 * @description Controllers for placing orders with balance validation, atomic deduction, and retrieving orders.
 */

const Order = require('../models/Order');
const Pizza = require('../models/Pizza');
const User = require('../models/User');
const Cart = require('../models/Cart');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Create/Place a new order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return next(new ErrorResponse('Please provide at least one pizza item to order', 400));
    }

    // Authoritative backend price calculation & verification
    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const pizzaId = item.pizzaId || item.id || item._id;
      const quantity = parseInt(item.quantity, 10);
      const size = item.size && ['small', 'medium', 'large'].includes(item.size) ? item.size : 'medium';

      if (!pizzaId || isNaN(quantity) || quantity <= 0) {
        return next(new ErrorResponse('Invalid item details provided', 400));
      }

      // Fetch pizza document directly from DB to get authoritative price
      const pizza = await Pizza.findById(pizzaId);
      if (!pizza || !pizza.available) {
        return next(new ErrorResponse(`Pizza not available: ${item.name || pizzaId}`, 400));
      }

      const itemTotal = pizza.price * quantity;
      calculatedSubtotal += itemTotal;

      validatedItems.push({
        pizzaId: pizza._id,
        name: pizza.name,
        price: pizza.price,
        quantity,
        size,
      });
    }

    const calculatedTax = Number((calculatedSubtotal * 0.08).toFixed(2));
    const deliveryFee = calculatedSubtotal > 0 ? 5.00 : 0;
    const calculatedTotal = Number((calculatedSubtotal + calculatedTax + deliveryFee).toFixed(2));

    // Atomic balance deduction: only succeeds if user's balance >= calculatedTotal
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.user.id,
        balance: { $gte: calculatedTotal },
      },
      {
        $inc: { balance: -calculatedTotal },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      // Fetch user to confirm whether account exists vs insufficient funds
      const currentUser = await User.findById(req.user.id);
      if (!currentUser) {
        return next(new ErrorResponse('User account not found', 404));
      }
      return next(
        new ErrorResponse(
          `Insufficient balance. Order total is $${calculatedTotal.toFixed(2)}, but your current balance is $${currentUser.balance.toFixed(2)}.`,
          400
        )
      );
    }

    // Create and save the order in database
    const order = await Order.create({
      userId: req.user.id,
      items: validatedItems,
      subtotal: calculatedSubtotal,
      tax: calculatedTax,
      deliveryFee,
      total: calculatedTotal,
      status: 'preparing',
    });

    // Clear user's database cart if one exists
    try {
      await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [], totalPrice: 0 });
    } catch (cartErr) {
      // Non-blocking if cart model doesn't exist for user
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order,
      updatedBalance: updatedUser.balance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders for the current authenticated user
 * @route   GET /api/orders
 * @access  Private
 */
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};
