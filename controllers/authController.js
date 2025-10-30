// --------------------------------------------------
// Dosya: controllers/authController.js
// Amaç: Kullanıcı kayıt (register), giriş (login), çıkış (logout) işlemlerini yönetmek.
// --------------------------------------------------

const { pool } = require('../config/db');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

// Yardımcı Fonksiyon: JWT oluşturur
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN // Token süresi .env dosyasından alınır
  });
};

// Yardımcı Fonksiyon: JWT'yi HttpOnly Cookie'ye ekler ve yanıtı döndürür
const sendTokenResponse = (user, statusCode, res, redirectUrl) => {
    const token = generateToken(user.id);

    const options = {
        // Cookie'nin geçerlilik süresi
        expires: new Date(Date.now() + parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly: true, // JavaScript erişimine kapalı (güvenlik için)
        secure: process.env.NODE_ENV === 'production' // Sadece HTTPS'te gönder (canlı ortam için)
    };

    res.cookie('jwt_token', token, options); 
    
    // Eğer yanıt bir API yanıtı ise (frontend fetch)
    if (!redirectUrl) {
        return res.status(statusCode).json({
            success: true,
            message: 'Giriş başarılı.',
            token: token, 
            user: { id: user.id, username: user.username, email: user.email, role: user.role }
        });
    }

    // Eğer yanıt bir form gönderimi ise (nadiren kullanılır, genellikle formlar da AJAX kullanır)
    res.redirect(redirectUrl);
};

/**
 * @desc   Yeni kullanıcı kaydı
 * @route  POST /api/auth/register
 */
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Lütfen tüm zorunlu alanları doldurun.' });
    }

    // Kullanıcı adı veya e-posta zaten kayıtlı mı kontrol et
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ?', 
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ success: false, message: 'Bu email veya kullanıcı adı zaten kayıtlı.' }); 
    }

    // Parolayı hash'le
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [username, email, hashedPassword, role || 'user']);

    const [newUser] = await pool.query('SELECT id, username, email, role FROM users WHERE id = ?', [result.insertId]);

    // Token oluştur ve cookie'ye gönder
    sendTokenResponse(newUser[0], 201, res);

  } catch (error) {
    console.error("Kayıt olma hatası:", error);
    res.status(500).json({ success: false, message: 'Sunucu Hatası: Kayıt işlemi başarısız.' });
  }
};

/**
 * @desc   Kullanıcı girişi
 * @route  POST /api/auth/login
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Lütfen email ve parola girin.' });
    }

    // E-posta ile kullanıcıyı bul
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Geçersiz kimlik bilgileri.' }); 
    }

    const user = users[0];

    // Girilen parolayı hashlenmiş parolayla karşılaştır
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Geçersiz kimlik bilgileri.' });
    }

    // Başarılı giriş: Token oluştur ve cookie'ye gönder
    sendTokenResponse(user, 200, res); 

  } catch (error) {
    console.error("Giriş yapma hatası:", error);
    res.status(500).json({ success: false, message: 'Sunucu Hatası: Giriş işlemi başarısız.' });
  }
};

/**
 * @desc   Çıkış yap (Logout)
 * @route  GET /api/auth/logout
 */
const logout = (req, res) => {
    // Cookie'yi geçersiz bir değerle ve hemen dolacak şekilde ayarla
    res.cookie('jwt_token', 'none', {
        expires: new Date(Date.now() + 10 * 1000), 
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Oturum başarıyla kapatıldı.'
    });
};

/**
 * @desc   Giriş yapmış kullanıcının bilgilerini getir
 * @route  GET /api/auth/me
 * @access Private
 */
const getMe = async (req, res) => {
  // req.user, 'protect' middleware'i tarafından atanmıştır.
  const user = req.user; 
  
  res.status(200).json({
    success: true,
    data: user
  });
};

module.exports = {
  registerUser,
  loginUser,
  logout, 
  getMe
};