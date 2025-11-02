// --------------------------------------------------
// Dosya: server.js
// Amaç: Ana sunucu dosyası. Express, Socket.io, Veritabanı ve Middleware'leri kurar.
// --------------------------------------------------

const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');
const http = require('http'); 
const { Server } = require("socket.io"); 
const cookieParser = require('cookie-parser'); 
const { ApolloServer } = require('apollo-server-express'); 

// GraphQL şema ve çözümleyicileri
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Rota ve Middleware'ler
const loggerMiddleware = require('./middleware/logger');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const { protect, authorize } = require('./middleware/authMiddleware');

// .env dosyasındaki değişkenleri yükle
dotenv.config();

const app = express();
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- Socket.io Kurulumu ---
const server = http.createServer(app); 

// Socket.io sunucusu
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST']
  }
});

// Socket.io Olay İşleyicileri (Yorum ve anlık iletişim)
io.on('connection', (socket) => {
  console.log('Yeni bir kullanıcı bağlandı (Socket ID:', socket.id, ')');

  socket.on('send_comment', (data) => {
    console.log('Alınan yorum:', data);

    io.emit('receive_comment', {
      user: data.user || 'Anonim',
      comment: data.comment,
      time: new Date().toLocaleTimeString('tr-TR')
    });
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı bağlantıyı kopardı:', socket.id);
  });
});

// --- Express Ayarları ve Middleware'ler ---
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public')); 

// Not: Apollo Server (GraphQL) kendi body-parser'ını kullanır.
// express.json()'ı tüm uygulamaya uygularsak /graphql isteklerinde "stream is not readable"
// hatası alınabilir. Bu yüzden JSON parser'ı yalnızca REST API'lar için etkinleştiriyoruz.
app.use('/api', express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

app.use(loggerMiddleware); 

// JWT Cookie'sini Authorization Header'a taşıyan middleware
app.use((req, res, next) => {
    const token = req.cookies.jwt_token; 
    
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }
    next(); 
});


// --- GraphQL Entegrasyonu ---
const apolloServer = new ApolloServer({
  typeDefs, 
  resolvers, 
  introspection: true, 
  playground: true 
});

async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });
  // Konsol çıktısı, PORT başlatıldıktan sonra verilecektir.
}

startApolloServer();


// --- Uygulama Rotaları ---

// Ana Sayfa Rotası
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Node.js Eğitim Projesi' 
  });
});

// Kullanıcı Giriş Sayfası Rotası
app.get('/login', (req, res) => {
    res.render('auth/login', { 
        title: 'Giriş Yap',
        error: null
    });
});

// Admin Paneli Rota Grubu: Tüm alt yollar için önce koruma ve yetkilendirme uygulanır.
app.use('/admin', protect, authorize('admin')); 

// Admin Ürün Ekleme Formu
app.get('/admin/products/add', (req, res) => {
    res.render('admin/product_form', { 
        title: 'Admin Paneli - Yeni Ürün Ekle'
    });
});

// Admin Ürün Listeleme Sayfası
app.get('/admin/products', (req, res) => {
    res.render('admin/product_list', { 
        title: 'Admin Paneli - Ürün Listesi'
    });
});

// >>> DÜZELTME BAŞLANGICI: Ürün Düzenleme Formu Rotası <<<
// @route GET /admin/products/edit/:id
// @desc  Belirli bir ürünü düzenleme formunu gösterir.
app.get('/admin/products/edit/:id', (req, res) => {
    // req.params.id ile ürün ID'si alınır
    const productId = req.params.id; 
    res.render('admin/product_edit_form', { 
        title: `Admin Paneli - Ürün ${productId} Düzenle`,
        productId: productId // EJS sayfasına ürün ID'sini gönder
    });
});
// >>> DÜZELTME BİTİŞİ <<<


// API Rotaları
app.use('/api/auth', authRoutes); 
app.use('/api/products', productRoutes); 


// --- Sunucuyu Başlatma ---

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.initializeDatabase();
    
    server.listen(PORT, () => {
      console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
      console.log(`GraphQL Server http://localhost:${PORT}/graphql adresinde hazır.`);
    });
  } catch (error) {
    console.error("Sunucu başlatılırken kritik bir hata oluştu:", error);
    process.exit(1);
  }
}

startServer();