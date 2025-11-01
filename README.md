# Node.js Eğitim Projesi

Bu proje, Node.js ekosistemindeki temel ve ileri düzey konuları öğrenmek için tasarlanmış kapsamlı bir eğitim uygulamasıdır. Proje, modern web geliştirme pratiklerini, RESTful API tasarımını, GraphQL entegrasyonunu, real-time iletişimi ve güvenlik özelliklerini içermektedir.

## 📋 İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Özellikler](#özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Kullanılan Paketler](#kullanılan-paketler)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum Adımları](#kurulum-adımları)
- [Veritabanı Yapılandırması](#veritabanı-yapılandırması)
- [Projeyi Çalıştırma](#projeyi-çalıştırma)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [GraphQL Kullanımı](#graphql-kullanımı)
- [Socket.io ile Real-Time İletişim](#socketio-ile-real-time-iletişim)
- [Güvenlik Özellikleri](#güvenlik-özellikleri)

## 🎯 Proje Hakkında

Bu proje, bir e-ticaret ürün yönetim sistemi üzerinden Node.js'in temel kavramlarını öğretmek için geliştirilmiştir. Proje içerisinde:

- **RESTful API** mimarisi
- **GraphQL** sorgu dili entegrasyonu
- **JWT tabanlı kimlik doğrulama** (Authentication)
- **Rol bazlı yetkilendirme** (Authorization)
- **Socket.io** ile gerçek zamanlı iletişim
- **Dosya yükleme** (Image Upload)
- **MySQL** veritabanı yönetimi
- **EJS** template engine ile server-side rendering
- **Middleware** kullanımı ve özelleştirme

konuları detaylı şekilde işlenmiştir.

## ✨ Özellikler

### 1. Kullanıcı Yönetimi
- ✅ Kullanıcı kaydı (Register)
- ✅ Kullanıcı girişi (Login)
- ✅ JWT tabanlı oturum yönetimi
- ✅ Rol bazlı yetkilendirme (Admin/User)
- ✅ Güvenli parola saklama (bcrypt)

### 2. Ürün Yönetimi
- ✅ Ürün listeleme (CRUD - Read)
- ✅ Yeni ürün ekleme (CRUD - Create)
- ✅ Ürün güncelleme (CRUD - Update)
- ✅ Ürün silme (CRUD - Delete)
- ✅ Ürün resmi yükleme (Multer)

### 3. API Desteği
- ✅ RESTful API endpoint'leri
- ✅ GraphQL API desteği
- ✅ Apollo Server entegrasyonu

### 4. Real-Time İletişim
- ✅ Socket.io ile anlık yorum sistemi
- ✅ Çift yönlü iletişim

### 5. Güvenlik
- ✅ HTTP-only Cookie kullanımı
- ✅ Şifreli parola saklama
- ✅ JWT token doğrulama
- ✅ Role-based access control

## 🛠 Kullanılan Teknolojiler

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MySQL**: İlişkisel veritabanı
- **GraphQL**: API sorgu dili
- **Socket.io**: Real-time bidirectional communication
- **EJS**: Embedded JavaScript templating
- **JWT**: JSON Web Token authentication

## 📦 Kullanılan Paketler

### Ana Bağımlılıklar (Dependencies)

#### 1. **express** (v5.1.0)
- **Amaç**: Web sunucusu ve API oluşturmak için kullanılan hızlı, minimalist web framework'ü
- **Kullanım Alanı**: Routing, middleware yönetimi, HTTP isteklerini işleme

#### 2. **mysql2** (v3.15.3)
- **Amaç**: MySQL veritabanı için Node.js driver
- **Kullanım Alanı**: MySQL bağlantısı, sorgu çalıştırma, connection pool yönetimi
- **Özellik**: Promise desteği ile async/await kullanımına uygundur

#### 3. **dotenv** (v17.2.3)
- **Amaç**: Ortam değişkenlerini (environment variables) `.env` dosyasından yükleme
- **Kullanım Alanı**: Veritabanı bilgileri, JWT secret, port numarası gibi hassas bilgileri güvenli şekilde saklama

#### 4. **bcryptjs** (v3.0.2)
- **Amaç**: Parolaları hash'lemek ve karşılaştırmak için
- **Kullanım Alanı**: Kullanıcı parolalarını güvenli bir şekilde veritabanında saklama
- **Özellik**: Salt oluşturma ve hash karşılaştırma

#### 5. **jsonwebtoken** (v9.0.2)
- **Amaç**: JWT (JSON Web Token) oluşturma ve doğrulama
- **Kullanım Alanı**: Kullanıcı kimlik doğrulama, oturum yönetimi
- **Özellik**: Token oluşturma, imzalama ve doğrulama

#### 6. **cookie-parser** (v1.4.7)
- **Amaç**: HTTP cookie'lerini parse etme
- **Kullanım Alanı**: JWT token'ı cookie'de saklama ve okuma
- **Özellik**: req.cookies objesi ile cookie'lere erişim

#### 7. **multer** (v2.0.2)
- **Amaç**: Multipart/form-data işleme (dosya yükleme)
- **Kullanım Alanı**: Ürün resimlerini sunucuya yükleme
- **Özellik**: Dosya boyutu kontrolü, dosya tipi filtreleme, özel isimlendirme

#### 8. **ejs** (v3.1.10)
- **Amaç**: Embedded JavaScript template engine
- **Kullanım Alanı**: Server-side rendering, dinamik HTML sayfaları oluşturma
- **Özellik**: Partial views, layout sistemi

#### 9. **socket.io** (v4.8.1)
- **Amaç**: Real-time bidirectional event-based communication
- **Kullanım Alanı**: Anlık yorum sistemi, canlı bildirimler
- **Özellik**: WebSocket bağlantısı, room/namespace desteği

#### 10. **apollo-server-express** (v3.13.0)
- **Amaç**: GraphQL sunucusu oluşturma
- **Kullanım Alanı**: GraphQL API endpoint'leri oluşturma
- **Özellik**: Schema tanımlama, resolver fonksiyonları, GraphQL Playground

#### 11. **graphql** (v16.11.0)
- **Amaç**: GraphQL şema dili ve sorgu çalıştırma motoru
- **Kullanım Alanı**: GraphQL type definitions ve query/mutation tanımlama
- **Özellik**: Tip güvenliği, esnek veri sorgulama

### Geliştirme Bağımlılıkları (Dev Dependencies)

#### 12. **nodemon** (v3.1.10)
- **Amaç**: Dosya değişikliklerini izleyerek sunucuyu otomatik yeniden başlatma
- **Kullanım Alanı**: Geliştirme ortamında üretkenlik artırma
- **Özellik**: Otomatik restart, konfigurasyon desteği

## 📁 Proje Yapısı

```
NodeJSEgitimProjesi/
│
├── config/
│   └── db.js                      # MySQL bağlantı yapılandırması ve veritabanı başlatma
│
├── controllers/
│   ├── authController.js          # Kimlik doğrulama işlemleri (login, register, logout)
│   └── productController.js       # Ürün CRUD işlemleri
│
├── middleware/
│   ├── authMiddleware.js          # JWT doğrulama ve yetkilendirme middleware'i
│   ├── logger.js                  # HTTP isteklerini loglama middleware'i
│   └── upload.js                  # Multer dosya yükleme yapılandırması
│
├── routes/
│   ├── authRoutes.js              # Kimlik doğrulama rotaları
│   └── productRoutes.js           # Ürün API rotaları
│
├── graphql/
│   ├── schema.js                  # GraphQL şema tanımlamaları
│   └── resolvers.js               # GraphQL resolver fonksiyonları
│
├── views/
│   ├── layout.ejs                 # Ana layout şablonu
│   ├── index.ejs                  # Ana sayfa
│   ├── auth/
│   │   └── login.ejs              # Giriş sayfası
│   └── admin/
│       ├── product_form.ejs       # Yeni ürün ekleme formu
│       ├── product_edit_form.ejs  # Ürün düzenleme formu
│       └── product_list.ejs       # Ürün listesi sayfası
│
├── public/
│   ├── js/
│   │   ├── layout.js              # Genel JavaScript fonksiyonları
│   │   ├── product_form.js        # Ürün ekleme form işlemleri
│   │   ├── product_edit_form.js   # Ürün düzenleme form işlemleri
│   │   └── product_list.js        # Ürün listeleme işlemleri
│   └── uploads/
│       └── images/                # Yüklenen ürün resimleri
│
├── .env                           # Ortam değişkenleri (veritabanı, JWT secret vb.)
├── example.env                    # .env dosyası için örnek şablon
├── package.json                   # Proje bağımlılıkları ve scriptler
├── server.js                      # Ana sunucu dosyası ve uygulama başlangıcı
└── README.md                      # Proje dokümantasyonu
```

## 🚀 Kurulum Adımları

### Ön Gereksinimler

Sisteminizde aşağıdaki yazılımların kurulu olması gerekmektedir:

1. **Node.js** (v16 veya üzeri) - [İndir](https://nodejs.org/)
2. **MySQL** (v8.0 veya üzeri) - [İndir](https://dev.mysql.com/downloads/)
3. **Git** (Opsiyonel) - [İndir](https://git-scm.com/)

### Adım 1: Projeyi İndirme

```bash
# Git ile klonlama
git clone https://github.com/talipcakir/NodeJSEgitimProjesi.git
cd NodeJSEgitimProjesi

# veya ZIP dosyasını indirip çıkartın
```

### Adım 2: Node.js Paketlerini Yükleme

Proje dizininde terminali açın ve aşağıdaki komutu çalıştırın:

```bash
npm install
```

Bu komut, `package.json` dosyasında tanımlanan tüm bağımlılıkları (dependencies ve devDependencies) yükleyecektir.

**Yüklenen Paketler:**
- express
- mysql2
- dotenv
- bcryptjs
- jsonwebtoken
- cookie-parser
- multer
- ejs
- socket.io
- apollo-server-express
- graphql
- nodemon (dev dependency)

### Adım 3: Ortam Değişkenlerini Ayarlama

1. `example.env` dosyasını kopyalayıp `.env` olarak yeniden adlandırın:

```bash
cp example.env .env
```

2. `.env` dosyasını bir metin editörü ile açın ve gerekli değerleri düzenleyin:

```env
# Sunucu Portu
PORT=3000

# MySQL Veritabanı Bilgileri
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=node_egitim_projesi_db

# JSON Web Token (JWT) Gizli Anahtarı
JWT_SECRET=your_very_secret_and_long_key_here_123!@#
JWT_EXPIRES_IN=30d
```

**Önemli Notlar:**
- `DB_PASSWORD`: MySQL root kullanıcınızın parolasını girin
- `JWT_SECRET`: Güçlü, tahmin edilemez bir anahtar kullanın
- Güvenlik için production ortamında bu değerleri mutlaka değiştirin

### Adım 4: MySQL Veritabanı Hazırlığı

MySQL sunucusunun çalıştığından emin olun. Veritabanı ve tablolar otomatik olarak oluşturulacaktır.

**MySQL Kullanıcısı Oluşturma (Önerilen):**

```sql
-- MySQL terminalinde veya MySQL Workbench'te çalıştırın
CREATE USER 'nodejs_user'@'localhost' IDENTIFIED BY 'guvenli_sifre';
GRANT ALL PRIVILEGES ON node_egitim_projesi_db.* TO 'nodejs_user'@'localhost';
FLUSH PRIVILEGES;
```

Ardından `.env` dosyanızı buna göre güncelleyin:
```env
DB_USER=nodejs_user
DB_PASSWORD=guvenli_sifre
```

## 💾 Veritabanı Yapılandırması

Proje ilk çalıştırıldığında otomatik olarak:

### 1. Veritabanı Oluşturulur
```sql
CREATE DATABASE IF NOT EXISTS node_egitim_projesi_db;
```

### 2. Tablolar Oluşturulur

**Users Tablosu:**
```sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Products Tablosu:**
```sql
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  imageUrl VARCHAR(512),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Varsayılan Veriler Eklenir

**Varsayılan Admin Kullanıcısı:**
- **Email**: `admin@proje.com`
- **Kullanıcı Adı**: `admin_default`
- **Parola**: `GucluSifre123`
- **Rol**: `admin`

**Örnek Ürünler:**
- Laptop Pro X
- Akıllı Telefon Z
- Kablosuz Kulaklık

## ▶️ Projeyi Çalıştırma

### Geliştirme Modunda Çalıştırma

```bash
npm start
```

Bu komut `nodemon` ile sunucuyu başlatır. Kod değişikliklerinde otomatik olarak yeniden başlar.

### Normal Modda Çalıştırma

```bash
node server.js
```

### Sunucu Çalıştıktan Sonra

Terminalde aşağıdaki mesajları görmelisiniz:

```
Veritabanı ve tablolar ('products', 'users') başarıyla kontrol edildi/oluşturuldu.
Sunucu http://localhost:3000 adresinde çalışıyor.
GraphQL Server http://localhost:3000/graphql adresinde hazır.
```

## 🔌 API Dokümantasyonu

### REST API Endpoints

#### Kimlik Doğrulama (Auth)

**1. Kullanıcı Kaydı**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "role": "user"  // opsiyonel, varsayılan: "user"
}
```

**2. Kullanıcı Girişi**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@proje.com",
  "password": "GucluSifre123"
}
```

**Yanıt:**
```json
{
  "success": true,
  "message": "Giriş başarılı.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin_default",
    "email": "admin@proje.com",
    "role": "admin"
  }
}
```

**3. Kullanıcı Çıkışı**
```http
GET /api/auth/logout
```

**4. Giriş Yapmış Kullanıcı Bilgisi**
```http
GET /api/auth/me
Authorization: Bearer <JWT_TOKEN>
```

#### Ürün İşlemleri (Products)

**1. Tüm Ürünleri Listeleme**
```http
GET /api/products
```

**Yanıt:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Laptop Pro X",
      "description": "Yüksek performanslı dizüstü bilgisayar.",
      "price": 25000.00,
      "imageUrl": "https://placehold.co/300x200?text=Laptop",
      "createdAt": "2025-11-01T10:30:00.000Z"
    },
    // ...diğer ürünler
  ]
}
```

**2. Tek Ürün Getirme**
```http
GET /api/products/:id
```

**3. Yeni Ürün Ekleme** (Admin yetkisi gerekli)
```http
POST /api/products
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

name: "Yeni Ürün"
description: "Ürün açıklaması"
price: 1500.50
image: [dosya]
```

**4. Ürün Güncelleme** (Admin yetkisi gerekli)
```http
PUT /api/products/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Güncellenmiş Ürün",
  "description": "Yeni açıklama",
  "price": 1800.00
}
```

**5. Ürün Silme** (Admin yetkisi gerekli)
```http
DELETE /api/products/:id
Authorization: Bearer <JWT_TOKEN>
```

### Web Sayfaları

- `GET /` - Ana sayfa
- `GET /login` - Giriş sayfası
- `GET /admin/products` - Ürün listesi (Admin)
- `GET /admin/products/add` - Yeni ürün ekleme formu (Admin)
- `GET /admin/products/edit/:id` - Ürün düzenleme formu (Admin)

## 🔮 GraphQL Kullanımı

GraphQL Playground'a erişim: `http://localhost:3000/graphql`

### GraphQL Şeması

**Type Definitions:**
```graphql
type Product {
  id: ID!
  name: String!
  description: String
  price: Float!
  imageUrl: String
  createdAt: String!
}

type Query {
  products: [Product!]!
  product(id: ID!): Product
}

type Mutation {
  createProduct(
    name: String!
    description: String
    price: Float!
    imageUrl: String
  ): Product

  updateProduct(
    id: ID!
    name: String
    description: String
    price: Float
  ): Product

  deleteProduct(id: ID!): String
}
```

### Örnek Sorgular

**Tüm Ürünleri Getirme:**
```graphql
query {
  products {
    id
    name
    description
    price
    imageUrl
    createdAt
  }
}
```

**Tek Ürün Getirme:**
```graphql
query {
  product(id: "1") {
    id
    name
    description
    price
    imageUrl
  }
}
```

**Yeni Ürün Ekleme:**
```graphql
mutation {
  createProduct(
    name: "GraphQL Ürünü"
    description: "GraphQL ile eklendi"
    price: 999.99
    imageUrl: "https://placehold.co/300x200"
  ) {
    id
    name
    price
  }
}
```

**Ürün Güncelleme:**
```graphql
mutation {
  updateProduct(
    id: "1"
    name: "Güncellenmiş İsim"
    price: 1299.99
  ) {
    id
    name
    price
  }
}
```

**Ürün Silme:**
```graphql
mutation {
  deleteProduct(id: "1")
}
```

## 🔌 Socket.io ile Real-Time İletişim

### Client-Side Kullanım

```javascript
// Socket.io client library'i dahil edin
<script src="/socket.io/socket.io.js"></script>

// Bağlantı oluşturma
const socket = io('http://localhost:3000');

// Yorum gönderme
socket.emit('send_comment', {
  user: 'Kullanıcı Adı',
  comment: 'Merhaba, bu bir yorum!'
});

// Yorum alma
socket.on('receive_comment', (data) => {
  console.log('Yeni yorum:', data);
  // data.user, data.comment, data.time
});
```

### Sunucu Tarafı Events

- `connection`: Yeni kullanıcı bağlandığında
- `send_comment`: Kullanıcıdan yorum alındığında
- `receive_comment`: Tüm kullanıcılara yorum yayınlandığında
- `disconnect`: Kullanıcı bağlantısı kesildiğinde

## 🔒 Güvenlik Özellikleri

### 1. Parola Güvenliği
- **bcryptjs** kullanılarak parolalar hash'lenir
- Salt oluşturularak ek güvenlik sağlanır
- Veritabanında düz metin parola saklanmaz

### 2. JWT Token Güvenliği
- Token'lar `JWT_SECRET` ile imzalanır
- HTTP-only cookie'lerde saklanır (XSS saldırılarına karşı koruma)
- Token süresi dolduğunda otomatik olarak geçersiz olur

### 3. Yetkilendirme Katmanları
- `protect`: JWT token doğrulama middleware'i
- `authorize`: Rol bazlı erişim kontrolü (admin/user)
- Admin endpoint'leri koruma altındadır

### 4. Dosya Yükleme Güvenliği
- Dosya boyutu sınırlaması (5MB)
- Dosya tipi kontrolü (sadece resim dosyaları)
- Güvenli dosya isimlendirme

### 5. SQL Injection Koruması
- Parametreli sorgular kullanımı
- mysql2 prepared statements

## 🎓 Öğrenme Konuları

Bu proje üzerinde çalışarak şunları öğrenebilirsiniz:

### Backend Geliştirme
- Express.js ile web sunucusu oluşturma
- Middleware kavramı ve özel middleware yazma
- Routing ve route organization
- Error handling ve logging

### Veritabanı İşlemleri
- MySQL ile CRUD operasyonları
- Connection pooling
- Database migration ve initialization
- Async/await ile veritabanı işlemleri

### Kimlik Doğrulama & Yetkilendirme
- JWT tabanlı authentication
- Password hashing ile bcrypt
- Cookie-based session management
- Role-based access control

### API Geliştirme
- RESTful API tasarımı
- GraphQL şema tasarımı
- Resolver fonksiyonları
- API versioning ve best practices

### Real-Time İletişim
- Socket.io ile WebSocket bağlantıları
- Event-driven architecture
- Bidirectional communication

### Frontend Entegrasyonu
- EJS template engine
- Server-side rendering
- AJAX requests
- Form handling

### Dosya İşlemleri
- Multer ile dosya yükleme
- File system operations
- Static file serving

## 🐛 Hata Ayıklama

### Yaygın Hatalar ve Çözümleri

**1. Veritabanı Bağlantı Hatası**
```
Error: ER_ACCESS_DENIED_ERROR
```
**Çözüm**: `.env` dosyasındaki veritabanı bilgilerini kontrol edin.

**2. Port Kullanımda**
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Çözüm**: 
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# veya .env dosyasında farklı bir port kullanın
```

**3. JWT Token Hatası**
```
JsonWebTokenError: invalid signature
```
**Çözüm**: `JWT_SECRET` değerinin doğru olduğundan emin olun.

## 📚 Kaynaklar ve Dokümantasyon

- [Node.js Resmi Dokümantasyon](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MySQL2 Dokümantasyon](https://github.com/sidorares/node-mysql2)
- [JWT.io](https://jwt.io/)
- [Socket.io Dokümantasyon](https://socket.io/docs/)
- [GraphQL Dokümantasyon](https://graphql.org/learn/)
- [Apollo Server Dokümantasyon](https://www.apollographql.com/docs/apollo-server/)

## 🤝 Katkıda Bulunma

Bu eğitim projesine katkıda bulunmak isterseniz:

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/YeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/YeniOzellik`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje eğitim amaçlıdır ve serbestçe kullanılabilir.

## 👨‍💻 Geliştirici

Bu proje Node.js eğitimi için hazırlanmıştır.

## 📧 İletişim

Sorularınız için:
- Email: [your-email@example.com]
- GitHub Issues: [[repository-url](https://github.com/talipcakir/NodeJSEgitimProjesi)/issues]

---

**Not**: Production ortamında kullanmadan önce mutlaka güvenlik değerlendirmesi yapın ve hassas bilgileri `.env` dosyasında saklayın. `.env` dosyasını asla git'e commit etmeyin!
