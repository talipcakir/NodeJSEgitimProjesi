// --------------------------------------------------
// Dosya: middleware/authMiddleware.js
// Amaç: JWT kullanarak rotaları korumak (protect) ve rol kontrolü yapmak (authorize).
// --------------------------------------------------

const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

/**
 * @desc   Kullanıcının geçerli bir token'ı var mı diye kontrol eden middleware (Kimlik Doğrulama).
 * Token doğrulandıktan sonra kullanıcı bilgisini req.user'a ekler.
 */
const protect = async (req, res, next) => {
  let token;

  // Token'ı Authorization başlığından al (hem API istekleri hem de Cookie'den taşınan için)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token'ın "Bearer " kısmını ayır
      token = req.headers.authorization.split(' ')[1];

      // Token'ı JWT SECRET ile doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token'daki ID ile veritabanından kullanıcıyı çek (parola hariç)
      const [rows] = await pool.query('SELECT id, username, email, role, createdAt FROM users WHERE id = ?', [decoded.id]);
      
      if (rows.length === 0) {
         // Kullanıcı silinmişse veya bulunamazsa
         if (req.originalUrl.startsWith('/admin')) {
            return res.redirect('/login'); // Admin sayfası ise Login'e yönlendir
         }
         return res.status(401).json({ success: false, message: 'Kullanıcı bulunamadı.' });
      }

      req.user = rows[0]; // Kullanıcı bilgilerini istek objesine ekle
      
      next();

    } catch (error) {
      console.error('Token doğrulama hatası:', error.message);
      
      // Token doğrulama (verify) başarısız olursa (süresi dolmuş, geçersiz)
      if (req.originalUrl.startsWith('/admin')) {
         // Cookie'yi temizle ve login sayfasına yönlendir
         res.clearCookie('jwt_token');
         return res.redirect('/login'); 
      }
      // API isteği ise 401 hatası döndür
      res.status(401).json({ success: false, message: 'Yetkisiz erişim, token geçersiz veya süresi dolmuş.' });
    }
  }

  // Token hiç yoksa
  if (!token) {
    if (req.originalUrl.startsWith('/admin')) {
        return res.redirect('/login'); // Admin sayfası ise Login'e yönlendir
    }
    res.status(401).json({ success: false, message: 'Yetkisiz erişim, token bulunamadı.' });
  }
};


/**
 * @desc   Kullanıcının belirli bir role sahip olup olmadığını kontrol eden middleware (Yetkilendirme).
 * @param  {...string} roles - İzin verilen roller (örn: 'admin', 'moderator')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    // req.user, 'protect' middleware'i tarafından atanmıştır.
    if (!req.user || !roles.includes(req.user.role)) {
      
      // İstek bir API rotasına geliyorsa (JSON yanıtı beklenir)
      if (req.originalUrl.startsWith('/api')) {
          return res.status(403).json({ // 403: Forbidden (Yasak)
            success: false,
            message: `Bu işlemi yapmak için '${roles.join(' veya ')}' rolüne sahip olmalısınız.`
          });
      }
      
      // İstek bir Admin Paneli sayfasına geliyorsa (HTML yanıtı beklenir)
      return res.status(403).render('auth/login', {
          title: 'Giriş Yap',
          error: `Bu sayfaya erişim yetkiniz (${roles.join(' veya ')} rolü) bulunmamaktadır.`
      });
    }
    next(); // Yetki uygun, devam et.
  };
};

module.exports = { protect, authorize };