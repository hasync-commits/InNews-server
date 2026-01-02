const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public
router.post('/backup/admin/recover/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Protected Example (Admin)
router.get('/admin', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

module.exports = router;
