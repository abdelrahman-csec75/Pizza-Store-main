/**
 * @file authController.js
 * @description Authentication controllers for user registration, login, and profile retrieval.
 */

const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Helper function to send JWT token response along with user data
 * @param   {Object} user - User document from DB
 * @param   {number} statusCode - HTTP status code to send
 * @param   {Object} res - Express response object
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  // Create cookie options
  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Set cookie and respond
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        balance: user.balance
      }
    });
};

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, balance } = req.body;

    const initialBalance = balance !== undefined ? parseFloat(balance) : 100;
    if (isNaN(initialBalance) || initialBalance < 0) {
      return next(new ErrorResponse('Please provide a valid non-negative initial balance', 400));
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      balance: initialBalance
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    // Check for duplicate key error (code 11000 for duplicate email)
    if (error.code === 11000) {
      return next(new ErrorResponse('Email already exists', 400));
    }
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password presence
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user and include password field (which is select: false by default)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid email or password', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid email or password', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Log user out / clear cookie
 * @route   GET /api/auth/logout
 * @access  Private
 */
const logout = (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
};

module.exports = {
  register,
  login,
  getMe,
  logout
};
