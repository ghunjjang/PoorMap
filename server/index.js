import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const dbPath = path.resolve(__dirname, 'poormap.db');
const db = new Database(dbPath);

app.use(cors());
app.use(express.json());

// --- RESTAURANTS ---
app.get('/api/restaurants', (req, res) => {
  const stmt = db.prepare('SELECT * FROM restaurants');
  const rows = stmt.all();
  res.json(rows);
});

app.post('/api/restaurants', (req, res) => {
  const { name, genre, price, lat, lng, area, address, description, emoji } = req.body;
  const stmt = db.prepare(`
    INSERT INTO restaurants (name, genre, price, rating, lat, lng, area, address, description, emoji)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(name, genre, price, 0.0, lat, lng, area, address, description, emoji || '📍');
  res.json({ id: info.lastInsertRowid, success: true });
});

// --- POSTS ---
app.get('/api/posts', (req, res) => {
  const stmt = db.prepare('SELECT * FROM posts ORDER BY id DESC');
  const rows = stmt.all();
  res.json(rows);
});

app.post('/api/posts', (req, res) => {
  const { category, title, author, content, isHot } = req.body;
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO posts (category, title, author, content, createdAt, isHot)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(category, title, author, content, createdAt, isHot ? 1 : 0);
  res.json({ id: info.lastInsertRowid, success: true });
});

// --- DEALS ---
app.get('/api/deals', (req, res) => {
  const stmt = db.prepare('SELECT * FROM deals ORDER BY id DESC');
  const rows = stmt.all();
  res.json(rows);
});

app.post('/api/deals/:id/like', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('UPDATE deals SET likes = likes + 1 WHERE id = ?');
  stmt.run(id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend API Server running on http://localhost:${PORT}`);
});
