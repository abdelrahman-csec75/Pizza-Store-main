/**
 * @file cartRoutes.js
 * @description Shopping cart routes for logged in users.
 */

const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { addToCartRules, updateCartRules } = require('../utils/validators');

// Apply protection middleware to all cart routes
router.use(protect);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get current user's shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shopping cart retrieved successfully
 *       401:
 *         description: Not authorized
 */
router.get('/', getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add an item to the shopping cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pizzaId
 *             properties:
 *               pizzaId:
 *                 type: string
 *                 description: MongoDB ObjectId of the pizza
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *               quantity:
 *                 type: integer
 *                 default: 1
 *                 example: 2
 *               size:
 *                 type: string
 *                 enum: [small, medium, large]
 *                 default: medium
 *                 example: large
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Validation error or pizza unavailable
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Pizza not found
 */
router.post('/add', addToCartRules, validate, addToCart);

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update cart item quantity or size
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pizzaId
 *               - quantity
 *             properties:
 *               pizzaId:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *               quantity:
 *                 type: integer
 *                 example: 3
 *               size:
 *                 type: string
 *                 enum: [small, medium, large]
 *                 example: medium
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Cart or item not found
 */
router.put('/update', updateCartRules, validate, updateCart);

/**
 * @swagger
 * /api/cart/remove/{pizzaId}:
 *   delete:
 *     summary: Remove an item from cart by pizza ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pizzaId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of pizza to remove
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Cart not found
 */
router.delete('/remove/:pizzaId', removeFromCart);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear all items from current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       401:
 *         description: Not authorized
 */
router.delete('/clear', clearCart);

module.exports = router;
