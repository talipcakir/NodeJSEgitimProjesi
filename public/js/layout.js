// --------------------------------------------------
// Dosya: public/js/layout.js
// Amaç: Tüm sayfalarda kullanılacak global fonksiyonları (Toast, Logout) tanımlamak.
// --------------------------------------------------

/**
 * Toast Bildirim Fonksiyonu
 * @param {string} message - Gösterilecek mesaj
 * @param {string} type - 'success' veya 'error'
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return; // Konteyner yoksa durdur

    // Yeni bir toast elementi oluştur
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Toast'ı containera ekle
    container.appendChild(toast);

    // Kısa bir gecikme ile göster (CSS animasyonu için)
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Belirli bir süre sonra (örn: 5 saniye) gizle ve DOM'dan kaldır
    setTimeout(() => {
        toast.classList.remove('show');
        // Gizlendikten sonra tamamen kaldır
        setTimeout(() => {
            if (container.contains(toast)) {
                 container.removeChild(toast);
            }
        }, 500); // CSS geçiş süresi ile uyumlu olmalı
    }, 5000);
}

// Çıkış Yap (Logout) İşlemi
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.querySelector('header a[href="#"]');
    
    if (logoutLink && logoutLink.textContent.includes('Çıkış Yap')) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('/api/auth/logout');
                const result = await response.json();
                
                if(response.ok) {
                    showToast('Oturum başarıyla kapatıldı.', 'success');
                    setTimeout(() => {
                        window.location.href = '/login'; // Login sayfasına yönlendir
                    }, 1000);
                } else {
                    showToast('Çıkış yapılırken hata oluştu: ' + result.message, 'error');
                }
            } catch(error) {
                showToast('Sunucuya bağlanılamadı.', 'error');
            }
        });
    }
});