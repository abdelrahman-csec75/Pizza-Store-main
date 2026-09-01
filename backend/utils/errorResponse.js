/**
 * @file errorResponse.js
 * @description Custom ErrorResponse class extending standard JS Error to handle HTTP status codes.
 */

/**
 * Custom Error Response Class
 * @extends Error
 */
class ErrorResponse extends Error {
  /**
   * Create an ErrorResponse instance
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
