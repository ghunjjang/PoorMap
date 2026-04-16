const { neon } = require('@neondatabase/serverless');
const https = require('https');

// ===== Overpass API 실제 데이터 수집 =====
function fetchOverpass(query) {
  return new Promise((resolve) => {
    const postData = query;
    const options = {
      hostname: 'overpass-api.de',
      path: '/api/interpreter',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) },
    };
    let raw = '';
    const req = https.request(options, (res) => {
      res.on('data', d => raw += d);
      res.on('end', () => {
        try {
          const j = JSON.parse(raw);
          resolve(j.elements || []);
        } catch { resolve([]); }
      });
    });
    req.on('error', () => resolve([]));
    req.setTimeout(30000, () => { req.destroy(); resolve([]); });
    req.write(postData);
    req.end();
  });
}

// OSM cuisine → 日本語ジャンル変換
function cuisineToGenre(cuisine) {
  if (!cuisine) return '定食・食堂';
  const c = cuisine.toLowerCase();
  if (c.includes('ramen') || c.includes('noodle')) return 'ラーメン';
  if (c.includes('soba') || c.includes('udon')) return 'そば・うどん';
  if (c.includes('sushi')) return '寿司';
  if (c.includes('curry') || c.includes('indian')) return 'カレー';
  if (c.includes('yakitori') || c.includes('chicken')) return '焼き鳥';
  if (c.includes('tonkatsu') || c.includes('katsu')) return 'とんかつ';
  if (c.includes('izakaya')) return '居酒屋';
  if (c.includes('gyudon')) return '牛丼';
  if (c.includes('chinese')) return '中華料理';
  if (c.includes('pizza') || c.includes('italian') || c.includes('french') || c.includes('western')) return '洋食';
  if (c.includes('korean')) return '韓国料理';
  if (c.includes('seafood') || c.includes('fish')) return '海鮮・魚介';
  if (c.includes('okonomiyaki')) return 'お好み焼き・もんじゃ';
  if (c.includes('yakiniku') || c.includes('bbq')) return '焼肉';
  if (c.includes('fast_food') || c.includes('burger')) return 'ファミレス';
  return '定食・食堂';
}

function genreToEmoji(genre) {
  const map = { 'ラーメン':'🍜','そば・うどん':'🍜','寿司':'🍣','カレー':'🍛','焼き鳥':'🍗','とんかつ':'🐷','居酒屋':'🍺','牛丼':'🥩','中華料理':'🥟','洋食':'🍽️','韓国料理':'🫕','海鮮・魚介':'🐟','お好み焼き・もんじゃ':'🥞','焼肉':'🥩','ファミレス':'🍽️','定食・食堂':'🍱','丼ぶり':'🥚','うどん':'🍜','天丼':'🍤','ちゃんぽん':'🍜' };
  return map[genre] || '🍴';
}

// 価格推定（ジャンル別）
function genreToPrice(genre) {
  const map = { 'ラーメン':800,'そば・うどん':600,'寿司':900,'カレー':750,'焼き鳥':650,'とんかつ':800,'居酒屋':700,'牛丼':450,'中華料理':700,'洋食':900,'韓国料理':800,'海鮮・魚介':950,'お好み焼き・もんじゃ':700,'焼肉':950,'ファミレス':700,'定食・食堂':750,'丼ぶり':550,'うどん':500,'天丼':650,'ちゃんぽん':800 };
  const base = map[genre] || 700;
  const steps = [-100,-50,0,0,0,50,100];
  return base + steps[Math.floor(Math.random() * steps.length)];
}

// 営業時間生成
function genHours(genre) {
  if (['居酒屋','焼き鳥','焼肉'].includes(genre)) return ['17:00〜24:00','17:00〜翌1:00','18:00〜24:00'][Math.floor(Math.random()*3)];
  if (['牛丼','ラーメン'].includes(genre)) return ['24時間営業','11:00〜翌2:00','11:00〜23:00'][Math.floor(Math.random()*3)];
  if (['そば・うどん'].includes(genre)) return ['10:00〜20:00','11:00〜21:00','10:30〜19:00'][Math.floor(Math.random()*3)];
  return ['11:00〜22:00','11:00〜21:30','11:30〜22:00','10:00〜22:00'][Math.floor(Math.random()*4)];
}

// 定休日生成
function genClosed() {
  return ['不定休','月曜定休','火曜定休','水曜定休','日曜定休','年中無休','年末年始のみ休業'][Math.floor(Math.random()*7)];
}

// タグ生成
function genTags(genre, price) {
  const baseTags = [];
  if (price < 500) baseTags.push('#激安');
  else if (price < 800) baseTags.push('#コスパ◎');
  else baseTags.push('#1000円以下');
  const genreTags = {
    'ラーメン': ['#濃厚スープ','#あっさり醤油','#豚骨','#味噌ラーメン'],
    'そば・うどん': ['#手打ち','#立ち食いそば','#コシがある'],
    '寿司': ['#新鮮ネタ','#回転寿司','#握り'],
    'カレー': ['#スパイスカレー','#欧風カレー','#辛口対応'],
    '焼き鳥': ['#炭火焼き','#一串から','#地鶏使用'],
    '居酒屋': ['#飲み放題','#一人呑みOK','#昭和感'],
    '牛丼': ['#24時間','#並盛','#早い安い旨い'],
    '中華料理': ['#餃子','#チャーハン','#本格中華'],
    '定食・食堂': ['#ご飯おかわり','#日替わり','#家庭の味'],
  };
  const specific = genreTags[genre] || [];
  if (specific.length) baseTags.push(specific[Math.floor(Math.random()*specific.length)]);
  const general = ['#一人でもOK','#テイクアウト可','#禁煙','#カード可','#駐車場あり','#ランチ営業'];
  baseTags.push(general[Math.floor(Math.random()*general.length)]);
  return baseTags.join(' ');
}

