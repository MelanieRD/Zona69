const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validation');
const { authenticateToken } = require('../middlewares/auth');

// Rutas públicas
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Rutas protegidas
router.get('/profile', authenticateToken, getProfile);

module.exports = router;