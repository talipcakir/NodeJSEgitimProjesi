<%- include('../../layout', { body: `
    <div id="main-content">
        <h2>${title}</h2>
        <a href="/admin/products/add" class="btn">➕ Yeni Ürün Ekle</a>
        <hr>

        <h3>Ürün Listesi</h3>
        
        <div id="product-list-container">
            <p id="loading-message">Ürünler yükleniyor...</p>
        </div>
    </div>

    <script src="/js/admin/product_list.js"></script>
` }) %>