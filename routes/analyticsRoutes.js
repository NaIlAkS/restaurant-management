// routes/analyticsRoutes.js
const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const { authenticate, authorizeRoles } = require('../middleware/authmiddleware');
const router = express.Router();

// Get sales data
router.get('/sales', authenticate, authorizeRoles(['admin', 'staff']), analyticsController.getSalesData);

// Get daily bookings
router.get('/bookings', authenticate, authorizeRoles(['admin', 'staff']), analyticsController.getDailyBookings);

module.exports = router;
