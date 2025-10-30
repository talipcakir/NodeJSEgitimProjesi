// --------------------------------------------------
// Dosya: graphql/schema.js
// Amaç: GraphQL Şema Tanımı (Type Definitions). Veri yapısını ve sorgu giriş noktalarını tanımlar.
// --------------------------------------------------

const { gql } = require('apollo-server-express');

// GraphQL şeması, GQL tag'i kullanılarak string olarak tanımlanır.
const typeDefs = gql`
  # 'Product' veri türü, veritabanındaki ürün tablosunu temsil eder.
  type Product {
    # ID alanı zorunludur (!) ve tam sayı (Int) türündedir.
    id: Int!
    # Ürün adı zorunludur ve string türündedir.
    name: String!
    # Açıklama alanı zorunlu değildir.
    description: String
    # Fiyat, ondalıklı sayı (Float) türündedir ve zorunludur.
    price: Float!
    # Resim yolu
    imageUrl: String
    # Oluşturulma tarihi
    createdAt: String
  }

  # 'Query' türü, istemcilerin sunucudan veri talep etmek için kullanabileceği
  # tüm ana giriş noktalarını (root fields) tanımlar.
  type Query {
    # products sorgusu: Product türünde bir dizi ([Product]) döndürür.
    products: [Product]
    # product(id) sorgusu: Belirli bir ID'ye sahip ürünü döndürür.
    # 'id' argümanı Int türündedir ve zorunludur.
    product(id: Int!): Product
  }

  # Mutation'lar (Veri değiştirme/ekleme/silme) bu örnekte tanımlanmamıştır.
  # type Mutation {
  #   ...
  # }
`;

module.exports = typeDefs;