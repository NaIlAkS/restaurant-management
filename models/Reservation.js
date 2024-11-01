// models/Reservation.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Make sure this points to your database config

class Reservation extends Model {}

Reservation.init({
  // Define your attributes
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Reservation',
});

// Ensure it is exported
module.exports = Reservation;
