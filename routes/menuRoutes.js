const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middleware/authmiddleware');

// Menu Routes
router.post('/add', authMiddleware.authenticate, authMiddleware.authorizeRoles(['admin']), menuController.addMenuItem);
router.put('/update/:id', authMiddleware.authenticate, authMiddleware.authorizeRoles(['admin']), menuController.updateMenuItem);
router.delete('/delete/:id', authMiddleware.authenticate, authMiddleware.authorizeRoles(['admin']), menuController.deleteMenuItem);
router.get('/view', menuController.getMenuItems);

module.exports = router;
