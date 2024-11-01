// routes/orderRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController'); // Ensure this path is correct
const { authenticate, authorizeRoles } = require('../middleware/authmiddleware'); // Ensure correct casing
const { validateOrder } = require('../middleware/validators');

const router = express.Router();

// Debugging: Log the orderController to check for defined functions
console.log(orderController); // Should show all exported functions, including placeOrder

// Route for placing an order
router.post(
    '/',
    authenticate,
    authorizeRoles(['customer']),
    validateOrder,
    orderController.placeOrder // This should be defined now
);

// Route for updating order status
router.put(
    '/:id',
    authenticate,
    authorizeRoles(['admin', 'staff']),
    orderController.updateOrderStatus // Ensure this function is also defined
);

module.exports = router;
