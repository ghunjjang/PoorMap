import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'poormap.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    genre TEXT NOT NULL,
    price INTEGER NOT NULL,
    rating REAL NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    area TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    emoji TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    comments INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL,
    isHot BOOLEAN DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    isHot BOOLEAN DEFAULT 0
  );
`);

// 초기 시드 데이터 (일본 전역의 가성비 식당 기반)
const sampleRestaurants = [
  // 도쿄 주요 체인
  ['松屋 新宿大ガード店', '牛丼', 400, 3.8, 35.6934, 139.6999, '新宿', '東京都新宿区西新宿7-10-19', '新宿西口すぐ。いつでも安い牛めし。', '🥩'],
  ['ガスト 新宿靖国通店', 'ファミレス', 600, 3.9, 35.6942, 139.7028, '新宿', '東京都新宿区歌舞伎町1-1-17', 'コスパ最強のハンバーグとドリンクバー。', '🍽️'],
  ['名代 富士そば 渋谷下田ビル店', 'そば・うどん', 400, 4.0, 35.6591, 139.7001, '渋谷', '東京都渋谷区宇田川町28-4', '渋谷センター街近く、24時間営業の立ち食いそば。', '🍜'],
  ['サイゼリヤ 渋谷東急ハンズ前店', 'イタリアン', 500, 4.2, 35.6616, 139.6983, '渋谷', '東京都渋谷区宇田川町39-8', 'ミラノ風ドリア300円の最強コスパ。ワインも安い。', '🍕'],
  ['日高屋 秋葉原駅南店', '中華', 500, 3.7, 35.6982, 139.7749, '秋葉原', '東京都千代田区神田佐久間町1-16', '中華そば390円。仕事終わりのちょい飲みに最適。', '🥟'],
  ['名物 すた丼の屋 秋葉原店', '定食', 730, 4.1, 35.7005, 139.7733, '秋葉原', '東京都千代田区外神田3-2-12', 'ニンニク醤油がガツンと効いた豚肉丼。ボリューム満点。', '🍚'],
  ['カレーは飲み物。 御徒町店', 'カレー', 890, 4.0, 35.7061, 139.7744, '上野', '東京都台東区上野3-23-11', '店名に恥じないボリュームと濃厚さ。黒カレーがおすすめ。', '🍛'],
  ['中華蕎麦 とみ田 (東京駅)', 'ラーメン', 950, 4.5, 35.6812, 139.7671, '東京駅', '東京都千代田区丸の内1-9-1', '東京駅直結で味わえる名店の味。やや高いが価値あり。', '🍜'],
  ['餃子の王将 池袋東口店', '中華', 600, 4.1, 35.7303, 139.7121, '池袋', '東京都豊島区南池袋2-27-5', '餃子とチャーハンの黄金セット最強。', '🥟'],
  ['鳥貴族 池袋東口店', '焼き鳥', 360, 4.0, 35.7299, 139.7135, '池袋', '東京都豊島区東池袋1-14-12', '全品均一価格。貴族焼のボリュームがすごい。', '🍗'],
  
  // 도쿄 외곽 & 주요 도시 체인 데이터 확장
  ['すき家 渋谷井の頭通店', '牛丼', 400, 3.8, 35.6606, 139.6984, '渋谷', '東京都渋谷区宇田川町33-1', '種類豊富な牛丼と朝定食が魅力。', '🥩'],
  ['吉野家 秋葉原店', '牛丼', 420, 3.9, 35.6985, 139.7731, '秋葉原', '東京都千代田区外神田1-15-4', '早い、安い、うまい。定番の味。', '🥩'],
  ['はなまるうどん 新宿東口店', 'うどん', 350, 4.0, 35.6917, 139.7029, '新宿', '東京都新宿区新宿3-21-2', 'かけうどんが圧倒的な安さ。天ぷらも美味しい。', '🍜'],
  ['丸亀製麺 六本木ティーキューブ店', 'うどん', 400, 4.2, 35.6631, 139.7369, '六本木', '東京都港区六本木3-1-1', '打ち立てのコシのあるうどん。ネギ乗せ放題。', '🍜'],
  ['天丼てんや 八重洲店', '天丼', 560, 4.0, 35.6806, 139.7690, '東京駅', '東京都中央区八重洲1-6-15', '揚げたての天丼がこの価格で食べられる奇跡。', '🍤'],
  ['バーミヤン 上野駅前店', '中華', 700, 3.8, 35.7107, 139.7766, '上野', '東京都台東区上野7-2-16', '本格的な中華がファミレス価格で楽しめる。', '🥟'],
  ['ジョイフル 京都伏見店', 'ファミレス', 550, 3.9, 34.9351, 135.7502, '京都', '京都府京都市伏見区下鳥羽浄春ヶ前町111', '西日本発祥の超絶コスパファミレス。24時間営業が多い。', '🍽️'],
  ['スシロー 梅田茶屋町店', '寿司', 120, 4.1, 34.7061, 135.4988, '梅田', '大阪府大阪市北区茶屋町16-1', '100円台から食べられる回転寿司の王者。', '🍣'],
  ['くら寿司 難波なんば店', '寿司', 125, 4.0, 34.6644, 135.5015, '難波', '大阪府大阪市中央区難波3-1-27', 'ビッくらポンが楽しい。サイドメニューも充実。', '🍣'],
  ['やよい軒 名古屋駅前店', '定食', 850, 4.1, 35.1709, 136.8815, '名古屋', '愛知県名古屋市中村区名駅4-26-25', 'ご飯のおかわり自由が最高。お腹いっぱいになる。', '🍚'],
  ['なか卯 札幌駅地下街店', '丼ぶり・うどん', 450, 3.8, 43.0686, 141.3508, '札幌', '北海道札幌市中央区北5条西3丁目', '親子丼とハイカラうどんのセットが神コスパ。', '🥚'],
  ['ココイチ 福岡天神店', 'カレー', 800, 4.2, 33.5898, 130.3986, '天神', '福岡県福岡市中央区天神2-4-20', 'カスタマイズ自由なカレーチェーンの王様。', '🍛'],
  ['リンガーハット 仙台駅前店', 'ちゃんぽん', 750, 4.0, 38.2601, 140.8800, '仙台', '宮城県仙台市青葉区中央1-8-22', '野菜たっぷりのちゃんぽん。麺増量無料店も健在。', '🍜'],
  ['かつや 川崎駅前店', 'とんかつ', 590, 4.3, 35.5312, 139.7031, '川崎', '神奈川県川崎市川崎区駅前本町3-1', 'カツ丼梅が500円台。サクサクのクオリティが高い。', '🐷'],
  ['餃子の満洲 所沢東口店', '中華', 500, 4.1, 35.7951, 139.4754, '所沢', '埼玉県所沢市くすのき台1-14-5', '「3割うまい!!」埼玉を中心に展開する安ウマ中華。', '🥟']
];

const insertRestaurant = db.prepare(`
  INSERT INTO restaurants (name, genre, price, rating, lat, lng, area, address, description, emoji)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Only seed if empty
const countRes = db.prepare('SELECT COUNT(*) as count FROM restaurants').get();
if (countRes.count === 0) {
  sampleRestaurants.forEach(row => insertRestaurant.run(...row));
  console.log('Database seeded with restaurants.');
} else {
  console.log('Database already has data. Skipping seed.');
}

console.log('Database initialized successfully.');
