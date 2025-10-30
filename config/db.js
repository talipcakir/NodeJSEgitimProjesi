// --------------------------------------------------
// Dosya: config/db.js
// Amaç: Veritabanı bağlantısı, tablo oluşturma ve dummy veri yönetimi.
// --------------------------------------------------

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Parolaları güvenli bir şekilde saklamak için

dotenv.config();

// MySQL bağlantı havuzunu (pool) oluştur
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10, // Aynı anda açılabilecek maksimum bağlantı sayısı
  queueLimit: 0
});

// Veritabanı başlangıç ayarlarını (oluşturma, tablo oluşturma, dummy veri) yöneten fonksiyon
async function initializeDatabase() {
  let connection;
  try {
    const dbName = process.env.DB_NAME;

    // Bağlantı havuzundan bir bağlantı al
    connection = await pool.getConnection();

    // 1. Veritabanını oluştur (eğer yoksa)
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    
    // 2. Oluşturulan veritabanını kullan
    await connection.query(`USE \`${dbName}\`;`);

    // 3. 'products' tablosunu oluştur (eğer yoksa)
    const createProductsTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        imageUrl VARCHAR(512),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await connection.query(createProductsTableQuery);

    // 4. 'users' tablosunu oluştur (kullanıcı kimlik doğrulama/yetkilendirme için)
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await connection.query(createUsersTableQuery);

    console.log("Veritabanı ve tablolar ('products', 'users') başarıyla kontrol edildi/oluşturuldu.");

    // 5. 'products' tablosuna dummy veri ekle (eğer boşsa)
    const [rowsProducts] = await connection.query('SELECT COUNT(*) as count FROM products');
    const countProducts = rowsProducts[0].count;

    if (countProducts === 0) {
      console.log("'products' tablosu boş, dummy veriler ekleniyor...");
      const dummyProducts = [
        ['Laptop Pro X', 'Yüksek performanslı dizüstü bilgisayar.', 25000.00, 'https://placehold.co/300x200?text=Laptop'],
        ['Akıllı Telefon Z', 'En yeni özelliklere sahip amiral gemisi telefon.', 15000.00, 'https://placehold.co/300x200?text=Telefon'],
        ['Kablosuz Kulaklık', 'Gürültü engelleyici özellikli kulaklık.', 1200.50, 'https://placehold.co/300x200?text=Kulakl%C4%B1k']
      ];
      const insertQuery = 'INSERT INTO products (name, description, price, imageUrl) VALUES ?';
      await connection.query(insertQuery, [dummyProducts]);
      console.log("Dummy ürünler başarıyla eklendi.");
    }
    
    // 6. 'users' tablosuna varsayılan Admin kullanıcı ekle (eğer admin yoksa)
    const [rowsUsers] = await connection.query('SELECT COUNT(*) as count FROM users WHERE role = ?', ['admin']);
    const countUsers = rowsUsers[0].count;

    if (countUsers === 0) {
        console.log("'users' tablosunda admin bulunamadı, varsayılan admin ekleniyor...");
        const adminEmail = 'admin@proje.com';
        const adminUsername = 'admin_default';
        const adminPassword = 'GucluSifre123';
        
        // Parolayı hash'lemeden önce salt oluştur
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const insertAdminQuery = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        await connection.query(insertAdminQuery, [adminUsername, adminEmail, hashedPassword, 'admin']);
        console.log(`Varsayılan Admin kullanıcısı (${adminEmail}) başarıyla eklendi. Parola: GucluSifre123`);
    }


  } catch (error) {
    console.error("Veritabanı başlatılırken kritik bir hata oluştu:", error);
    process.exit(1);
  } finally {
    // Bağlantıyı havuza geri bırak (Pool bağlantısını kapatma)
    if (connection) connection.release();
  }
}

module.exports = {
  pool,
  initializeDatabase
};