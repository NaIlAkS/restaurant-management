// models/Menu.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this path is correct

const Menu = sequelize.define('Menu', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Menu; // Ensure this line exports the model correctly
