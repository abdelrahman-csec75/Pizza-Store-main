/**
 * @file swagger.js
 * @description Swagger / OpenAPI 3.0 configuration using swagger-jsdoc.
 */

const swaggerJsDoc = require('swagger-jsdoc');

// OpenAPI specification options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PizzaHub API',
      version: '1.0.0',
      description: 'Pizza Restaurant Backend API Documentation',
    },
    servers: [
      {
        url: process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`,
        description: 'Backend Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT Bearer token to access protected routes',
        },
      },
    },
  },
  // Path to the API docs (route files containing Swagger annotations)
  apis: ['./routes/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
