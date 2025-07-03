const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Authenticated user's profile
router.get('/me', authMiddleware, userController.getProfile);

// Admin-only routes
router.get('/all', authMiddleware, userController.getAllUsers);
router.get('/leads', authMiddleware, userController.getLeads);

module.exports = router;
