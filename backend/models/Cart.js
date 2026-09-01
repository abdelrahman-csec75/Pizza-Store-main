const mongoose = require('mongoose');

/**
 * Cart Item Sub-schema definition
 */
const CartItemSchema = new mongoose.Schema({
  pizzaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
    required: [true, 'Please add a pizza ID'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please add a quantity'],
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  size: {
    type: String,
    required: [true, 'Please specify size'],
    enum: {
      values: ['small', 'medium', 'large'],
      message: 'Size must be small, medium, or large',
    },
    default: 'medium',
  },
});

/**
 * Cart Schema definition
 */
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Cart must belong to a user'],
      unique: true,
    },
    items: [CartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save middleware to update updatedAt timestamp
 */
CartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cart', CartSchema);