// 説明文生成
function genDesc(genre, name) {
  const descs = {
    'ラーメン': ['こだわりのスープが絶品の人気ラーメン店。地元のリピーターが多い。','毎日仕込む濃厚スープと手打ち麺が自慢。行列必至の人気店。','あっさり系から濃厚系まで揃う。コスパ最強のラーメン屋。'],
    'そば・うどん': ['手打ちのコシある麺が自慢。だしも絶品のそば・うどん店。','地元産の小麦を使った手打ちうどん。リーズナブルで大満足。','立ち食いながら本格手打ち。サラリーマンに愛される老舗。'],
    '寿司': ['新鮮なネタが自慢の街の寿司屋。お値打ち価格で本格握り。','ランチの握りセットがコスパ最強。職人歴20年の大将が握る。','地元の魚を使ったリーズナブルな寿司。テイクアウトも人気。'],
    'カレー': ['スパイスにこだわった本格カレー。クセになる深い味わい。','ボリューム満点でリーズナブルなカレー食堂。日替わりも人気。','昔ながらの洋食カレー。懐かしの家庭的な味わい。'],
    '焼き鳥': ['炭火焼きの本格焼き鳥。一串100円台からOK。','地鶏使用の本格焼き鳥。ビールとの相性が抜群。','素材にこだわる職人店。炭火の香りがたまらない。'],
    '居酒屋': ['リーズナブルな大衆居酒屋。一品料理が充実。','地元の人が集まる昭和感あふれる居酒屋。飲み放題も格安。','新鮮な魚介と地酒が揃う。コスパ良好な居酒屋。'],
    '牛丼': ['24時間営業の牛丼店。並盛から食べ応え満点。','早い・安い・うまいの三拍子。地元で長年愛される牛丼屋。'],
    '中華料理': ['本格的な中華料理。餃子とチャーハンが絶品。ボリューム満点。','街の中華料理屋。安くて旨くてボリューム満点。','中国人シェフが作る本格的な味。リーズナブルで大満足。'],
    '定食・食堂': ['ボリューム満点の家庭的な定食。ご飯おかわり自由。','地元の働く人たちに愛される大衆食堂。日替わりが人気。','昔ながらの食堂。体に優しいほっこりとした家庭料理。'],
    '焼肉': ['ランチ焼肉定食が格安。コスパ最強の焼肉店。地元の常連が多い。','食べ放題コースが人気。炭火焼きの本格焼肉を堪能。'],
    'とんかつ': ['サクサクのとんかつが自慢。キャベツおかわり無料。','リーズナブルなカツ定食。揚げたての美味しさが格別。'],
    '海鮮・魚介': ['港直送の新鮮な海鮮が格安。刺身定食が圧倒的コスパ。','地元漁師から直仕入れの新鮮魚介。海鮮丼が絶品。'],
  };
  const list = descs[genre] || ['地元で愛されるコスパ最強のお店。ボリューム満点でリーズナブル。'];
  return list[Math.floor(Math.random() * list.length)];
}

