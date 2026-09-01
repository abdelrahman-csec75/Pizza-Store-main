/**
 * Global error handling middleware for Express
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error to console in development environment
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    console.error('Error Stack:', err.stack || err);
  }

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 400 };
  }

  // Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  const statusCode = error.statusCode || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
