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
        genre TEXT NOT NULL,
        price INTEGER NOT NULL,
        rating DECIMAL(3,2) NOT NULL,
        lat DECIMAL(9,6) NOT NULL,
        lng DECIMAL(9,6) NOT NULL,
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

    // Seed Posts (if empty)
    const postCount = (await sql`SELECT COUNT(*) FROM posts`)[0].count;
    if (parseInt(postCount) === 0) {
      console.log('Seeding example posts...');
      const samplePosts = [
        ['자유', '도쿄역 주변 500엔 이하 런치 추천받아요', '절약마스터', '출장 중인데 매번 편의점만 가기 지겹네요. 제대로 된 밥 한 끼 먹고 싶어요!', '2026-04-05T10:00:00', true],
        ['절약술', '식비 절약하는 나만의 노하우 3가지', '생활의달인', '1. 마트 마감 세일 공략, 2. 자가 제조 도시락, 3. 외식은 무조건 쿠폰 앱 활용!', '2026-04-06T12:00:00', true],
        ['식품', '아마존 닛신 컵라면 벌크 구매 후기', '라면전문가', '20개입 샀는데 개당 220엔 꼴이네요. 가성비 최고입니다.', '2026-04-07T09:00:00', false],
        ['가전', '전기세 아끼는 셋톱박스 전원 차단기', 'IT매니아', '대기전력만 아껴도 한 달 커피 한 잔 값은 나옵니다. 강추!', '2026-04-08T14:00:00', true],
        ['자유', '요즘 물가가 너무 올랐네요... 다들 어떻게 버티시나요?', '빈소년', '월급은 그대로인데 밥값만 오르니 한숨만 나옵니다 ㅠㅠ', '2026-04-09T11:00:00', false],
        ['절약술', '미세먼지 심한 날에는 외식 대신 집밥', '건강최고', '배달비 3000원 아껴서 건강도 챙기고 돈도 아끼고!', '2026-04-09T12:00:00', false]
      ];
      for (const p of samplePosts) {
        await sql`
          INSERT INTO posts (category, title, author, content, createdAt, isHot)
          VALUES (${p[0]}, ${p[1]}, ${p[2]}, ${p[3]}, ${p[4]}, ${p[5]})
        `;
      }
      console.log('Example posts seeded.');
    }

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

    // Ensure columns exist if table was already created
    try {
      await sql`ALTER TABLE deals ADD COLUMN IF NOT EXISTS affiliate_url TEXT`;
    } catch (e) {}

    // 2. Seed Initial Data (Check if empty)
    const resCount = (await sql`SELECT COUNT(*) FROM restaurants`)[0].count;
    if (parseInt(resCount) === 0) {
      console.log('Seeding restaurants...');
      const sampleRestaurants = [
        ['松屋 新宿大ガード店', '牛丼', 400, 3.8, 35.6934, 139.6999, '新宿', '東京都新宿区新宿7-10-19', '新宿西口すぐ。いつでも安い牛めし。', '🥩'],
        ['ガ스트 新宿靖国通店', 'ファミレス', 600, 3.9, 35.6942, 139.7028, '新宿', '東京都新宿区歌舞伎町1-1-17', 'コスパ最強のハンバーグとドリンクバー。', '🍽️'],
        ['名代 富士そば 渋谷下田ビル店', 'そば・うどん', 400, 4.0, 35.6591, 139.7001, '渋谷', '東京都渋谷区宇田川町28-4', '渋谷センター街近く、24時間営業の立ち食이そば。', '🍜'],
        ['サイゼリヤ 渋谷東急ハン즈前店', 'イタリアン', 500, 4.2, 35.6616, 139.6983, '渋谷', '東京都渋谷区宇田川町39-8', 'ミラノ風ドリア300円の最強コスパ。ワインも安い。', '🍕'],
        ['日高屋 秋葉原駅南店', '中華', 500, 3.7, 35.6982, 139.7749, '秋葉原', '東京都千代田区神田佐久間町1-16', '中華そば390円。仕事終わりのちょい飲みに最適。', '🥟'],
        ['名物 すた丼の屋 秋葉原店', '定食', 730, 4.1, 35.7005, 139.7733, '秋葉原', '東京都千代田区外神田3-2-12', 'ニンニク醤油がガツンと効いた豚肉丼。ボリューム満点。', '🍚'],
        ['カレーは飲み物。 御徒町店', 'カレー', 890, 4.0, 35.7061, 139.7744, '上野', '東京都台東区上野3-23-11', '店名に恥じないボリュームと濃厚さ. 黒カレーがおすすめ。', '🍛'],
        ['中華蕎麦 とみ田 (東京駅)', 'ラーメン', 950, 4.5, 35.6812, 139.7671, '東京駅', '東京都千代田区丸の内1-9-1', '東京駅直結で味わえる名店の味. やや高いが価値あり。', '🍜'],
        ['餃子の王将 池袋東口店', '中華', 600, 4.1, 35.7303, 139.7121, '池袋', '東京都豊島区南池袋2-27-5', '餃子とチャーハンの黄金セット最強。', '🥟'],
        ['鳥貴族 池袋東口店', '焼き鳥', 360, 4.0, 35.7299, 139.7135, '池袋', '東京都豊島区東池袋1-14-12', '全品均一価格. 貴族焼のボリュームがすごい。', '🍗'],
        ['すき家 渋谷井の頭通店', '牛丼', 400, 3.8, 35.6606, 139.6984, '渋谷', '東京都渋谷区宇田川町33-1', '種類豊富な牛丼と朝定食が魅力。', '🥩'],
        ['吉野家 秋葉原店', '牛丼', 420, 3.9, 35.6985, 139.7731, '秋葉原', '東京都千代田区外神田1-15-4', '早い、安い、うまい. 定番の味。', '🥩'],
        ['はなまるうどん 新宿東口店', 'うどん', 350, 4.0, 35.6917, 139.7029, '新宿', '東京都新宿区新宿3-21-2', 'かけうどんが圧倒的な安さ. 天ぷらも美味しい。', '🍜'],
        ['丸亀製麺 六本木ティーキュー브店', 'うどん', 400, 4.2, 35.6631, 139.7369, '六本木', '東京都港区六本木3-1-1', '打ち立てのコシのあるうどん. ネギ乗せ放題。', '🍜'],
        ['天丼てんや 八重洲店', '天丼', 560, 4.0, 35.6806, 139.7690, '東京駅', '東京都中央区八重洲1-6-15', '揚げたての天丼がこの価格で食べられる奇跡。', '🍤'],
        ['バーミヤン 上野駅前店', '中華', 700, 3.8, 35.7107, 139.7766, '上野', '東京都台東区上野7-2-16', '本格적인 中華がファミレス価格で楽しめる。', '🥟'],
        ['ジョイフル 京都伏見店', 'ファミレス', 550, 3.9, 34.9351, 135.7502, '京都', '京都府京都市伏見区下鳥羽浄春ヶ前町111', '西日本発祥の超絶コスパファミレス. 24시간 영업이 많다.', '🍽️'],
        ['スシロー 梅田茶屋町店', '寿司', 120, 4.1, 34.7061, 135.4988, '梅田', '大阪府大阪市北区茶屋町16-1', '100원대부터 먹을 수 있는 회전초밥의 왕자.', '🍣'],
        ['くら寿司 難波なんば店', '寿司', 125, 4.0, 34.6644, 135.5015, '難波', '大阪府大阪市中央区難波3-1-27', '비っくらポン이 즐겁다. 사이드 메뉴도 충실.', '🍣'],
        ['やよい軒 名古屋駅前店', '定食', 850, 4.1, 35.1709, 136.8815, '名古屋', '愛知県名古屋市中村区名駅4-26-25', '밥 리필 자유가 최고. 배부르게 먹을 수 있다.', '🍚'],
        ['なか卯 札幌駅地下街店', '丼ぶり・うどん', 450, 3.8, 43.0686, 141.3508, '札幌', '北海道札幌市中央区北5条西3丁目', '오야코동과 하이카라 우동 세트가 신의 가성비.', '🥚'],
        ['ココイチ 福岡天神店', 'カレー', 800, 4.2, 33.5898, 130.3986, '天神', '福岡県福岡市中央区天神2-4-20', '커스터마이징 자유로운 카레 체인의 제왕.', '🍛'],
        ['リンガーハット 仙台駅前店', 'ちゃんぽん', 750, 4.0, 38.2601, 140.8800, '仙台', '宮城県仙台시青葉区中央1-8-22', '야채 가득 짬뽕. 면 증량 무료 매장도 건재.', '🍜'],
        ['かつや 川崎駅前店', 'とんかつ', 590, 4.3, 35.5312, 139.7031, '川崎', '神奈川県川崎市川崎区駅前本町3-1', '카츠동 우메가 500엔대. 바삭한 퀄리티가 높다.', '🐷'],
        ['餃子の満洲 所沢東口店', '中華', 500, 4.1, 35.7951, 139.4754, '所沢', '埼玉県所沢市くすのき台1-14-5', '「3할 맛있다!!」 사이타마를 중심으로 전개하는 가성비 중식.', '🥟']
      ];

      for (const r of sampleRestaurants) {
        await sql`
          INSERT INTO restaurants (name, genre, price, rating, lat, lng, area, address, description, emoji)
          VALUES (${r[0]}, ${r[1]}, ${r[2]}, ${r[3]}, ${r[4]}, ${r[5]}, ${r[6]}, ${r[7]}, ${r[8]}, ${r[9]})
        `;
      }
      console.log(`${sampleRestaurants.length} restaurants seeded.`);
    }

    // 3. Seed Deals
    console.log('Refreshing budget amazon deals (12 items)...');
    await sql`DELETE FROM deals`;
    
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

