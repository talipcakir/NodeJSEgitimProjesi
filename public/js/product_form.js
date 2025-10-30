// --------------------------------------------------
// Dosya: public/js/admin/product_form.js
// Amaç: Admin Paneli Ürün Ekleme Formunun JavaScript mantığını (form gönderimi) içerir.
// --------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    
    if (productForm) {
        productForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Varsayılan form gönderimini engelle

            // FormData objesi, hem metin alanlarını hem de dosyayı otomatik toplar
            const formData = new FormData(productForm); 

            try {
                // /api/products rotasına POST isteği gönder
                const response = await fetch('/api/products', {
                    method: 'POST',
                    // Content-Type: multipart/form-data olduğu için tarayıcı tarafından otomatik ayarlanır.
                    body: formData 
                });

                const result = await response.json();

                if (response.ok) {
                    // Başarılı bildirimini göster (showToast layout.js'ten gelir)
                    showToast(result.message, 'success'); 
                    // Formu temizle
                    productForm.reset(); 
                } else {
                    // Hata bildirimini göster
                    showToast('Ekleme Başarısız: ' + result.message, 'error');
                }

            } catch (error) {
                console.error("Ürün oluşturma hatası:", error);
                showToast('Sunucuya bağlanılamadı veya genel bir hata oluştu.', 'error');
            }
        });
    }
});