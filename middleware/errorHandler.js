// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error('Error:', err); // Log error details for debugging
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  