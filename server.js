// server.js
require('dotenv').config(); // Load environment variables at the top
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/db'); // Database configuration

// Import routes
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const billingRoutes = require('./routes/billingRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); // Import analytics routes

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware to parse JSON requests
app.use(express.json());

// Set up routes
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);
app.use('/reservation', reservationRoutes);
app.use('/billing', billingRoutes);
app.use('/api/analytics', analyticsRoutes); // Use the analytics routes

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Export the io instance for use in other files
module.exports.io = io;

// Sync with the database and start the server
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables (not recommended for production)
    console.log('All models were synchronized successfully.');

    server.listen(3000, () => {
      console.log('Server with Socket.io is running on port 3000');
    });
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

// Call the function to sync database and start the server
syncDatabase();
