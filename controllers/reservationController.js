// controllers/reservationController.js
const { io } = require('../server'); // Import io instance from server.js
const Reservation = require('../models/Reservation'); // Ensure this import is correct

// Book a table and send confirmation notification
exports.bookTable = async (req, res) => {
  try {
    const { date, time, guests } = req.body;
    const reservation = await Reservation.create({
      date,
      time,
      guests,
      userId: req.user.id,
    });

    // Emit notification for reservation confirmation
    io.emit(`reservationConfirmation:${req.user.id}`, {
      message: `Your reservation for ${date} at ${time} has been confirmed.`,
      reservationId: reservation.id,
    });

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error booking table', error });
  }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll(); // Adjust if using a different method
    res.json(reservations);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};
