// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Menu = require('./Menu'); // Import the Menu model correctly

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // 'pending', 'completed', 'cancelled'
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Associations
Order.belongsTo(User);  // Each order is placed by a user
Order.hasMany(Menu, { foreignKey: 'orderId' }); // Each order can have multiple menu items

module.exports = Order;
