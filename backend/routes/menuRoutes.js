/**
 * @file menuRoutes.js
 * @description Public menu routes for retrieving available menu items and categories.
 */

const express = require('express');
const router = express.Router();
const { getMenu, getCategories } = require('../controllers/menuController');

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all available menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', getMenu);

/**
 * @swagger
 * /api/menu/categories:
 *   get:
 *     summary: Get list of distinct categories for available pizzas
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/categories', getCategories);

module.exports = router;
