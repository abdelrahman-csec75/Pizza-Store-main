const mongoose = require('mongoose');

/**
 * Pizza Schema definition
 */
const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a pizza name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative'],
  },
  image: {
    type: String,
    default: 'no-image.jpg',
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: {
      values: ['Classic', 'Specialty', 'Veggie', 'BBQ', 'Seafood'],
      message: 'Category must be one of: Classic, Specialty, Veggie, BBQ, Seafood',
    },
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add ingredients'],
  },
  sizes: {
    type: [
      {
        type: String,
        enum: ['small', 'medium', 'large'],
      },
    ],
    default: ['small', 'medium', 'large'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pizza', PizzaSchema);
