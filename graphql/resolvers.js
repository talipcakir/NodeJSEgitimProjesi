// --------------------------------------------------
// Dosya: graphql/resolvers.js
// Amaç: GraphQL Sorgu Çözümleyicileri (Resolver Functions). Şemadaki sorguların mantığını uygular.
// --------------------------------------------------

const { pool } = require('../config/db');

// Resolver'lar, şemadaki her sorgu veya alan için bir fonksiyon içerir.
// Bu fonksiyonlar, o alan istendiğinde veriyi nasıl çekeceğini veya işleyeceğini belirler.
const resolvers = {
  Query: {
    // products sorgusu için çözümleyici fonksiyon
    products: async () => {
      try {
        // Tüm ürünleri veritabanından çekmek için MySQL sorgusu
        const [rows] = await pool.query('SELECT * FROM products');
        // Sorgu sonucunu döndürür, GraphQL bu veriyi otomatik olarak Product türüne eşler.
        return rows;
      } catch (error) {
        console.error("GraphQL Products sorgusu hatası:", error);
        // Hata durumunda boş dizi döndürerek uygulamanın çökmesini önler
        return [];
      }
    },
    
    // product(id) sorgusu için çözümleyici fonksiyon
    // argümanlar (args) içinden 'id' değerini alır
    product: async (parent, args) => {
      try {
        const { id } = args;
        // Belirli bir ID'ye sahip ürünü veritabanından çek
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        // Tek bir ürün beklenir (rows[0]), bulunamazsa null döndürülür
        return rows[0] || null;
      } catch (error) {
        console.error(`GraphQL Product (ID: ${args.id}) sorgusu hatası:`, error);
        return null;
      }
    },
  },
};

module.exports = resolvers;