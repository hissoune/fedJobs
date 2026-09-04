import * as SQLite from 'expo-sqlite';

export const db = await SQLite.openDatabaseAsync('fedOps.db');

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  );
`);

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    longitude INTEGER NOT NULL,
    latitude INTEGER NOT NULL,
    address TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);