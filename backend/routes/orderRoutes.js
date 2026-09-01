/**
 * @file orderRoutes.js
 * @description Routes for managing orders and checkout with balance payment.
 */

const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an order using user wallet balance
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - pizzaId
 *                     - quantity
 *                   properties:
 *                     pizzaId:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     size:
 *                       type: string
 *                       enum: [small, medium, large]
 *                       example: medium
 *     responses:
 *       201:
 *         description: Order placed successfully and balance deducted
 *       400:
 *         description: Insufficient balance or invalid items
 *       401:
 *         description: Not authorized
 */
router.post('/', protect, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders of current logged in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *       401:
 *         description: Not authorized
 */
router.get('/', protect, getMyOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get single order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get('/:id', protect, getOrderById);

module.exports = router;
