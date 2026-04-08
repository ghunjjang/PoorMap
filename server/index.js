import express from 'express';
import cors from 'cors';
import { sql } from '@vercel/postgres';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- RESTAURANTS ---
app.get('/api/restaurants', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM restaurants`;
    res.json(rows);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/restaurants', async (req, res) => {
  const { name, genre, price, lat, lng, area, address, description, emoji } = req.body;
  try {
    const { rows } = await sql`
      INSERT INTO restaurants (name, genre, price, rating, lat, lng, area, address, description, emoji)
      VALUES (${name}, ${genre}, ${price}, 0.0, ${lat}, ${lng}, ${area}, ${address}, ${description}, ${emoji || '📍'})
      RETURNING id
    `;
    res.json({ id: rows[0].id, success: true });
  } catch (err) {
    console.error('Error reporting restaurant:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- POSTS ---
app.get('/api/posts', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM posts ORDER BY id DESC`;
    res.json(rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/posts', async (req, res) => {
  const { category, title, author, content, isHot } = req.body;
  const createdAt = new Date().toISOString();
  try {
    const { rows } = await sql`
      INSERT INTO posts (category, title, author, content, createdAt, isHot)
      VALUES (${category}, ${title}, ${author}, ${content}, ${createdAt}, ${isHot ? true : false})
      RETURNING id
    `;
    res.json({ id: rows[0].id, success: true });
  } catch (err) {
    console.error('Error posting community content:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- DEALS ---
app.get('/api/deals', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM deals ORDER BY id DESC`;
    res.json(rows);
  } catch (err) {
    console.error('Error fetching deals:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/deals/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    await sql`UPDATE deals SET likes = likes + 1 WHERE id = ${id}`;
    res.json({ success: true });
  } catch (err) {
    console.error('Error liking deal:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API Server (Vercel Postgres) running on http://localhost:${PORT}`);
});
