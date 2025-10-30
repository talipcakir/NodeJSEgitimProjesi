// --------------------------------------------------
// Dosya: middleware/logger.js
// Amaç: Gelen tüm istekleri konsola kaydeden (log) basit bir middleware.
// --------------------------------------------------

const logger = (req, res, next) => {
  // Gelen isteğin metodunu (GET, POST vb.) ve URL'sini konsola yazdır.
  // req.method: İsteğin türü
  // req.originalUrl: İsteğin yapıldığı URL
  console.log(`[ISTEK] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  
  // 'next()', Express'e bu middleware'in işini bitirdiğini ve
  // bir sonraki adıma (bir sonraki middleware veya ana rota işleyicisi)
  // geçmesi gerektiğini söyler. Eğer 'next()' çağrılmazsa, istek burada takılı kalır.
  next();
};

module.exports = logger;