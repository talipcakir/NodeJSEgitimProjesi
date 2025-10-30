// --------------------------------------------------
// Dosya: routes/authRoutes.js
// Amaç: '/api/auth' altındaki yolları (register, login, logout, me) Express Router ile yönetmek.
// --------------------------------------------------

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout, getMe } = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware'); // Kimlik doğrulama middleware'i

// @route  POST /api/auth/register
// @desc   Yeni kullanıcı kaydı (Public)
router.post('/register', registerUser);

// @route  POST /api/auth/login
// @desc   Kullanıcı girişi (Public)
router.post('/login', loginUser);

// @route  GET /api/auth/logout
// @desc   Oturumu sonlandır (Cookie'yi temizler) (Public)
router.get('/logout', logout); 

// @route  GET /api/auth/me
// @desc   Giriş yapmış kullanıcının bilgilerini getir (Private - Korunmuş)
router.get('/me', protect, getMe);

module.exports = router;