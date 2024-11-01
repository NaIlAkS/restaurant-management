// controllers/analyticsController.js
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');

exports.getSalesData = async (req, res) => {
  try {
    const salesData = await Order.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalSales'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrders'],
      ],
      where: {
        createdAt: {
          [Op.gte]: sequelize.fn('DATE', sequelize.fn('NOW')), // You can modify this to get sales within a certain period
        },
      },
    });

    res.json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getDailyBookings = async (req, res) => {
  try {
    const dailyBookings = await Reservation.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('date')), 'bookingDate'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalBookings'],
      ],
      group: [sequelize.fn('DATE', sequelize.col('date'))],
      order: [[sequelize.fn('DATE', sequelize.col('date')), 'DESC']], // Sort by date descending
    });

    res.json(dailyBookings);
  } catch (error) {
    console.error('Error fetching daily bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
