const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authmiddleware');
const validateBody = require('../middleware/validationMiddleware');
const { registerSchema } = require('../schemas/userSchema');

// Registration route with validation
router.post('/register', validateBody(registerSchema), userController.register);

// Protected route (only accessible to admin and staff)
router.get('/protected', authMiddleware(['admin', 'staff']), (req, res) => {
    res.json({ message: 'You have access to this route' });
});

module.exports = router;
