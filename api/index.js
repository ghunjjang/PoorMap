import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import { TwitterApi } from 'twitter-api-v2';

const app = express();
const sql = neon(process.env.POSTGRES_URL);

app.use(cors());
app.use(express.json());

// --- RESTAURANTS ---
app.get('/api/restaurants', async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM restaurants`;
    res.json(rows);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/restaurants/random', async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM restaurants ORDER BY RANDOM() LIMIT 1`;
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/restaurants', async (req, res) => {
  const { name, genre, price, lat, lng, area, address, description, emoji } = req.body;
  try {
    const rows = await sql`
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
    const rows = await sql`SELECT * FROM posts ORDER BY id DESC`;
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
    const rows = await sql`
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
    const rows = await sql`SELECT * FROM deals ORDER BY id DESC`;
    res.json(rows);
  } catch (err) {
    console.error('Error fetching deals:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/deals/:id/like', async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // 'plus' or 'minus'
  try {
    if (type === 'plus') {
      await sql`UPDATE deals SET likes = likes + 1 WHERE id = ${id}`;
    } else {
      await sql`UPDATE deals SET likes = GREATEST(0, likes - 1) WHERE id = ${id}`;
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error liking deal:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- AUTO TWEET (Cron) ---
const tweetTemplates = [
  (r) => `🍴 今日のコスパ飯！\n\n🏪 ${r.name}\n💴 ¥${r.price}\n⭐ ${Number(r.rating).toFixed(1)}\n📍 ${r.area}\n\n${r.description}\n\n全国のコスパ飯を地図で探せる👇\nhttps://poor-map.vercel.app\n\n#節約 #コスパ #貧乏マップ #激安グルメ`,
  (r) => `💡 ${r.area}のおすすめ格安飯\n\n🏪 ${r.name}\n💴 ¥${r.price} · ⭐${Number(r.rating).toFixed(1)}\n\n${r.description}\n\n🗾 貧乏マップで近くのお得な店を探そう！\nhttps://poor-map.vercel.app\n\n#節約飯 #激安 #コスパ最強 #安ウマ`,
  (r) => `🗾 貧乏マップ今日のピックアップ\n\n【${r.genre}】📍${r.area}\n\n✅ ${r.name}\n💴 ¥${r.price}〜 / ⭐ ${Number(r.rating).toFixed(1)}\n\n${r.description}\n\n地図で全国1万店舗以上を検索👇\nhttps://poor-map.vercel.app\n\n#節約 #安ウマ #コスパ飯 #貧乏飯`,
  (r) => `⚡ 1000円以下で満腹になれる店を発見！\n\n🏪 ${r.name}（${r.area}）\n💴 たったの¥${r.price}！\n⭐ ${Number(r.rating).toFixed(1)}\n\n${r.description}\n\n他にも全国のコスパ飯が見つかる👇\nhttps://poor-map.vercel.app\n\n#節約生活 #コスパ #格安グルメ #貧乏マップ`,
];

app.get('/api/cron/tweet', async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const rows = await sql`SELECT * FROM restaurants ORDER BY RANDOM() LIMIT 1`;
    if (!rows.length) return res.status(404).json({ error: 'No restaurants' });
    const r = rows[0];

    const template = tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)];
    const tweetText = template(r);

    const client = new TwitterApi({
      appKey: process.env.X_API_KEY,
      appSecret: process.env.X_API_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_SECRET,
    });

    const result = await client.v2.tweet(tweetText);
    console.log('Tweet posted:', result.data.id);
    res.json({ success: true, id: result.data.id, text: tweetText });
  } catch (err) {
    console.error('Tweet error:', err);
    res.status(500).json({ error: err.message });
  }
});

// For Vercel Serverless Functions, we export the app
export default app;
