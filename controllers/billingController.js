// controllers/billingController.js
const Order = require('../models/Order');

// Get total bill for an order
exports.getBill = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, { include: ['Menu'] });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const totalAmount = order.Menu.reduce((sum, item) => sum + item.price, 0);
    res.json({ orderId: id, totalAmount });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating bill', error });
  }
};