async function seed() {
  const sql = neon(process.env.POSTGRES_URL);
  await sql`DELETE FROM restaurants`;
  console.log('Cleared existing restaurants.');

  const allRestaurants = [];

  // ===== 1. OpenStreetMap 実データ取得 =====
  console.log('Fetching real restaurant data from OpenStreetMap...');
  const osmQueries = [
    // 東京
    '[out:json][timeout:25];(node["amenity"="restaurant"]["name"](35.60,139.65,35.80,139.85);node["amenity"="restaurant"]["name"](35.65,139.68,35.73,139.77););out 300;',
    // 大阪
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](34.60,135.45,34.75,135.55);out 200;',
    // 福岡
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](33.55,130.35,33.65,130.45);out 150;',
    // 名古屋
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](35.14,136.86,35.21,136.95);out 150;',
    // 札幌
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](43.03,141.32,43.09,141.38);out 100;',
    // 京都
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](34.97,135.74,35.03,135.78);out 100;',
    // 横浜
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](35.42,139.60,35.48,139.66);out 100;',
    // 仙台
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](38.24,140.84,38.30,140.90);out 80;',
    // 広島
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](34.37,132.44,34.41,132.48);out 80;',
    // 神戸
    '[out:json][timeout:25];node["amenity"="restaurant"]["name"](34.67,135.17,34.71,135.22);out 80;',
  ];

  let osmCount = 0;
  for (const query of osmQueries) {
    const elements = await fetchOverpass(query);
    for (const e of elements) {
      if (!e.tags || !e.tags.name) continue;
      const name = e.tags['name:ja'] || e.tags.name;
      // 明らかなチェーン店・ファストフードは除外（個人店に集中）
      const chainKeywords = ['マクドナルド','ケンタッキー','モスバーガー','ミスタードーナツ','スターバックス','タリーズ','吉野家','松屋','すき家','サイゼリヤ','ガスト','デニーズ','ロイヤルホスト','バーミヤン','CoCo壱','スシロー','くら寿司','はま寿司'];
      if (chainKeywords.some(k => name.includes(k))) continue;
      const genre = cuisineToGenre(e.tags.cuisine);
      const price = genreToPrice(genre);
      const rating = Math.round((3.2 + Math.random() * 1.5) * 100) / 100;
      const hours = e.tags.opening_hours
        ? e.tags.opening_hours.replace(/Mo-Su|Mo-Fr|Sa-Su/g, '').replace(/[;,]/g, ' / ').trim().substring(0, 50)
        : genHours(genre);
      allRestaurants.push([
        name, genre, price, rating,
        e.lat, e.lon,
        '実店舗データ',
        `緯度${e.lat.toFixed(4)} 経度${e.lon.toFixed(4)}周辺`,
        genDesc(genre, name),
        genreToEmoji(genre),
        hours,
        genClosed(),
        genTags(genre, price),
        e.tags.website || e.tags['contact:website'] || '',
        Math.floor(Math.random() * 50),
      ]);
      osmCount++;
    }
    await new Promise(r => setTimeout(r, 1000)); // API負荷軽減
  }
  console.log(`✅ OpenStreetMap実データ: ${osmCount}件`);

  // ===== 2. チェーン店 =====
  const chains = [
    { name: '松屋', genre: '牛丼', price: 400, rBase: 3.6, rRange: 0.5, desc: '24時間営業の牛めし。並盛400円から。', emoji: '🥩', hours: '24時間営業', closed: '年中無休', tags: '#激安 #24時間 #早い安い旨い' },
    { name: '吉野家', genre: '牛丼', price: 420, rBase: 3.7, rRange: 0.4, desc: '早い安いうまいの老舗牛丼チェーン。', emoji: '🥩', hours: '24時間営業', closed: '年中無休', tags: '#激安 #24時間 #老舗' },
    { name: 'すき家', genre: '牛丼', price: 390, rBase: 3.5, rRange: 0.5, desc: '牛丼並390円。種類豊富なトッピング。', emoji: '🥩', hours: '24時間営業', closed: '年中無休', tags: '#激安 #24時間 #トッピング豊富' },
    { name: 'なか卯', genre: '丼ぶり', price: 450, rBase: 3.6, rRange: 0.4, desc: '親子丼とうどんのセットがコスパ抜群。', emoji: '🥚', hours: '24時間営業', closed: '年中無休', tags: '#コスパ◎ #親子丼 #うどん' },
    { name: 'はなまるうどん', genre: 'うどん', price: 350, rBase: 3.7, rRange: 0.5, desc: 'かけうどん小350円から。天ぷら自由トッピング。', emoji: '🍜', hours: '10:00〜22:00', closed: '年中無休', tags: '#激安 #天ぷら #セルフ' },
    { name: '丸亀製麺', genre: 'うどん', price: 400, rBase: 3.9, rRange: 0.4, desc: '打ち立てのコシのあるうどん。ネギ乗せ放題。', emoji: '🍜', hours: '10:00〜22:00', closed: '年中無休', tags: '#コスパ◎ #手打ち #ネギ放題' },
    { name: '天丼てんや', genre: '天丼', price: 560, rBase: 3.8, rRange: 0.4, desc: '揚げたての天丼560円から。コスパ◎。', emoji: '🍤', hours: '11:00〜22:00', closed: '年中無休', tags: '#コスパ◎ #天ぷら #揚げたて' },
    { name: 'かつや', genre: 'とんかつ', price: 590, rBase: 4.0, rRange: 0.4, desc: 'カツ丼梅590円。サクサクのとんかつ。', emoji: '🐷', hours: '10:00〜23:00', closed: '年中無休', tags: '#コスパ◎ #カツ丼 #サクサク' },
    { name: 'やよい軒', genre: '定食', price: 850, rBase: 3.9, rRange: 0.4, desc: 'ご飯おかわり自由。バランスの良い定食。', emoji: '🍚', hours: '10:00〜23:00', closed: '年中無休', tags: '#ご飯おかわり #バランス良い #定食' },
    { name: '大戸屋', genre: '定食', price: 800, rBase: 3.8, rRange: 0.4, desc: '野菜豊富なヘルシー定食。バランスが良い。', emoji: '🍱', hours: '11:00〜23:00', closed: '年中無休', tags: '#ヘルシー #野菜豊富 #定食' },
    { name: '鳥貴族', genre: '焼き鳥', price: 360, rBase: 3.8, rRange: 0.4, desc: '全品均一360円。焼き鳥居酒屋の王様。', emoji: '🍗', hours: '17:00〜翌1:00', closed: '年中無休', tags: '#激安 #均一価格 #飲み放題' },
    { name: 'スシロー', genre: '寿司', price: 120, rBase: 3.9, rRange: 0.4, desc: '100円台から食べられる回転寿司の王者。', emoji: '🍣', hours: '11:00〜23:00', closed: '年中無休', tags: '#激安 #回転寿司 #家族向け' },
    { name: 'くら寿司', genre: '寿司', price: 125, rBase: 3.8, rRange: 0.4, desc: 'びっくらポンが楽しい。サイドメニューも充実。', emoji: '🍣', hours: '11:00〜23:00', closed: '年中無休', tags: '#激安 #回転寿司 #子供向け' },
    { name: 'はま寿司', genre: '寿司', price: 120, rBase: 3.7, rRange: 0.4, desc: '平日90円皿も！コスパ最強の回転寿司。', emoji: '🍣', hours: '11:00〜23:00', closed: '年中無休', tags: '#激安 #回転寿司 #平日割引' },
    { name: 'カッパ寿司', genre: '寿司', price: 130, rBase: 3.6, rRange: 0.4, desc: 'お得なセットメニューが豊富な回転寿司。', emoji: '🍣', hours: '11:00〜23:00', closed: '年中無休', tags: '#コスパ◎ #回転寿司 #セット充実' },
    { name: '松のや', genre: 'とんかつ', price: 490, rBase: 3.7, rRange: 0.4, desc: 'ロースかつ定食490円。松屋系列のとんかつ専門店。', emoji: '🐷', hours: '10:00〜23:00', closed: '年中無休', tags: '#コスパ◎ #とんかつ #松屋系列' },
    { name: 'ガスト', genre: 'ファミレス', price: 600, rBase: 3.7, rRange: 0.4, desc: 'コスパ最強のハンバーグとドリンクバー。', emoji: '🍽️', hours: '24時間営業', closed: '年中無休', tags: '#24時間 #ドリンクバー #ファミリー' },
    { name: 'バーミヤン', genre: '中華料理', price: 700, rBase: 3.7, rRange: 0.3, desc: '本格的な中華がファミレス価格で楽しめる。', emoji: '🥟', hours: '10:00〜24:00', closed: '年中無休', tags: '#コスパ◎ #中華 #ファミリー' },
    { name: '幸楽苑', genre: 'ラーメン', price: 490, rBase: 3.4, rRange: 0.5, desc: '中華そば290円～。ラーメンチェーンの老舗。', emoji: '🍜', hours: '11:00〜23:00', closed: '年中無休', tags: '#激安 #中華そば #老舗' },
    { name: 'カレーハウスCoCo壱番屋', genre: 'カレー', price: 800, rBase: 4.0, rRange: 0.4, desc: 'カスタマイズ自由なカレーチェーンの王者。', emoji: '🍛', hours: '10:00〜23:00', closed: '年中無休', tags: '#カスタマイズ #辛さ選択 #定番' },
    { name: '餃子の王将', genre: '中華料理', price: 600, rBase: 3.9, rRange: 0.4, desc: '餃子とチャーハンの黄金セット。コスパ最強中華。', emoji: '🥟', hours: '11:00〜24:00', closed: '年中無休', tags: '#コスパ◎ #餃子 #チャーハン' },
    { name: 'リンガーハット', genre: 'ちゃんぽん', price: 750, rBase: 3.8, rRange: 0.4, desc: '野菜たっぷりちゃんぽん。麺増量無料の店舗も健在。', emoji: '🍜', hours: '11:00〜22:00', closed: '年中無休', tags: '#野菜たっぷり #ちゃんぽん #麺増量' },
    { name: 'サイゼリヤ', genre: 'ファミレス', price: 500, rBase: 3.8, rRange: 0.4, desc: 'ミラノ風ドリアが300円。超コスパイタリアン。', emoji: '🍝', hours: '10:00〜24:00', closed: '年中無休', tags: '#激安 #イタリアン #ドリンクバー' },
    { name: '富士そば', genre: 'そば・うどん', price: 390, rBase: 3.6, rRange: 0.5, desc: '24時間営業の立ち食いそば。かけそば390円から。', emoji: '🍜', hours: '24時間営業', closed: '年中無休', tags: '#激安 #立ち食い #24時間', kanto: true },
    { name: '日高屋', genre: '中華料理', price: 490, rBase: 3.5, rRange: 0.5, desc: '中華そば390円。餃子5個220円。コスパ最高。', emoji: '🥟', hours: '11:00〜翌2:00', closed: '年中無休', tags: '#激安 #餃子 #深夜営業', kanto: true },
    { name: 'ゆで太郎', genre: 'そば・うどん', price: 380, rBase: 3.6, rRange: 0.4, desc: '手打ちそば風の本格立ち食いそば。', emoji: '🍜', hours: '7:00〜22:00', closed: '年中無休', tags: '#激安 #立ち食い #本格そば', kanto: true },
    { name: 'ジョイフル', genre: 'ファミレス', price: 550, rBase: 3.7, rRange: 0.4, desc: '西日本発祥のコスパファミレス。24時間営業も多い。', emoji: '🍽️', hours: '24時間営業', closed: '年中無休', tags: '#コスパ◎ #24時間 #ファミリー', west: true },
    { name: '資さんうどん', genre: 'うどん', price: 450, rBase: 4.0, rRange: 0.3, desc: '北九州発祥のうどんチェーン。ごぼう天が名物。', emoji: '🍜', hours: '24時間営業', closed: '年中無休', tags: '#コスパ◎ #ごぼう天 #北九州発祥', kyushu: true },
  ];

  // ===== 3. 全国エリア =====
  const areas = [
    // 北海道
    { name:'札幌大通',area:'大通・すすきの',pref:'北海道札幌市中央区',lat:43.0618,lng:141.3545 },
    { name:'すすきの',area:'すすきの',pref:'北海道札幌市中央区',lat:43.0552,lng:141.3567 },
    { name:'札幌駅',area:'札幌駅周辺',pref:'北海道札幌市北区',lat:43.0686,lng:141.3508 },
    { name:'円山',area:'円山・西28丁目',pref:'北海道札幌市中央区',lat:43.0558,lng:141.3188 },
    { name:'旭川',area:'旭川駅周辺',pref:'北海道旭川市',lat:43.7706,lng:142.3650 },
    { name:'函館',area:'函館駅周辺',pref:'北海道函館市',lat:41.7687,lng:140.7291 },
    { name:'帯広',area:'帯広駅周辺',pref:'北海道帯広市',lat:42.9171,lng:143.2044 },
    { name:'釧路',area:'釧路駅周辺',pref:'北海道釧路市',lat:42.9769,lng:144.3820 },
    { name:'小樽',area:'小樽駅周辺',pref:'北海道小樽市',lat:43.1907,lng:140.9946 },
    // 東北
    { name:'青森',area:'青森駅周辺',pref:'青森県青森市',lat:40.8244,lng:140.7400 },
    { name:'弘前',area:'弘前駅周辺',pref:'青森県弘前市',lat:40.6031,lng:140.4637 },
    { name:'八戸',area:'八戸駅周辺',pref:'青森県八戸市',lat:40.5123,lng:141.4882 },
    { name:'盛岡',area:'盛岡駅周辺',pref:'岩手県盛岡市',lat:39.7036,lng:141.1527 },
    { name:'仙台',area:'仙台駅周辺',pref:'宮城県仙台市青葉区',lat:38.2688,lng:140.8721 },
    { name:'仙台一番町',area:'仙台一番町',pref:'宮城県仙台市青葉区',lat:38.2637,lng:140.8699 },
    { name:'秋田',area:'秋田駅周辺',pref:'秋田県秋田市',lat:39.7200,lng:140.1025 },
    { name:'山形',area:'山形駅周辺',pref:'山形県山形市',lat:38.2404,lng:140.3633 },
    { name:'福島',area:'福島駅周辺',pref:'福島県福島市',lat:37.7500,lng:140.4677 },
    { name:'郡山',area:'郡山駅周辺',pref:'福島県郡山市',lat:37.4017,lng:140.3880 },
    // 関東
    { name:'水戸',area:'水戸駅周辺',pref:'茨城県水戸市',lat:36.3418,lng:140.4468 },
    { name:'つくば',area:'つくば駅周辺',pref:'茨城県つくば市',lat:36.0837,lng:140.0757 },
    { name:'宇都宮',area:'宇都宮駅周辺',pref:'栃木県宇都宮市',lat:36.5551,lng:139.8829 },
    { name:'前橋',area:'前橋駅周辺',pref:'群馬県前橋市',lat:36.3894,lng:139.0634 },
    { name:'高崎',area:'高崎駅周辺',pref:'群馬県高崎市',lat:36.3231,lng:139.0015 },
    { name:'大宮',area:'大宮駅周辺',pref:'埼玉県さいたま市大宮区',lat:35.9069,lng:139.6228 },
    { name:'浦和',area:'浦和駅周辺',pref:'埼玉県さいたま市浦和区',lat:35.8580,lng:139.6467 },
    { name:'川口',area:'川口駅周辺',pref:'埼玉県川口市',lat:35.8075,lng:139.7244 },
    { name:'所沢',area:'所沢駅周辺',pref:'埼玉県所沢市',lat:35.7992,lng:139.4685 },
    { name:'川越',area:'川越駅周辺',pref:'埼玉県川越市',lat:35.9249,lng:139.4858 },
    { name:'千葉',area:'千葉駅周辺',pref:'千葉県千葉市',lat:35.6073,lng:140.1063 },
    { name:'船橋',area:'船橋駅周辺',pref:'千葉県船橋市',lat:35.6943,lng:139.9825 },
    { name:'松戸',area:'松戸駅周辺',pref:'千葉県松戸市',lat:35.7875,lng:139.9016 },
    { name:'柏',area:'柏駅周辺',pref:'千葉県柏市',lat:35.8672,lng:139.9752 },
    // 東京山手線
    { name:'東京',area:'東京駅',pref:'東京都千代田区',lat:35.6812,lng:139.7671 },
    { name:'有楽町',area:'有楽町',pref:'東京都千代田区',lat:35.6752,lng:139.7629 },
    { name:'新橋',area:'新橋',pref:'東京都港区',lat:35.6664,lng:139.7582 },
    { name:'品川',area:'品川',pref:'東京都港区',lat:35.6284,lng:139.7388 },
    { name:'目黒',area:'目黒',pref:'東京都目黒区',lat:35.6330,lng:139.7156 },
    { name:'恵比寿',area:'恵比寿',pref:'東京都渋谷区',lat:35.6467,lng:139.7101 },
    { name:'渋谷',area:'渋谷',pref:'東京都渋谷区',lat:35.6580,lng:139.7016 },
    { name:'新宿',area:'新宿',pref:'東京都新宿区',lat:35.6895,lng:139.6917 },
    { name:'高田馬場',area:'高田馬場',pref:'東京都新宿区',lat:35.7124,lng:139.7036 },
    { name:'池袋',area:'池袋',pref:'東京都豊島区',lat:35.7295,lng:139.7109 },
    { name:'巣鴨',area:'巣鴨',pref:'東京都豊島区',lat:35.7335,lng:139.7390 },
    { name:'上野',area:'上野',pref:'東京都台東区',lat:35.7089,lng:139.7741 },
    { name:'秋葉原',area:'秋葉原',pref:'東京都千代田区',lat:35.7023,lng:139.7745 },
    { name:'神田',area:'神田',pref:'東京都千代田区',lat:35.6938,lng:139.7706 },
    { name:'銀座',area:'銀座',pref:'東京都中央区',lat:35.6717,lng:139.7650 },
    // 東京その他
    { name:'浅草',area:'浅草',pref:'東京都台東区',lat:35.7148,lng:139.7967 },
    { name:'錦糸町',area:'錦糸町',pref:'東京都墨田区',lat:35.6962,lng:139.8153 },
    { name:'北千住',area:'北千住',pref:'東京都足立区',lat:35.7494,lng:139.8004 },
    { name:'中野',area:'中野',pref:'東京都中野区',lat:35.7071,lng:139.6653 },
    { name:'吉祥寺',area:'吉祥寺',pref:'東京都武蔵野市',lat:35.7031,lng:139.5796 },
    { name:'三軒茶屋',area:'三軒茶屋',pref:'東京都世田谷区',lat:35.6432,lng:139.6705 },
    { name:'下北沢',area:'下北沢',pref:'東京都世田谷区',lat:35.6612,lng:139.6681 },
    { name:'高円寺',area:'高円寺',pref:'東京都杉並区',lat:35.7056,lng:139.6492 },
    { name:'赤羽',area:'赤羽',pref:'東京都北区',lat:35.7777,lng:139.7213 },
    { name:'蒲田',area:'蒲田',pref:'東京都大田区',lat:35.5639,lng:139.7164 },
    { name:'立川',area:'立川',pref:'東京都立川市',lat:35.6983,lng:139.4154 },
    { name:'八王子',area:'八王子',pref:'東京都八王子市',lat:35.6665,lng:139.3165 },
    { name:'町田',area:'町田',pref:'東京都町田市',lat:35.5453,lng:139.4453 },
    // 神奈川
    { name:'横浜',area:'横浜駅周辺',pref:'神奈川県横浜市西区',lat:35.4658,lng:139.6225 },
    { name:'関内',area:'関内・伊勢佐木町',pref:'神奈川県横浜市中区',lat:35.4434,lng:139.6441 },
    { name:'川崎',area:'川崎駅周辺',pref:'神奈川県川崎市川崎区',lat:35.5307,lng:139.7026 },
    { name:'武蔵小杉',area:'武蔵小杉',pref:'神奈川県川崎市中原区',lat:35.5756,lng:139.6585 },
    { name:'藤沢',area:'藤沢駅周辺',pref:'神奈川県藤沢市',lat:35.3357,lng:139.4876 },
    { name:'小田原',area:'小田原駅周辺',pref:'神奈川県小田原市',lat:35.2551,lng:139.1539 },
    { name:'相模原',area:'相模原駅周辺',pref:'神奈川県相模原市',lat:35.5739,lng:139.3729 },
    // 中部
    { name:'新潟',area:'新潟駅周辺',pref:'新潟県新潟市',lat:37.9162,lng:139.0364 },
    { name:'長岡',area:'長岡駅周辺',pref:'新潟県長岡市',lat:37.4487,lng:138.8513 },
    { name:'金沢',area:'金沢駅周辺',pref:'石川県金沢市',lat:36.5748,lng:136.6553 },
    { name:'金沢香林坊',area:'香林坊・片町',pref:'石川県金沢市',lat:36.5611,lng:136.6567 },
    { name:'富山',area:'富山駅周辺',pref:'富山県富山市',lat:36.6953,lng:137.2113 },
    { name:'福井',area:'福井駅周辺',pref:'福井県福井市',lat:36.0652,lng:136.2216 },
    { name:'長野',area:'長野駅周辺',pref:'長野県長野市',lat:36.6513,lng:138.1813 },
    { name:'松本',area:'松本駅周辺',pref:'長野県松本市',lat:36.2380,lng:137.9721 },
    { name:'静岡',area:'静岡駅周辺',pref:'静岡県静岡市',lat:34.9769,lng:138.3831 },
    { name:'浜松',area:'浜松駅周辺',pref:'静岡県浜松市',lat:34.7108,lng:137.7261 },
    { name:'沼津',area:'沼津駅周辺',pref:'静岡県沼津市',lat:35.0955,lng:138.8631 },
    { name:'名古屋栄',area:'栄・錦',pref:'愛知県名古屋市中区',lat:35.1680,lng:136.9071 },
    { name:'名古屋',area:'名古屋駅周辺',pref:'愛知県名古屋市西区',lat:35.1709,lng:136.8815 },
    { name:'金山',area:'金山',pref:'愛知県名古屋市熱田区',lat:35.1432,lng:136.9001 },
    { name:'岡崎',area:'岡崎駅周辺',pref:'愛知県岡崎市',lat:34.9565,lng:137.1742 },
    { name:'豊橋',area:'豊橋駅周辺',pref:'愛知県豊橋市',lat:34.7692,lng:137.3939 },
    { name:'豊田',area:'豊田市駅周辺',pref:'愛知県豊田市',lat:35.0826,lng:137.1566 },
    { name:'岐阜',area:'岐阜駅周辺',pref:'岐阜県岐阜市',lat:35.4232,lng:136.7608 },
    { name:'四日市',area:'四日市駅周辺',pref:'三重県四日市市',lat:34.9663,lng:136.6246 },
    // 近畿
    { name:'大津',area:'大津駅周辺',pref:'滋賀県大津市',lat:35.0044,lng:135.8685 },
    { name:'草津',area:'草津駅周辺',pref:'滋賀県草津市',lat:35.0147,lng:135.9680 },
    { name:'京都駅',area:'京都駅周辺',pref:'京都府京都市下京区',lat:34.9858,lng:135.7588 },
    { name:'四条河原町',area:'四条河原町',pref:'京都府京都市下京区',lat:35.0039,lng:135.7716 },
    { name:'祇園',area:'祇園・東山',pref:'京都府京都市東山区',lat:35.0036,lng:135.7761 },
    { name:'三条',area:'三条・木屋町',pref:'京都府京都市中京区',lat:35.0124,lng:135.7716 },
    { name:'梅田',area:'梅田・大阪駅周辺',pref:'大阪府大阪市北区',lat:34.7023,lng:135.4983 },
    { name:'難波',area:'難波・心斎橋',pref:'大阪府大阪市中央区',lat:34.6686,lng:135.5018 },
    { name:'天王寺',area:'天王寺・阿倍野',pref:'大阪府大阪市阿倍野区',lat:34.6457,lng:135.5133 },
    { name:'天満',area:'天満・扇町',pref:'大阪府大阪市北区',lat:34.6968,lng:135.5152 },
    { name:'京橋',area:'京橋',pref:'大阪府大阪市都島区',lat:34.6949,lng:135.5329 },
    { name:'鶴橋',area:'鶴橋',pref:'大阪府大阪市生野区',lat:34.6636,lng:135.5384 },
    { name:'東大阪',area:'布施・東大阪',pref:'大阪府東大阪市',lat:34.6795,lng:135.6016 },
    { name:'堺',area:'堺東・堺駅周辺',pref:'大阪府堺市',lat:34.5733,lng:135.4830 },
    { name:'豊中',area:'豊中・蛍池',pref:'大阪府豊中市',lat:34.7809,lng:135.4676 },
    { name:'高槻',area:'高槻駅周辺',pref:'大阪府高槻市',lat:34.8505,lng:135.6172 },
    { name:'三宮',area:'三宮・元町',pref:'兵庫県神戸市中央区',lat:34.6912,lng:135.1950 },
    { name:'神戸元町',area:'元町・南京町',pref:'兵庫県神戸市中央区',lat:34.6887,lng:135.1827 },
    { name:'尼崎',area:'尼崎駅周辺',pref:'兵庫県尼崎市',lat:34.7337,lng:135.4056 },
    { name:'西宮',area:'西宮北口・西宮駅',pref:'兵庫県西宮市',lat:34.7300,lng:135.3406 },
    { name:'姫路',area:'姫路駅周辺',pref:'兵庫県姫路市',lat:34.8394,lng:134.6939 },
    { name:'奈良',area:'奈良駅周辺',pref:'奈良県奈良市',lat:34.6851,lng:135.8050 },
    { name:'和歌山',area:'和歌山駅周辺',pref:'和歌山県和歌山市',lat:34.2304,lng:135.1675 },
    // 中国・四国
    { name:'岡山',area:'岡山駅周辺',pref:'岡山県岡山市',lat:34.6617,lng:133.9350 },
    { name:'倉敷',area:'倉敷駅周辺',pref:'岡山県倉敷市',lat:34.5852,lng:133.7725 },
    { name:'広島',area:'広島駅周辺',pref:'広島県広島市南区',lat:34.3853,lng:132.4553 },
    { name:'広島本通',area:'本通・紙屋町',pref:'広島県広島市中区',lat:34.3931,lng:132.4574 },
    { name:'福山',area:'福山駅周辺',pref:'広島県福山市',lat:34.4863,lng:133.3622 },
    { name:'下関',area:'下関駅周辺',pref:'山口県下関市',lat:33.9527,lng:130.9241 },
    { name:'松江',area:'松江駅周辺',pref:'島根県松江市',lat:35.4722,lng:133.0505 },
    { name:'鳥取',area:'鳥取駅周辺',pref:'鳥取県鳥取市',lat:35.5011,lng:134.2351 },
    { name:'高松',area:'高松駅・瓦町',pref:'香川県高松市',lat:34.3401,lng:134.0434 },
    { name:'松山',area:'松山駅・大街道',pref:'愛媛県松山市',lat:33.8395,lng:132.7658 },
    { name:'高知',area:'高知駅・帯屋町',pref:'高知県高知市',lat:33.5597,lng:133.5311 },
    { name:'徳島',area:'徳島駅周辺',pref:'徳島県徳島市',lat:34.0693,lng:134.5549 },
    // 九州・沖縄
    { name:'博多',area:'博多駅周辺',pref:'福岡県福岡市博多区',lat:33.5893,lng:130.4208 },
    { name:'天神',area:'天神・大名',pref:'福岡県福岡市中央区',lat:33.5904,lng:130.3990 },
    { name:'中洲',area:'中洲・川端',pref:'福岡県福岡市博多区',lat:33.5923,lng:130.4075 },
    { name:'薬院',area:'薬院・今泉',pref:'福岡県福岡市中央区',lat:33.5768,lng:130.4060 },
    { name:'西新',area:'西新・藤崎',pref:'福岡県福岡市早良区',lat:33.5847,lng:130.3535 },
    { name:'小倉',area:'小倉駅周辺',pref:'福岡県北九州市小倉北区',lat:33.8834,lng:130.8751 },
    { name:'久留米',area:'久留米駅周辺',pref:'福岡県久留米市',lat:33.3189,lng:130.5076 },
    { name:'佐賀',area:'佐賀駅周辺',pref:'佐賀県佐賀市',lat:33.2494,lng:130.2988 },
    { name:'長崎',area:'長崎駅・浜町',pref:'長崎県長崎市',lat:32.7503,lng:129.8777 },
    { name:'佐世保',area:'佐世保駅周辺',pref:'長崎県佐世保市',lat:33.1740,lng:129.7151 },
    { name:'熊本',area:'熊本駅・上通下通',pref:'熊本県熊本市',lat:32.8031,lng:130.7079 },
    { name:'大分',area:'大分駅周辺',pref:'大分県大分市',lat:33.2382,lng:131.6126 },
    { name:'別府',area:'別府駅周辺',pref:'大分県別府市',lat:33.2846,lng:131.4931 },
    { name:'宮崎',area:'宮崎駅周辺',pref:'宮崎県宮崎市',lat:31.9111,lng:131.4239 },
    { name:'鹿児島',area:'鹿児島中央駅周辺',pref:'鹿児島県鹿児島市',lat:31.5966,lng:130.5571 },
    { name:'天文館',area:'天文館',pref:'鹿児島県鹿児島市',lat:31.5949,lng:130.5559 },
    { name:'那覇',area:'那覇・国際通り',pref:'沖縄県那覇市',lat:26.2124,lng:127.6809 },
    { name:'牧志',area:'牧志・国際通り',pref:'沖縄県那覇市',lat:26.2166,lng:127.6877 },
    { name:'沖縄市',area:'沖縄市・コザ',pref:'沖縄県沖縄市',lat:26.3312,lng:127.8092 },
  ];

  const localTemplates = [
    { genre:'ラーメン', priceRange:[650,950], rBase:3.7, rRange:0.7, suffixes:['ラーメン','らーめん','麺屋','軒','拉麺'], emoji:'🍜' },
    { genre:'そば・うどん', priceRange:[450,750], rBase:3.6, rRange:0.6, suffixes:['そば','うどん','庵','屋','麺処'], emoji:'🍜' },
    { genre:'定食・食堂', priceRange:[550,900], rBase:3.8, rRange:0.6, suffixes:['食堂','亭','定食屋','大衆食堂'], emoji:'🍱' },
    { genre:'居酒屋', priceRange:[500,800], rBase:3.6, rRange:0.6, suffixes:['居酒屋','酒場','酒処','炉端'], emoji:'🍺' },
    { genre:'中華料理', priceRange:[550,900], rBase:3.7, rRange:0.6, suffixes:['中華','飯店','楼','食堂'], emoji:'🥟' },
    { genre:'焼肉', priceRange:[750,1000], rBase:3.7, rRange:0.6, suffixes:['焼肉','焼き肉','炭火焼肉'], emoji:'🥩' },
    { genre:'カレー', priceRange:[600,900], rBase:3.8, rRange:0.5, suffixes:['カレー','スパイス','カレー食堂'], emoji:'🍛' },
    { genre:'寿司', priceRange:[700,1000], rBase:3.8, rRange:0.6, suffixes:['寿司','すし','鮨'], emoji:'🍣' },
    { genre:'焼き鳥', priceRange:[450,800], rBase:3.7, rRange:0.6, suffixes:['焼き鳥','鳥','炭火焼き'], emoji:'🍗' },
    { genre:'とんかつ', priceRange:[650,950], rBase:3.8, rRange:0.5, suffixes:['とんかつ','カツ','かつ亭'], emoji:'🐷' },
    { genre:'海鮮・魚介', priceRange:[700,1000], rBase:3.9, rRange:0.5, suffixes:['海鮮','漁師','鮮魚','魚屋'], emoji:'🐟' },
    { genre:'お好み焼き・もんじゃ', priceRange:[500,800], rBase:3.7, rRange:0.5, suffixes:['お好み焼き','鉄板焼き','もんじゃ'], emoji:'🥞' },
  ];

  const namePrefixes = [
    '山田','田中','鈴木','佐藤','高橋','松本','小林','渡辺','加藤','伊藤',
    '大将','親父','大吉','喜楽','元気','笑福','龍','虎','鶴','亀',
    '富士','桜','梅','松','竹','山','川','港','浜','磯',
    '昭和','下町','庶民','大衆','街角','路地裏','一番','三代目',
    '安兵衛','徳兵衛','権八','弥七','源太','幸吉','勝','豊',
    '千代','八千代','万年','長寿','繁盛','味一','旨い','絶品',
  ];

  const storeSuffixes = ['駅前店','北口店','南口店','東口店','西口店','ロード店','中央店','本店','アーケード店'];

  for (const area of areas) {
    const isKanto = area.lat > 34.8 && area.lat < 37.2 && area.lng > 138.5 && area.lng < 141.5;
    const isWest = area.lng < 137.5;
    const isKyushu = area.lat < 34.0 && area.lng < 132.0;

    for (const chain of chains) {
      if (chain.kanto && !isKanto) continue;
      if (chain.west && !isWest) continue;
      if (chain.kyushu && !isKyushu) continue;
      const suffix = storeSuffixes[Math.floor(Math.random() * storeSuffixes.length)];
      const lat = area.lat + (Math.random()-0.5)*0.012;
      const lng = area.lng + (Math.random()-0.5)*0.012;
      const rating = Math.min(5.0, Math.max(2.5, chain.rBase + (Math.random()-0.5)*chain.rRange));
      allRestaurants.push([
        `${chain.name} ${area.name}${suffix}`, chain.genre, chain.price,
        Math.round(rating*100)/100, lat, lng, area.area,
        `${area.pref} ${area.name}周辺`, chain.desc, chain.emoji,
        chain.hours, chain.closed, chain.tags, '', 0,
      ]);
    }

    // 個人店（エリアあたり10〜14件）
    const localCount = 10 + Math.floor(Math.random()*5);
    const usedNames = new Set();
    for (let i = 0; i < localCount; i++) {
      const template = localTemplates[i % localTemplates.length];
      const suffix = template.suffixes[Math.floor(Math.random()*template.suffixes.length)];
      let name; let tries = 0;
      do {
        const prefix = Math.random()<0.25 ? area.name : namePrefixes[Math.floor(Math.random()*namePrefixes.length)];
        name = `${prefix}${suffix}`;
        tries++;
      } while (usedNames.has(name) && tries < 20);
      usedNames.add(name);

      const [minP, maxP] = template.priceRange;
      const price = minP + Math.floor(Math.random()*(maxP-minP)/50)*50;
      const rating = Math.min(5.0, Math.max(2.0, template.rBase + (Math.random()-0.5)*template.rRange));
      const lat = area.lat + (Math.random()-0.5)*0.015;
      const lng = area.lng + (Math.random()-0.5)*0.015;
      allRestaurants.push([
        name, template.genre, price, Math.round(rating*100)/100,
        lat, lng, area.area, `${area.pref} ${area.name}周辺`,
        genDesc(template.genre, name), template.emoji,
        genHours(template.genre), genClosed(), genTags(template.genre, price), '', 0,
      ]);
    }
  }

  console.log(`Inserting ${allRestaurants.length} total restaurants (OSM: ${osmCount} + chains/local: ${allRestaurants.length - osmCount})...`);

  // バッチ並列挿入
  const BATCH_SIZE = 20;
  let count = 0;
  for (let i = 0; i < allRestaurants.length; i += BATCH_SIZE) {
    const batch = allRestaurants.slice(i, i+BATCH_SIZE);
    await Promise.all(batch.map(r =>
      sql`INSERT INTO restaurants (name, genre, price, rating, lat, lng, area, address, description, emoji, hours, closed_day, tags, website, reviews)
          VALUES (${r[0]}, ${r[1]}, ${r[2]}, ${r[3]}, ${r[4]}, ${r[5]}, ${r[6]}, ${r[7]}, ${r[8]}, ${r[9]}, ${r[10]}, ${r[11]}, ${r[12]}, ${r[13]}, ${r[14]})`
    ));
    count += batch.length;
    if (count % 2000 === 0 || count >= allRestaurants.length) {
      console.log(`${count}/${allRestaurants.length}件登録中...`);
    }
  }
  console.log(`✅ ${count}件の店舗データをDBに登録しました！`);
}

seed().catch(console.error);
