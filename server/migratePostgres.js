import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.POSTGRES_URL);

async function migrate() {
  try {
    console.log('Connecting to Vercel Postgres...');
    
    // 1. Create Tables
    console.log('Creating tables...');
    await sql`
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        genre TEXT NOT NULL,
        price INTEGER NOT NULL,
        rating FLOAT NOT NULL,
        lat FLOAT NOT NULL,
        lng FLOAT NOT NULL,
        area TEXT NOT NULL,
        address TEXT NOT NULL,
        description TEXT,
        emoji TEXT NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        content TEXT NOT NULL,
        comments INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL,
        isHot BOOLEAN DEFAULT FALSE
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS deals (
        id SERIAL PRIMARY KEY,
        source TEXT NOT NULL,
        sourceIcon TEXT NOT NULL,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        originalPrice INTEGER NOT NULL,
        dealPrice INTEGER NOT NULL,
        discount INTEGER NOT NULL,
        author TEXT NOT NULL,
        likes INTEGER DEFAULT 0,
        comments INTEGER DEFAULT 0,
        createdAt TEXT NOT NULL,
        expiresAt TEXT NOT NULL,
        isHot BOOLEAN DEFAULT FALSE
      );
    `;

    // 2. Seed Initial Data (Check if empty)
    const rows = await sql`SELECT COUNT(*) FROM restaurants`;
    if (parseInt(rows[0].count) === 0) {
      console.log('Seeding initial restaurants...');
      // Sample data from initDb.js logic
      const samples = [
        ['松屋 新宿大ガード店', '牛丼', 400, 3.8, 35.6934, 139.6999, '新宿', '東京都新宿区西新宿7-10-19', '新宿西口すぐ。いつでも安い牛めし。', '🥩'],
        ['ガ스트 新宿靖国通店', 'ファミレス', 600, 3.9, 35.6942, 139.7028, '新宿', '東京都新宿区歌舞伎町1-1-17', '코스파 최강의 햄버그와 드링크바.', '🍽️'],
        ['名代 富士そば 渋谷下田ビル店', 'そば・うどん', 400, 4.0, 35.6591, 139.7001, '渋谷', '東京都渋谷区宇田川町28-4', '시부야 센터가 인근 24시간 영업.', '🍜'],
        ['サイゼリヤ 渋谷東急ハンズ前店', 'イタリアン', 500, 4.2, 35.6616, 139.6983, '시부야', '東京都渋谷区宇田川町39-8', '도리아 300엔의 신화.', '🍕']
      ];

      for (const s of samples) {
        await sql`
          INSERT INTO restaurants (name, genre, price, rating, lat, lng, area, address, description, emoji)
          VALUES (${s[0]}, ${s[1]}, ${s[2]}, ${s[3]}, ${s[4]}, ${s[5]}, ${s[6]}, ${s[7]}, ${s[8]}, ${s[9]})
        `;
      }
      console.log('Seed data inserted.');
    } else {
      console.log('Database already has data. Skipping seed.');
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
