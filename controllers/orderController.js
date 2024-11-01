// controllers/orderController.js
const { io } = require('../server'); // Import io instance from server.js
const Order = require('../models/Order');
const Menu = require('../models/Menu'); // Ensure you are using this import as needed

// Function to place an order
exports.placeOrder = async (req, res) => {
    try {
        const { menuItems, totalAmount } = req.body; // Expecting menuItems and totalAmount in request body

        // Assuming you have a way to create an order
        const order = await Order.create({
            menuItems,
            totalAmount,
            userId: req.user.id, // Assuming user ID is in req.user from authenticate middleware
        });

        // Emit notification to the user if needed
        io.emit(`orderPlaced:${req.user.id}`, {
            message: `Your order #${order.id} has been placed.`,
        });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error placing order', error });
    }
};

// Function to update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id, { include: ['User'] });
        if (!order) return res.status(404).json({ message: 'Order not found' });

        await order.update({ status });

        // Emit notification to the user
        io.emit(`orderUpdate:${order.userId}`, {
            message: `Your order #${id} status is now: ${status}`,
            status,
        });

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating order status', error });
    }
};
