// src/database.js
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

const DB_SOURCE = './studydeck.sqlite';

const connect = async () => {
  try {
    const db = await sqlite.open({
      filename: DB_SOURCE,
      driver: sqlite3.Database,
    });

    console.log('Conectado ao banco de dados SQLite.');

    await db.run('PRAGMA foreign_keys = ON');

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        start_time TEXT,
        end_time TEXT,
        status TEXT NOT NULL DEFAULT 'pendente',
        color TEXT DEFAULT '#FFFFFF',
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`);

    return db;
  } catch (err) {
    console.error('Erro ao abrir ou configurar o banco de dados:', err.message);
    throw err;
  }
};

module.exports = connect();
