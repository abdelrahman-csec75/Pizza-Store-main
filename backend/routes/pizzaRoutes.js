/**
 * @file pizzaRoutes.js
 * @description Routes for Pizza management (CRUD operations).
 */

const express = require('express');
const router = express.Router();
const {
  getPizzas,
  getPizza,
  createPizza,
  updatePizza,
  deletePizza,
} = require('../controllers/pizzaController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createPizzaRules, updatePizzaRules } = require('../utils/validators');

/**
 * @swagger
 * /api/pizzas:
 *   get:
 *     summary: Get all pizzas with optional filters
 *     tags: [Pizzas]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter pizzas by category (Classic, Specialty, Veggie, BBQ, Seafood)
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filter pizzas by availability status (true/false)
 *     responses:
 *       200:
 *         description: List of pizzas retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', getPizzas);

/**
 * @swagger
 * /api/pizzas/{id}:
 *   get:
 *     summary: Get a single pizza by ID
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pizza ID
 *     responses:
 *       200:
 *         description: Pizza details retrieved successfully
 *       404:
 *         description: Pizza not found
 */
router.get('/:id', getPizza);

/**
 * @swagger
 * /api/pizzas:
 *   post:
 *     summary: Create a new pizza (Admin only)
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - ingredients
 *             properties:
 *               name:
 *                 type: string
 *                 example: Truffle Mushroom
 *               description:
 *                 type: string
 *                 example: Wild mushrooms, truffle cream sauce, garlic, and mozzarella
 *               price:
 *                 type: number
 *                 example: 17.99
 *               category:
 *                 type: string
 *                 enum: [Classic, Specialty, Veggie, BBQ, Seafood]
 *                 example: Specialty
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Wild Mushrooms", "Truffle Sauce", "Garlic", "Mozzarella"]
 *               image:
 *                 type: string
 *                 example: truffle-mushroom.jpg
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["small", "medium", "large"]
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Pizza created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       403:
 *         description: User role not authorized (Admin required)
 */
router.post('/', protect, authorize('admin'), createPizzaRules, validate, createPizza);

/**
 * @swagger
 * /api/pizzas/{id}:
 *   put:
 *     summary: Update an existing pizza by ID (Admin only)
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pizza ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: [Classic, Specialty, Veggie, BBQ, Seafood]
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Pizza updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Pizza not found
 */
router.put('/:id', protect, authorize('admin'), updatePizzaRules, validate, updatePizza);

/**
 * @swagger
 * /api/pizzas/{id}:
 *   delete:
 *     summary: Delete a pizza by ID (Admin only)
 *     tags: [Pizzas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Pizza ID
 *     responses:
 *       200:
 *         description: Pizza deleted successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Pizza not found
 */
router.delete('/:id', protect, authorize('admin'), deletePizza);

module.exports = router;
