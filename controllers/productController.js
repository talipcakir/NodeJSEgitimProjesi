// --------------------------------------------------
// Dosya: controllers/productController.js
// Amaç: Ürün (Product) CRUD işlemlerini yönetmek.
// --------------------------------------------------

const { pool } = require('../config/db');
const fs = require('fs'); // Dosya sisteminden dosya silmek için

/**
 * @desc Tüm ürünleri getir
 * @route GET /api/products
 * @access Public (GraphQL için de kullanılacak)
 */
const getProducts = async (req, res) => {
    try {
        // Tüm ürünleri veritabanından çekme sorgusu
        const [rows] = await pool.query('SELECT * FROM products ORDER BY createdAt DESC');
        
        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error("Ürünleri getirme hatası:", error);
        res.status(500).json({ success: false, message: 'Sunucu Hatası: Ürünler listelenemedi.' });
    }
};

/**
 * @desc Belirli bir ürünü ID ile getir
 * @route GET /api/products/:id
 * @access Public
 */
const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        
        // Belirli ID'ye sahip ürünü çekme sorgusu
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: `Ürün ID ${productId} bulunamadı.` });
        }

        res.status(200).json({
            success: true,
            data: rows[0]
        });
    } catch (error) {
        console.error("Ürün getirme hatası:", error);
        res.status(500).json({ success: false, message: 'Sunucu Hatası: Ürün detayları alınamadı.' });
    }
};

/**
 * @desc Yeni bir ürün oluştur
 * @route POST /api/products
 * @access Private/Admin
 */
const createProduct = async (req, res) => {
    // Middleware'den gelen yüklü dosya bilgisini al
    const uploadedFile = req.file; 
    
    try {
        const { name, description, price } = req.body;

        if (!name || !price) {
            // Eğer dosya yüklendiyse ama zorunlu alanlar eksikse, dosyayı sil
            if (uploadedFile) fs.unlinkSync(uploadedFile.path); 
            return res.status(400).json({ success: false, message: 'Ürün adı ve fiyatı zorunludur.' });
        }

        let imageUrl = null;
        if (uploadedFile) {
            // Yüklenen dosyanın sunucudaki göreceli yolunu oluştur
            // public/uploads/dosya_adi.jpg -> /uploads/dosya_adi.jpg
            imageUrl = `/uploads/${uploadedFile.filename}`;
        }
        
        // Ürünü veritabanına ekleme sorgusu
        const query = 'INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [name, description, price, imageUrl]);
        
        // Başarıyla eklenen ürünü geri döndür
        const [newProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Ürün başarıyla oluşturuldu.',
            data: newProduct[0]
        });

    } catch (error) {
        // Herhangi bir veritabanı veya sunucu hatasında yüklü dosyayı sil
        if (uploadedFile) fs.unlinkSync(uploadedFile.path); 
        console.error("Ürün oluşturma hatası:", error);
        res.status(500).json({ success: false, message: 'Sunucu Hatası: Ürün oluşturulamadı.' });
    }
};

/**
 * @desc Ürün bilgilerini güncelle
 * @route PUT /api/products/:id
 * @access Private/Admin
 */
const updateProduct = async (req, res) => {
    // Basitlik için PUT rotasında resim güncellemeyi atlıyoruz. Sadece metin alanlarını güncelliyoruz.
    try {
        const productId = req.params.id;
        const { name, description, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({ success: false, message: 'Ürün adı ve fiyatı zorunludur.' });
        }

        // Güncelleme sorgusu
        const query = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
        const [result] = await pool.query(query, [name, description, price, productId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: `Güncellenecek ürün ID ${productId} bulunamadı.` });
        }

        // Güncellenen ürünü geri döndür
        const [updatedProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);

        res.status(200).json({
            success: true,
            message: 'Ürün başarıyla güncellendi.',
            data: updatedProduct[0]
        });

    } catch (error) {
        console.error("Ürün güncelleme hatası:", error);
        res.status(500).json({ success: false, message: 'Sunucu Hatası: Ürün güncellenemedi.' });
    }
};

/**
 * @desc Bir ürünü sil
 * @route DELETE /api/products/:id
 * @access Private/Admin
 */
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Önce ürünün resim yolunu bul (eğer varsa, silmek için)
        const [productRows] = await pool.query('SELECT imageUrl FROM products WHERE id = ?', [productId]);

        if (productRows.length === 0) {
            return res.status(404).json({ success: false, message: `Silinecek ürün ID ${productId} bulunamadı.` });
        }

        const imageUrl = productRows[0].imageUrl;

        // Ürünü veritabanından silme sorgusu
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [productId]);

        if (result.affectedRows === 1) {
             // Veritabanından silindikten sonra, fiziksel dosyayı da sil
            if (imageUrl && imageUrl.startsWith('/uploads')) {
                // public/uploads/dosya_adi.jpg yolunu oluştur
                const filePath = `public${imageUrl}`; 
                fs.unlink(filePath, (err) => {
                    if (err) console.error(`Fiziksel dosya silinirken hata oluştu: ${filePath}`, err);
                    else console.log(`Fiziksel dosya başarıyla silindi: ${filePath}`);
                });
            }

            res.status(200).json({
                success: true,
                message: `Ürün ID ${productId} başarıyla silindi.`,
                data: {}
            });
        } else {
             // Bu durum normalde oluşmamalıdır, ancak veri tutarlılığı için.
             res.status(404).json({ success: false, message: `Silinecek ürün ID ${productId} bulunamadı (Veritabanı hatası).` });
        }
    } catch (error) {
        console.error("Ürün silme hatası:", error);
        res.status(500).json({ success: false, message: 'Sunucu Hatası: Ürün silinemedi.' });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};