const { neon } = require('@neondatabase/serverless');

async function migrate() {
  const sql = neon(process.env.POSTGRES_URL);

  console.log('Starting migration to Neon Postgres...');

  try {
    // 1. Create Tables
    await sql`
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        nameKr TEXT NOT NULL,
        genre TEXT NOT NULL,
        price INTEGER NOT NULL,
        rating DECIMAL(3,2) NOT NULL,
        lat DECIMAL(9,6) NOT NULL,
        lng DECIMAL(9,6) NOT NULL,
        area TEXT NOT NULL,
        address TEXT NOT NULL,
        tags TEXT[] NOT NULL,
        reviews INTEGER NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS community_posts (
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
    const resCount = (await sql`SELECT COUNT(*) FROM restaurants`)[0].count;
    if (parseInt(resCount) === 0) {
      console.log('Seeding restaurants...');
      await sql`
        INSERT INTO restaurants (name, nameKr, genre, price, rating, lat, lng, area, address, tags, reviews, image, description)
        VALUES ('松屋 新宿東口店', '마츠야 신주쿠 히가시구치점', '牛丼', 450, 3.42, 35.6925, 139.7035, '新宿', '東京都新宿区新宿3-22-7', ARRAY['一人OK', '深夜営業', '大盛り無料'], 128, '🥩', '牛めし並盛450円. 24시간 영업으로 심야 이용 가능.')
      `;
    }

    // 3. Seed Deals (Clear and re-seed with 12 items for richness)
    console.log('Refreshing budget amazon deals (12 items)...');
    await sql`DELETE FROM deals`; // Clear existing to ensure fresh 12 items
    
    const amazonDeals = [
      ['Amazon.co.jp', '🛒', '생필품', '[Amazon 브랜드] 천연수 2L x 9병 (라벨리스)', '아마존 베스트셀러! 라벨이 없어 분리수거가 간편한 초가성비 생수입니다.', 1500, 1180, 21, '할인명탐정', '2026-04-05T10:00:00', '2026-05-30', true, 'https://www.amazon.co.jp/dp/B08GZR18S3?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🍜', '식품', '닛신 컵누들 78g x 20개입 (벌크)', '일본 국민 컵라면! 벌크 구매로 개당 가격을 낮춘 최강의 비상식량입니다.', 5000, 4400, 12, '라면고수', '2026-04-06T12:00:00', '2026-05-15', true, 'https://www.amazon.co.jp/dp/B002P67WY4?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🛒', '생필품', '스코티 플라워 팩 화장지 12롤 (3배 더 긴 타입)', '일반 롤보다 3배 길어 교체 주기와 보관 공간을 아껴주는 경제적인 제품입니다.', 1800, 1220, 32, '살림왕', '2026-04-07T09:30:00', '2026-06-01', false, 'https://www.amazon.co.jp/dp/B085GDK3FH?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🔌', '가전', 'Anker PowerPort 2 Elite (24W 2포트 충전기)', '수만 개의 리뷰가 증명하는 스테디셀러 고속 충전기. 여행용으로도 최고입니다.', 2000, 1580, 21, 'IT매니아', '2026-04-08T14:20:00', '2026-04-30', true, 'https://www.amazon.co.jp/dp/B06ZXXQGZ8?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🛒', '식품', '아키타현산 아키타코마치 5kg (백미)', '무거운 쌀도 집 앞까지 배송! 찰지고 맛있는 아키타코마치 햅쌀입니다.', 3500, 2880, 18, '밥심', '2026-04-08T15:00:00', '2026-05-20', true, 'https://www.amazon.co.jp/dp/B00G0N9HGE?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🛒', '생필품', '어택 ZERO 세탁세제 리필 대용량 1620g', '세정력이 뛰어난 어택 제로. 리필용 대용량으로 생활비를 절약하세요.', 2200, 1480, 33, '빨래왕', '2026-04-08T16:00:00', '2026-06-15', false, 'https://www.amazon.co.jp/dp/B08FBXWXYX?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🛒', '생필품', '큐큐토 주방세제 대용량 리필 1380ml', '기름기 제거에 탁월한 큐큐토. 대용량 리필로 경제적입니다.', 1200, 780, 35, '설거지인생', '2026-04-08T16:30:00', '2026-07-01', true, 'https://www.amazon.co.jp/dp/B07T99S7P4?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '☕', '식품', '네스카페 엑셀라 180g (스틱/리필)', '깊고 진한 맛의 네스카페 엑셀라. 매일 마시는 커피도 가성비 있게!', 1500, 1100, 27, '카페인중독', '2026-04-08T17:00:00', '2026-05-10', true, 'https://www.amazon.co.jp/dp/B00G0N9HGE?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🧼', '생필품', '비오레 u 손세정제 리필 800ml x 2개', '온 가족이 사용하는 비오레 u. 2개 묶음 세트로 더욱 저렴합니다.', 1800, 1380, 23, '청결매니아', '2026-04-08T17:15:00', '2026-08-30', false, 'https://www.amazon.co.jp/dp/B07C3L6WJS?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🍪', '식품', '가루비 포테토칩스우스시오지 60g x 12개입', '일본 국민 과자 가루비 포테토칩! 집에서 쟁여두고 먹기 좋습니다.', 1900, 1480, 22, '과자중독', '2026-04-08T17:30:00', '2026-05-05', true, 'https://www.amazon.co.jp/dp/B07G31Z9RR?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🍫', '식품', '메이지 밀크 초콜릿 50g x 10개입', '부드럽고 달콤한 메이지 초콜릿. 간식용으로 박스 구매 추천!', 1500, 1200, 20, '초코덕후', '2026-04-08T17:45:00', '2026-05-15', false, 'https://www.amazon.co.jp/dp/B007R9S1F2?tag=amazon0ff1f1-20'],
      ['Amazon.co.jp', '🔌', '가전', 'Amazon 베이직 HDMI 케이블 1.8m', '믿고 쓰는 아마존 베이직! 고품질 HDMI 케이블을 저렴한 가격에 만나보세요.', 1200, 880, 27, '가전전문가', '2026-04-08T18:00:00', '2026-12-31', true, 'https://www.amazon.co.jp/dp/B014I8SSD0?tag=amazon0ff1f1-20']
    ];

    for (const d of amazonDeals) {
      await sql`
        INSERT INTO deals (source, sourceIcon, category, title, description, originalPrice, dealPrice, discount, author, createdAt, expiresAt, isHot, affiliate_url)
        VALUES (${d[0]}, ${d[1]}, ${d[2]}, ${d[3]}, ${d[4]}, ${d[5]}, ${d[6]}, ${d[7]}, ${d[8]}, ${d[9]}, ${d[10]}, ${d[11]}, ${d[12]})
      `;
    }
    console.log('12 Amazon deals seeded.');

    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
