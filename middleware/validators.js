// middleware/validators.js
const { body, validationResult } = require('express-validator');

// Utility function for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validate Order
exports.validateOrder = [
  body('menuItems')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one menu item'),
  body('totalAmount')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number'),
  handleValidationErrors,
];

// Validate Reservation
exports.validateReservation = [
  body('date')
    .isDate()
    .withMessage('Please provide a valid date'),
  body('time')
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Please provide a valid time (HH:mm)'),
  body('guests')
    .isInt({ min: 1 })
    .withMessage('Guests must be a positive integer'),
  handleValidationErrors,
];
