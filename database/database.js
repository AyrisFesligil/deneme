// SQLite bağlantısı oluşturuluyor
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('giftora.db');

// Veritabanı tabloları oluşturuluyor
export const initDB = () => {
  db.transaction(tx => {
    // Kullanıcılar tablosu
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );`
    );

    // Hediye istekleri tablosu
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS gifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        keywords TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );`
    );

    // Önerilen hediye linkleri
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS suggestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gift_id INTEGER,
        title TEXT,
        url TEXT,
        FOREIGN KEY (gift_id) REFERENCES gifts (id)
      );`
    );
  });
};

// Veritabanı bağlantısını dışa aktarma
export const getDB = () => db;
