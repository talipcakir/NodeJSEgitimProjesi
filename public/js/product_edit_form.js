// --------------------------------------------------
// Dosya: public/js/admin/product_edit_form.js
// Amaç: Admin Paneli Ürün Düzenleme sayfasının JavaScript mantığını içerir.
// Veri çeker, formu doldurur ve PUT/DELETE isteklerini yönetir.
// --------------------------------------------------

// URL'den ürün ID'sini almak için yardımcı fonksiyon
function getProductIdFromUrl() {
    // Örneğin: /admin/products/edit/1 -> URL'in sonundaki '1'i alır.
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1];
}

// Global scope'a silme fonksiyonunu tanımla (EJS'teki butonda kullanılıyor)
const deleteProductFromEditPage = async (id) => {
    // product_list.js'ten kopyalanan silme mantığı
    if (!confirm(`Ürün ID ${id} silinecek. Emin misiniz?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
            showToast(`Ürün ID ${id} başarıyla silindi.`, 'success');
            // Başarıyla silindikten sonra ürün listesine yönlendir
            setTimeout(() => {
                window.location.href = '/admin/products';
            }, 1000);
        } else {
            showToast(`Silme Başarısız: ${result.message}`, 'error');
        }
    } catch (error) {
        console.error("Silme hatası:", error);
        showToast('Sunucuya bağlanılamadı veya silme işlemi başarısız oldu.', 'error');
    }
};


// Mevcut ürün verilerini çekme ve formu doldurma
const fetchAndPopulateProduct = async (id) => {
    try {
        // API'dan ürün verisini çek
        const response = await fetch(`/api/products/${id}`);
        
        if (response.status === 404) {
             showToast(`Ürün ID ${id} bulunamadı.`, 'error');
             document.getElementById('form-title').textContent = 'Ürün Bulunamadı.';
             return;
        }

        if (!response.ok) {
            throw new Error(`Veri çekme hatası: ${response.status}`);
        }

        const product = await response.json();
        const data = product.data; // API yanıtı {success: true, data: {..}} formatında

        // Formu Doldur
        document.getElementById('name').value = data.name;
        document.getElementById('description').value = data.description || '';
        document.getElementById('price').value = data.price;
        document.getElementById('form-title').textContent = `Ürün: ${data.name} Bilgilerini Düzenle`;
        
        // Mevcut resmi göster
        const imageContainer = document.getElementById('currentImageContainer');
        imageContainer.innerHTML = '';
        
        const imageUrl = data.imageUrl ? data.imageUrl : '/images/placeholder.png';
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = data.name;
        img.style.maxWidth = '200px';
        img.style.height = 'auto';
        img.style.display = 'block';
        img.style.marginBottom = '10px';
        imageContainer.appendChild(img);


    } catch (error) {
        console.error("Ürün detaylarını yükleme hatası:", error);
        showToast('Ürün detayları yüklenemedi. ' + error.message, 'error');
    }
};

// Form gönderim olayını yönetme (PUT İsteği)
const handleFormSubmission = (productId) => {
    const editForm = document.getElementById('editProductForm');
    
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // NOT: Resim güncellemesi için PATCH veya ayrı bir PUT rotası daha iyi olur.
        // Basitlik için sadece metin alanlarını gönderiyoruz.
        
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;

        try {
            // PUT/PATCH isteği için JSON formatında veri gönder
            const response = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    // Authorization Header Cookie ile otomatik gönderilecek
                },
                body: JSON.stringify({ name, description, price })
            });

            const result = await response.json();

            if (response.ok) {
                showToast(result.message, 'success'); 
                // Güncelleme başarılı olduktan sonra formu tekrar doldur (yeni veriyi göstermek için)
                fetchAndPopulateProduct(productId); 
            } else {
                showToast('Güncelleme Başarısız: ' + result.message, 'error');
            }

        } catch (error) {
            console.error("Ürün güncelleme hatası:", error);
            showToast('Sunucuya bağlanılamadı veya genel bir hata oluştu.', 'error');
        }
    });
};


// Sayfa yüklendiğinde çalışacak ana fonksiyon
document.addEventListener('DOMContentLoaded', () => {
    const productId = getProductIdFromUrl();

    if (productId) {
        fetchAndPopulateProduct(productId);
        handleFormSubmission(productId);
    } else {
        showToast('URL\'de ürün ID\'si bulunamadı.', 'error');
    }
});