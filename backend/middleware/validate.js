const { validationResult } = require('express-validator');

/**
 * Middleware that evaluates validation results from express-validator rules.
 * If validation errors exist, returns a 400 response with array of errors.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = validate;
