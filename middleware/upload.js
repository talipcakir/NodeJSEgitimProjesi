// --------------------------------------------------
// Dosya: middleware/upload.js
// Amaç: Multer kullanarak dosya yükleme (resimler) middleware'ini yapılandırmak.
// --------------------------------------------------

const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Dosya sistemi işlemleri için (klasör oluşturma)

// Yükleme klasörünün yolu
const uploadDir = path.join(__dirname, '../public/uploads');

// Yükleme klasörü yoksa oluştur
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage (Depolama) ayarları
const storage = multer.diskStorage({
  // Hedef klasör (yüklenen dosyaların kaydedileceği yer)
  destination: (req, file, cb) => {
    cb(null, uploadDir); // public/uploads klasörüne kaydet
  },
  // Dosya adı ayarı
  filename: (req, file, cb) => {
    // Benzersiz bir dosya adı oluşturulur: [alan adı]-[timestamp].[uzantı]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Dosya uzantısı (örn: .jpg, .png)
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

// Multer filtre ayarları (Sadece belirli türdeki dosyaları kabul et)
const fileFilter = (req, file, cb) => {
  // Kabul edilen dosya türleri: jpeg, jpg, png
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true); // Dosya kabul edildi
  } else {
    // Dosya reddedildi, hata mesajı ilet
    cb(new Error('Yalnızca JPEG, JPG ve PNG formatında resimler kabul edilir.'), false);
  }
};

// Multer konfigürasyonu
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Dosya boyutu sınırı: 5MB
  }
});

// Tek bir dosya yüklemek için dışa aktar (Örn: 'productImage' adında bir alan için)
module.exports = upload.single('productImage');