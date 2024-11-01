// routes/billingRoutes.js
const express = require('express');
const billingController = require('../controllers/billingController');
const { authenticate, authorizeRoles } = require('../middleware/authmiddleware'); // Import separately

const router = express.Router();

// Use `authenticate` to verify the user and `authorizeRoles` to check roles
router.get(
  '/:id',
  authenticate,
  authorizeRoles(['customer', 'staff', 'admin']), // Role-based access control
  billingController.getBill
);

module.exports = router;
