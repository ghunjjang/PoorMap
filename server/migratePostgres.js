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
        isHot BOOLEAN DEFAULT FALSE,
        affiliate_url TEXT
      );
    `;

    // Ensure affiliate_url exists if table was already created
    try {
      await sql`ALTER TABLE deals ADD COLUMN IF NOT EXISTS affiliate_url TEXT`;
    } catch (e) {
      console.log('affiliate_url column might already exist.');
    }

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
    // 3. Seed Deals (Check if empty)
    const { count: dealCount } = (await sql`SELECT COUNT(*) FROM deals`)[0];
    if (parseInt(dealCount) === 0) {
      console.log('Seeding budget amazon deals...');
      const amazonDeals = [
        ['Amazon.co.jp', '🛒', '생필품', '기린 LAKURAKU 생수 2L x 9병', '정기구독 시 추가 할인! 1병당 약 90엔의 초가성비 생수.', 1500, 880, 41, '할인명탐정', '2026-04-05T10:00:00', '2026-05-30', true, 'https://www.amazon.co.jp/dp/B07JJL1T6T?tag=amazon0ff1f1-20'],
        ['Amazon.co.jp', '🛒', '식품', '닛신 컵누들 20개 박스세트', '개당 150엔 꼴! 편의점보다 훨씬 저렴한 비상식량.', 4500, 2980, 33, '라면고수', '2026-04-06T12:00:00', '2026-05-15', true, 'https://www.amazon.co.jp/dp/B002P67WY4?tag=amazon0ff1f1-20'],
        ['Amazon.co.jp', '🛒', '생필품', '에리에르 화장지 12롤 x 6팩', '벌크 구매로 생활비 절약! 부드러운 품질과 압도적 가성비.', 4000, 2480, 38, '살림왕', '2026-04-07T09:30:00', '2026-06-01', false, 'https://www.amazon.co.jp/dp/B07BHKZFFG?tag=amazon0ff1f1-20'],
        ['Amazon.co.jp', '🛒', '가전', 'Anker 고속 충전기 20W', '작지만 강력한 성능. 여행 필수템 가성비 충전기.', 2500, 1780, 29, 'IT매니아', '2026-04-08T14:20:00', '2026-04-30', true, 'https://www.amazon.co.jp/dp/B08P59N6S2?tag=amazon0ff1f1-20']
      ];

      for (const d of amazonDeals) {
        await sql`
          INSERT INTO deals (source, sourceIcon, category, title, description, originalPrice, dealPrice, discount, author, createdAt, expiresAt, isHot, affiliate_url)
          VALUES (${d[0]}, ${d[1]}, ${d[2]}, ${d[3]}, ${d[4]}, ${d[5]}, ${d[6]}, ${d[7]}, ${d[8]}, ${d[9]}, ${d[10]}, ${d[11]}, ${d[12]})
        `;
      }
      console.log('Amazon deals seeded.');
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
