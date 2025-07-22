// db.js

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

// Path to database file
const dbPath = path.resolve(__dirname, 'students.db');

// Create and export a database connection
let db;

async function initDB() {
  if (!db) {
    db = await sqlite.open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matric TEXT UNIQUE NOT NULL,
        fullname TEXT NOT NULL,
        email TEXT NOT NULL,
        image TEXT
      )
    `);
  }
  return db;
}

module.exports = initDB;
