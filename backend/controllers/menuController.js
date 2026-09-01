/**
 * @file menuController.js
 * @description Controllers for public menu retrieval and available categories listing.
 */

const Pizza = require('../models/Pizza');

/**
 * @desc    Get all available pizzas for menu
 * @route   GET /api/menu
 * @access  Public
 */
const getMenu = async (req, res, next) => {
  try {
    // Find all pizzas where available is true and select relevant fields
    const pizzas = await Pizza.find({ available: true })
      .select('name description price image category sizes')
      .sort({ category: 1, name: 1 });

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
 * @desc    Get list of distinct categories from available pizzas
 * @route   GET /api/menu/categories
 * @access  Public
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await Pizza.distinct('category', { available: true });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenu,
  getCategories
};
