// models/Payment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');

const Payment = sequelize.define('Payment', {
  amount: DataTypes.FLOAT,
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending', // 'pending', 'completed'
  },
});

Payment.belongsTo(Order); // Payment is tied to an order

module.exports = Payment;
