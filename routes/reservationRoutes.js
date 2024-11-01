// routes/reservationRoutes.js
const express = require('express');
const reservationController = require('../controllers/reservationController');
const { authenticate, authorizeRoles } = require('../middleware/authmiddleware'); // Ensure correct casing
const { validateReservation } = require('../middleware/validators');
const router = express.Router();

router.post(
  '/',
  authenticate,
  authorizeRoles(['customer']),
  validateReservation,
  reservationController.bookTable
);

router.get(
  '/',
  authenticate,
  authorizeRoles(['admin', 'staff']),
  reservationController.getAllReservations // Ensure this function is defined
);
console.log(reservationController); // This should log an object with bookTable and getAllReservations functions

module.exports = router;
