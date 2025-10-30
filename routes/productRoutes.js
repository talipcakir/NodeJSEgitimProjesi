// --------------------------------------------------
// Dosya: routes/productRoutes.js
// Amaç: '/api/products' altındaki ürün CRUD yollarını yönetmek.
// --------------------------------------------------

const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Dosya yükleme middleware'i

// @route  GET /api/products
// @desc   Tüm ürünleri listele
// @access Public (Herkes erişebilir)
router.get('/', getProducts);

// @route  GET /api/products/:id
// @desc   Belirli bir ürünü getir
// @access Public
router.get('/:id', getProduct);


// --- KORUMALI ROTALAR (ADMIN YETKİSİ GEREKİR) ---

// @route  POST /api/products
// @desc   Yeni ürün oluştur
// @access Private/Admin
// Önce kimlik doğrulama, sonra yetki kontrolü, sonra dosya yükleme, en son oluşturma kontrolcüsü çalışır.
router.post('/', protect, authorize('admin'), upload, createProduct);

// @route  PUT /api/products/:id
// @desc   Ürün bilgilerini güncelle
// @access Private/Admin
router.put('/:id', protect, authorize('admin'), updateProduct);

// @route  DELETE /api/products/:id
// @desc   Ürünü sil
// @access Private/Admin
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;