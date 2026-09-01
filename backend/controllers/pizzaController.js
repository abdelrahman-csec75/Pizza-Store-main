/**
 * @file pizzaController.js
 * @description Controller functions for Pizza CRUD operations.
 */

const Pizza = require('../models/Pizza');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Get all pizzas (with optional query filters for category and availability)
 * @route   GET /api/pizzas
 * @access  Public
 */
const getPizzas = async (req, res, next) => {
  try {
    // Build query object from req.query
    const query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.available !== undefined) {
      query.available = req.query.available === 'true';
    }

    // Find pizzas matching query and sort by createdAt descending
    const pizzas = await Pizza.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pizzas.length,
      data: pizzas
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single pizza by ID
 * @route   GET /api/pizzas/:id
 * @access  Public
 */
const getPizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return next(
        new ErrorResponse(`Pizza not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: pizza
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new pizza
 * @route   POST /api/pizzas
 * @access  Private/Admin
 */
const createPizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.create(req.body);

    res.status(201).json({
      success: true,
      data: pizza
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update pizza by ID
 * @route   PUT /api/pizzas/:id
 * @access  Private/Admin
 */
const updatePizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!pizza) {
      return next(
        new ErrorResponse(`Pizza not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: pizza
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete pizza by ID
 * @route   DELETE /api/pizzas/:id
 * @access  Private/Admin
 */
const deletePizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return next(
        new ErrorResponse(`Pizza not found with id of ${req.params.id}`, 404)
      );
    }

    await pizza.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPizzas,
  getPizza,
  createPizza,
  updatePizza,
  deletePizza
};
