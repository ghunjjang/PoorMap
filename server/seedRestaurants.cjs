const { neon } = require('@neondatabase/serverless');

async function seed() {
  const sql = neon(process.env.POSTGRES_URL);
  await sql`DELETE FROM restaurants`;
  console.log('Cleared existing restaurants.');

  // ===== チェーン店定義 =====
  const chains = [
    { name: '松屋', genre: '牛丼', price: 400, rBase: 3.6, rRange: 0.5, desc: '24時間営業の牛めし。並盛400円から。', emoji: '🥩' },
    { name: '吉野家', genre: '牛丼', price: 420, rBase: 3.7, rRange: 0.4, desc: '早い安いうまいの老舗牛丼チェーン。', emoji: '🥩' },
    { name: 'すき家', genre: '牛丼', price: 390, rBase: 3.5, rRange: 0.5, desc: '牛丼並390円。種類豊富なトッピング。', emoji: '🥩' },
    { name: 'なか卯', genre: '丼ぶり', price: 450, rBase: 3.6, rRange: 0.4, desc: '親子丼とうどんのセットがコスパ抜群。', emoji: '🥚' },
    { name: 'はなまるうどん', genre: 'うどん', price: 350, rBase: 3.7, rRange: 0.5, desc: 'かけうどん小350円から。天ぷら自由トッピング。', emoji: '🍜' },
    { name: '丸亀製麺', genre: 'うどん', price: 400, rBase: 3.9, rRange: 0.4, desc: '打ち立てのコシのあるうどん。ネギ乗せ放題。', emoji: '🍜' },
    { name: '天丼てんや', genre: '天丼', price: 560, rBase: 3.8, rRange: 0.4, desc: '揚げたての天丼560円から。コスパ◎。', emoji: '🍤' },
    { name: 'かつや', genre: 'とんかつ', price: 590, rBase: 4.0, rRange: 0.4, desc: 'カツ丼梅590円。サクサクのとんかつ。', emoji: '🐷' },
    { name: 'やよい軒', genre: '定食', price: 850, rBase: 3.9, rRange: 0.4, desc: 'ご飯おかわり自由。バランスの良い定食。', emoji: '🍚' },
    { name: '大戸屋', genre: '定食', price: 800, rBase: 3.8, rRange: 0.4, desc: '野菜豊富なヘルシー定食。バランスが良い。', emoji: '🍱' },
    { name: '鳥貴族', genre: '焼き鳥', price: 360, rBase: 3.8, rRange: 0.4, desc: '全品均一360円。焼き鳥居酒屋の王様。', emoji: '🍗' },
    { name: 'スシロー', genre: '寿司', price: 120, rBase: 3.9, rRange: 0.4, desc: '100円台から食べられる回転寿司の王者。', emoji: '🍣' },
    { name: 'くら寿司', genre: '寿司', price: 125, rBase: 3.8, rRange: 0.4, desc: 'びっくらポンが楽しい。サイドメニューも充実。', emoji: '🍣' },
    { name: 'はま寿司', genre: '寿司', price: 120, rBase: 3.7, rRange: 0.4, desc: '平日90円皿も！コスパ最強の回転寿司。', emoji: '🍣' },
    { name: 'カッパ寿司', genre: '寿司', price: 130, rBase: 3.6, rRange: 0.4, desc: 'お得なセットメニューが豊富な回転寿司。', emoji: '🍣' },
    { name: '松のや', genre: 'とんかつ', price: 490, rBase: 3.7, rRange: 0.4, desc: 'ロースかつ定食490円。松屋系列のとんかつ専門店。', emoji: '🐷' },
    { name: 'ガスト', genre: 'ファミレス', price: 600, rBase: 3.7, rRange: 0.4, desc: 'コスパ最強のハンバーグとドリンクバー。', emoji: '🍽️' },
    { name: 'バーミヤン', genre: '中華', price: 700, rBase: 3.7, rRange: 0.3, desc: '本格的な中華がファミレス価格で楽しめる。', emoji: '🥟' },
    { name: '幸楽苑', genre: 'ラーメン', price: 490, rBase: 3.4, rRange: 0.5, desc: '中華そば290円～。ラーメンチェーンの老舗。', emoji: '🍜' },
    { name: 'カレーハウスCoCo壱番屋', genre: 'カレー', price: 800, rBase: 4.0, rRange: 0.4, desc: 'カスタマイズ自由なカレーチェーンの王者。', emoji: '🍛' },
    { name: '餃子の王将', genre: '中華', price: 600, rBase: 3.9, rRange: 0.4, desc: '餃子とチャーハンの黄金セット。コスパ最強中華。', emoji: '🥟' },
    { name: 'リンガーハット', genre: 'ちゃんぽん', price: 750, rBase: 3.8, rRange: 0.4, desc: '野菜たっぷりちゃんぽん。麺増量無料の店舗も健在。', emoji: '🍜' },
    { name: 'サイゼリヤ', genre: 'ファミレス', price: 500, rBase: 3.8, rRange: 0.4, desc: 'ミラノ風ドリアが300円。超コスパイタリアン。', emoji: '🍝' },
    { name: '富士そば', genre: 'そば・うどん', price: 390, rBase: 3.6, rRange: 0.5, desc: '24時間営業の立ち食いそば。かけそば390円から。', emoji: '🍜', kanto: true },
    { name: '日高屋', genre: '中華', price: 490, rBase: 3.5, rRange: 0.5, desc: '中華そば390円。餃子5個220円。コスパ最高。', emoji: '🥟', kanto: true },
    { name: 'ゆで太郎', genre: 'そば・うどん', price: 380, rBase: 3.6, rRange: 0.4, desc: '手打ちそば風の本格立ち食いそば。', emoji: '🍜', kanto: true },
    { name: 'ジョイフル', genre: 'ファミレス', price: 550, rBase: 3.7, rRange: 0.4, desc: '西日本発祥のコスパファミレス。24時間営業も多い。', emoji: '🍽️', west: true },
    { name: '資さんうどん', genre: 'うどん', price: 450, rBase: 4.0, rRange: 0.3, desc: '北九州発祥のうどんチェーン。ごぼう天が名物。', emoji: '🍜', kyushu: true },
  ];

  // ===== 個人店テンプレート =====
  const localTemplates = [
    {
      genre: 'ラーメン', priceRange: [650, 950], rBase: 3.7, rRange: 0.7,
      suffixes: ['ラーメン', 'らーめん', '麺屋', '軒', 'ラーメン食堂', '拉麺'],
      emoji: '🍜',
      descs: [
        '地元で愛される本格ラーメン。濃厚なスープが自慢。',
        '行列ができる人気ラーメン。麺は毎日手打ち。',
        'あっさり醤油から濃厚豚骨まで揃う街の人気店。',
        '創業30年の老舗ラーメン。昔ながらの味を守り続けている。',
        'ご当地食材を使ったオリジナルスープが絶品。',
      ]
    },
    {
      genre: 'そば・うどん', priceRange: [450, 750], rBase: 3.6, rRange: 0.6,
      suffixes: ['そば', 'うどん', '庵', '屋', '蕎麦店', '麺処'],
      emoji: '🍜',
      descs: [
        '手打ちの本格そば・うどん。地元産の小麦使用。',
        'サラリーマンに愛されるリーズナブルなそば屋。',
        'コシのある手打ちうどんが自慢。ダシも絶品。',
        '昭和創業の老舗。昔ながらの製法を守る本格店。',
        '立ち食いそばながら本格手打ち。コスパ最強。',
      ]
    },
    {
      genre: '定食・食堂', priceRange: [550, 900], rBase: 3.8, rRange: 0.6,
      suffixes: ['食堂', '亭', '定食屋', '飯処', '大衆食堂'],
      emoji: '🍱',
      descs: [
        'ボリューム満点の家庭的な定食。ご飯おかわり可能。',
        '地元の働く人たちに愛される大衆食堂。',
        '日替わり定食が人気。昔ながらの味わい。',
        '主婦のような家庭料理。体に優しいほっこり定食。',
        '創業50年以上。地域に根ざした食堂。',
      ]
    },
    {
      genre: '居酒屋', priceRange: [500, 800], rBase: 3.6, rRange: 0.6,
      suffixes: ['居酒屋', '酒場', '酒処', '酒亭', '炉端'],
      emoji: '🍺',
      descs: [
        'リーズナブルな大衆居酒屋。一品料理が充実。',
        '地元の人が集まる昭和感あふれる居酒屋。',
        '飲み放題コースが格安。賑やかな雰囲気。',
        '新鮮な魚介と地酒が揃う。コスパ良好な居酒屋。',
        '立ち飲みスタイルで気軽に一杯。',
      ]
    },
    {
      genre: '中華料理', priceRange: [550, 900], rBase: 3.7, rRange: 0.6,
      suffixes: ['中華', '中華料理', '飯店', '楼', '軒', '食堂'],
      emoji: '🥟',
      descs: [
        '本格的な中華料理。餃子とチャーハンが絶品。',
        '街の中華料理屋。安くてボリューム満点。',
        '家庭的な味の中華食堂。日替わりランチが人気。',
        '中国人シェフが作る本格的な味。リーズナブル。',
        'ギョーザとラーメンのセットがコスパ最強。',
      ]
    },
    {
      genre: '焼肉', priceRange: [750, 1000], rBase: 3.7, rRange: 0.6,
      suffixes: ['焼肉', '焼き肉', '炭火焼肉', 'ホルモン焼き'],
      emoji: '🥩',
      descs: [
        'ランチ焼肉定食が格安。コスパ最強の焼肉店。',
        '食べ放題コースが人気。地元の常連が多い。',
        '炭火焼きの本格焼肉。お得なセットメニュー。',
        '国産牛を使いながら驚きの価格設定。',
        'ホルモン系が充実。焼肉好きの隠れ家的存在。',
      ]
    },
    {
      genre: 'カレー', priceRange: [600, 900], rBase: 3.8, rRange: 0.5,
      suffixes: ['カレー', 'カレー食堂', 'カレー屋', 'スパイス'],
      emoji: '🍛',
      descs: [
        'スパイスにこだわった本格カレー。',
        'ボリューム満点でリーズナブルなカレー食堂。',
        '日替わりカレーが人気。地元のサラリーマン御用達。',
        '南インド系スパイスカレー。クセになる味。',
        '昔ながらの洋食カレー。懐かしの味わい。',
      ]
    },
    {
      genre: '寿司', priceRange: [700, 1000], rBase: 3.8, rRange: 0.6,
      suffixes: ['寿司', 'すし', '鮨', '寿司店', '鮨処'],
      emoji: '🍣',
      descs: [
        '新鮮なネタが自慢の街の寿司屋。お値打ち価格。',
        'ランチの握りセットがコスパ最強。',
        '地元の魚を使ったリーズナブルな寿司。',
        '職人歴20年の大将が握る本格寿司。',
        'テイクアウトも人気。手頃な価格の街寿司。',
      ]
    },
    {
      genre: '焼き鳥', priceRange: [450, 800], rBase: 3.7, rRange: 0.6,
      suffixes: ['焼き鳥', '鳥', '炭火焼き', '鳥料理', '鳥番長'],
      emoji: '🍗',
      descs: [
        '炭火焼きの本格焼き鳥。一串から注文OK。',
        'リーズナブルな焼き鳥居酒屋。地元の常連が多い。',
        '地鶏を使った本格焼き鳥。ビールとの相性抜群。',
        '素材にこだわる本格炭火焼き。一串100円台も。',
        '串打ちから炭火焼きまで全て手作業の職人店。',
      ]
    },
    {
      genre: 'とんかつ', priceRange: [650, 950], rBase: 3.8, rRange: 0.5,
      suffixes: ['とんかつ', 'カツ', 'とんかつ定食', 'かつ亭'],
      emoji: '🐷',
      descs: [
        'サクサクのとんかつが自慢。キャベツおかわり無料。',
        '地元の人気とんかつ屋。ボリューム満点。',
        'リーズナブルなカツ定食。揚げたてが絶品。',
        '昔ながらの揚げ方にこだわる老舗とんかつ店。',
        'ヒレもロースも格安。コスパ最強のとんかつ。',
      ]
    },
    {
      genre: 'お好み焼き・もんじゃ', priceRange: [500, 800], rBase: 3.7, rRange: 0.5,
      suffixes: ['お好み焼き', 'もんじゃ', '鉄板焼き', 'お好み'],
      emoji: '🥞',
      descs: [
        'ソースの香りが食欲をそそる本格お好み焼き。',
        '下町の味を守り続けるもんじゃ焼き専門店。',
        '自分で焼くスタイルが楽しい鉄板焼き居酒屋。',
        '地元素材を使ったご当地お好み焼き。',
        'お持ち帰りも人気のリーズナブルなお好み焼き屋。',
      ]
    },
    {
      genre: '海鮮・魚介', priceRange: [700, 1000], rBase: 3.9, rRange: 0.5,
      suffixes: ['海鮮', '魚屋', '漁師', '魚介', '鮮魚'],
      emoji: '🐟',
      descs: [
        '港直送の新鮮な海鮮が格安で食べられる。',
        '地元漁師から直仕入れの新鮮魚介料理。',
        '刺身定食が圧倒的コスパ。新鮮さが違う。',
        '市場直送の鮮魚を使った海鮮丼が人気。',
        '漁港の町ならではの鮮度抜群の海鮮料理。',
      ]
    },
  ];

  const namePrefixes = [
    '山田', '田中', '鈴木', '佐藤', '高橋', '松本', '小林', '渡辺', '加藤', '伊藤',
    '大将', '親父', '大吉', '喜楽', '元気', '笑福', '龍', '虎', '鶴', '亀',
    '富士', '桜', '梅', '松', '竹', '山', '川', '港', '浜', '磯',
    '昭和', '下町', '庶民', '大衆', '街角', '路地裏', '一番', '三代目',
    '安兵衛', '徳兵衛', '権八', '弥七', '源太', '幸吉', '勝', '豊',
    '千代', '八千代', '万年', '長寿', '繁盛', '味一', '旨い', '絶品',
    '北海道', '九州', '薩摩', '信州', '東北', '博多', '浪速', '尾張',
    '大漁', '豊作', '満腹', '腹八分', '庶民派', '激安', '名物',
  ];

  // ===== 全国エリアリスト（47都道府県対応） =====
  const areas = [
    // === 北海道 ===
    { name: '札幌大通', area: '大通・すすきの', pref: '北海道札幌市中央区', lat: 43.0618, lng: 141.3545 },
    { name: 'すすきの', area: 'すすきの', pref: '北海道札幌市中央区', lat: 43.0552, lng: 141.3567 },
    { name: '札幌駅', area: '札幌駅周辺', pref: '北海道札幌市北区', lat: 43.0686, lng: 141.3508 },
    { name: '円山', area: '円山・西28丁目', pref: '北海道札幌市中央区', lat: 43.0558, lng: 141.3188 },
    { name: '麻生', area: '麻生', pref: '北海道札幌市北区', lat: 43.0985, lng: 141.3427 },
    { name: '白石', area: '白石', pref: '北海道札幌市白石区', lat: 43.0517, lng: 141.3942 },
    { name: '旭川', area: '旭川駅周辺', pref: '北海道旭川市', lat: 43.7706, lng: 142.3650 },
    { name: '函館', area: '函館駅周辺', pref: '北海道函館市', lat: 41.7687, lng: 140.7291 },
    { name: '函館湯川', area: '函館湯川', pref: '北海道函館市', lat: 41.7874, lng: 140.7718 },
    { name: '帯広', area: '帯広駅周辺', pref: '北海道帯広市', lat: 42.9171, lng: 143.2044 },
    { name: '釧路', area: '釧路駅周辺', pref: '北海道釧路市', lat: 42.9769, lng: 144.3820 },
    { name: '苫小牧', area: '苫小牧駅周辺', pref: '北海道苫小牧市', lat: 42.6339, lng: 141.6050 },
    { name: '北見', area: '北見駅周辺', pref: '北海道北見市', lat: 43.8036, lng: 143.8940 },
    { name: '小樽', area: '小樽駅周辺', pref: '北海道小樽市', lat: 43.1907, lng: 140.9946 },
    { name: '室蘭', area: '室蘭駅周辺', pref: '北海道室蘭市', lat: 42.3153, lng: 140.9739 },

    // === 青森県 ===
    { name: '青森', area: '青森駅周辺', pref: '青森県青森市', lat: 40.8244, lng: 140.7400 },
    { name: '弘前', area: '弘前駅周辺', pref: '青森県弘前市', lat: 40.6031, lng: 140.4637 },
    { name: '八戸', area: '八戸駅周辺', pref: '青森県八戸市', lat: 40.5123, lng: 141.4882 },

    // === 岩手県 ===
    { name: '盛岡', area: '盛岡駅周辺', pref: '岩手県盛岡市', lat: 39.7036, lng: 141.1527 },
    { name: '一関', area: '一関駅周辺', pref: '岩手県一関市', lat: 38.9340, lng: 141.1267 },
    { name: '北上', area: '北上駅周辺', pref: '岩手県北上市', lat: 39.2873, lng: 141.1133 },

    // === 宮城県 ===
    { name: '仙台', area: '仙台駅周辺', pref: '宮城県仙台市青葉区', lat: 38.2688, lng: 140.8721 },
    { name: '仙台一番町', area: '仙台一番町', pref: '宮城県仙台市青葉区', lat: 38.2637, lng: 140.8699 },
    { name: '仙台長町', area: '長町', pref: '宮城県仙台市太白区', lat: 38.2088, lng: 140.8816 },
    { name: '石巻', area: '石巻駅周辺', pref: '宮城県石巻市', lat: 38.4312, lng: 141.3024 },
    { name: '古川', area: '古川駅周辺', pref: '宮城県大崎市', lat: 38.5758, lng: 140.9536 },

    // === 秋田県 ===
    { name: '秋田', area: '秋田駅周辺', pref: '秋田県秋田市', lat: 39.7200, lng: 140.1025 },
    { name: '大曲', area: '大曲駅周辺', pref: '秋田県大仙市', lat: 39.4559, lng: 140.4806 },

    // === 山形県 ===
    { name: '山形', area: '山形駅周辺', pref: '山形県山形市', lat: 38.2404, lng: 140.3633 },
    { name: '米沢', area: '米沢駅周辺', pref: '山形県米沢市', lat: 37.9228, lng: 140.1162 },
    { name: '鶴岡', area: '鶴岡駅周辺', pref: '山形県鶴岡市', lat: 38.7306, lng: 139.8261 },
    { name: '酒田', area: '酒田駅周辺', pref: '山形県酒田市', lat: 38.9130, lng: 139.8361 },

    // === 福島県 ===
    { name: '福島', area: '福島駅周辺', pref: '福島県福島市', lat: 37.7500, lng: 140.4677 },
    { name: '郡山', area: '郡山駅周辺', pref: '福島県郡山市', lat: 37.4017, lng: 140.3880 },
    { name: '会津若松', area: '会津若松駅周辺', pref: '福島県会津若松市', lat: 37.4947, lng: 139.9300 },
    { name: 'いわき', area: 'いわき駅周辺', pref: '福島県いわき市', lat: 37.0544, lng: 140.8878 },

    // === 茨城県 ===
    { name: '水戸', area: '水戸駅周辺', pref: '茨城県水戸市', lat: 36.3418, lng: 140.4468 },
    { name: 'つくば', area: 'つくば駅周辺', pref: '茨城県つくば市', lat: 36.0837, lng: 140.0757 },
    { name: '日立', area: '日立駅周辺', pref: '茨城県日立市', lat: 36.5997, lng: 140.6517 },
    { name: '土浦', area: '土浦駅周辺', pref: '茨城県土浦市', lat: 36.0720, lng: 140.2049 },
    { name: '古河', area: '古河駅周辺', pref: '茨城県古河市', lat: 36.1825, lng: 139.7054 },

    // === 栃木県 ===
    { name: '宇都宮', area: '宇都宮駅周辺', pref: '栃木県宇都宮市', lat: 36.5551, lng: 139.8829 },
    { name: '小山', area: '小山駅周辺', pref: '栃木県小山市', lat: 36.3143, lng: 139.8003 },
    { name: '足利', area: '足利駅周辺', pref: '栃木県足利市', lat: 36.3408, lng: 139.4516 },
    { name: '栃木', area: '栃木駅周辺', pref: '栃木県栃木市', lat: 36.3831, lng: 139.7322 },

    // === 群馬県 ===
    { name: '前橋', area: '前橋駅周辺', pref: '群馬県前橋市', lat: 36.3894, lng: 139.0634 },
    { name: '高崎', area: '高崎駅周辺', pref: '群馬県高崎市', lat: 36.3231, lng: 139.0015 },
    { name: '伊勢崎', area: '伊勢崎駅周辺', pref: '群馬県伊勢崎市', lat: 36.3116, lng: 139.1971 },
    { name: '桐生', area: '桐生駅周辺', pref: '群馬県桐生市', lat: 36.4046, lng: 139.3303 },
    { name: '太田', area: '太田駅周辺', pref: '群馬県太田市', lat: 36.2918, lng: 139.3761 },

    // === 埼玉県 ===
    { name: '大宮', area: '大宮駅周辺', pref: '埼玉県さいたま市大宮区', lat: 35.9069, lng: 139.6228 },
    { name: '浦和', area: '浦和駅周辺', pref: '埼玉県さいたま市浦和区', lat: 35.8580, lng: 139.6467 },
    { name: '川口', area: '川口駅周辺', pref: '埼玉県川口市', lat: 35.8075, lng: 139.7244 },
    { name: '所沢', area: '所沢駅周辺', pref: '埼玉県所沢市', lat: 35.7992, lng: 139.4685 },
    { name: '越谷', area: '越谷駅周辺', pref: '埼玉県越谷市', lat: 35.8975, lng: 139.7889 },
    { name: '春日部', area: '春日部駅周辺', pref: '埼玉県春日部市', lat: 35.9752, lng: 139.7525 },
    { name: '熊谷', area: '熊谷駅周辺', pref: '埼玉県熊谷市', lat: 36.1469, lng: 139.3881 },
    { name: '川越', area: '川越駅周辺', pref: '埼玉県川越市', lat: 35.9249, lng: 139.4858 },
    { name: '新座', area: '新座駅周辺', pref: '埼玉県新座市', lat: 35.7940, lng: 139.5285 },
    { name: '狭山', area: '狭山市駅周辺', pref: '埼玉県狭山市', lat: 35.8527, lng: 139.4127 },
    { name: '蕨', area: '蕨駅周辺', pref: '埼玉県蕨市', lat: 35.8256, lng: 139.6826 },

    // === 千葉県 ===
    { name: '千葉', area: '千葉駅周辺', pref: '千葉県千葉市', lat: 35.6073, lng: 140.1063 },
    { name: '柏', area: '柏駅周辺', pref: '千葉県柏市', lat: 35.8672, lng: 139.9752 },
    { name: '船橋', area: '船橋駅周辺', pref: '千葉県船橋市', lat: 35.6943, lng: 139.9825 },
    { name: '松戸', area: '松戸駅周辺', pref: '千葉県松戸市', lat: 35.7875, lng: 139.9016 },
    { name: '市川', area: '市川駅周辺', pref: '千葉県市川市', lat: 35.7210, lng: 139.9283 },
    { name: '成田', area: '成田駅周辺', pref: '千葉県成田市', lat: 35.7769, lng: 140.3179 },
    { name: '木更津', area: '木更津駅周辺', pref: '千葉県木更津市', lat: 35.3759, lng: 139.9244 },
    { name: '津田沼', area: '津田沼駅周辺', pref: '千葉県習志野市', lat: 35.6782, lng: 140.0246 },
    { name: '本八幡', area: '本八幡駅周辺', pref: '千葉県市川市', lat: 35.7073, lng: 139.9319 },
    { name: '我孫子', area: '我孫子駅周辺', pref: '千葉県我孫子市', lat: 35.8699, lng: 140.0259 },

    // === 東京都（山手線） ===
    { name: '東京', area: '東京駅', pref: '東京都千代田区', lat: 35.6812, lng: 139.7671 },
    { name: '有楽町', area: '有楽町', pref: '東京都千代田区', lat: 35.6752, lng: 139.7629 },
    { name: '新橋', area: '新橋', pref: '東京都港区', lat: 35.6664, lng: 139.7582 },
    { name: '浜松町', area: '浜松町', pref: '東京都港区', lat: 35.6553, lng: 139.7569 },
    { name: '田町', area: '田町', pref: '東京都港区', lat: 35.6455, lng: 139.7474 },
    { name: '品川', area: '品川', pref: '東京都港区', lat: 35.6284, lng: 139.7388 },
    { name: '大崎', area: '大崎', pref: '東京都品川区', lat: 35.6197, lng: 139.7285 },
    { name: '五反田', area: '五反田', pref: '東京都品川区', lat: 35.6262, lng: 139.7233 },
    { name: '目黒', area: '目黒', pref: '東京都目黒区', lat: 35.6330, lng: 139.7156 },
    { name: '恵比寿', area: '恵比寿', pref: '東京都渋谷区', lat: 35.6467, lng: 139.7101 },
    { name: '渋谷', area: '渋谷', pref: '東京都渋谷区', lat: 35.6580, lng: 139.7016 },
    { name: '原宿', area: '原宿', pref: '東京都渋谷区', lat: 35.6702, lng: 139.7027 },
    { name: '代々木', area: '代々木', pref: '東京都渋谷区', lat: 35.6839, lng: 139.7020 },
    { name: '新宿', area: '新宿', pref: '東京都新宿区', lat: 35.6895, lng: 139.6917 },
    { name: '新大久保', area: '新大久保', pref: '東京都新宿区', lat: 35.7004, lng: 139.7003 },
    { name: '高田馬場', area: '高田馬場', pref: '東京都新宿区', lat: 35.7124, lng: 139.7036 },
    { name: '目白', area: '目白', pref: '東京都豊島区', lat: 35.7210, lng: 139.7065 },
    { name: '池袋', area: '池袋', pref: '東京都豊島区', lat: 35.7295, lng: 139.7109 },
    { name: '大塚', area: '大塚', pref: '東京都豊島区', lat: 35.7317, lng: 139.7286 },
    { name: '巣鴨', area: '巣鴨', pref: '東京都豊島区', lat: 35.7335, lng: 139.7390 },
    { name: '駒込', area: '駒込', pref: '東京都豊島区', lat: 35.7380, lng: 139.7464 },
    { name: '田端', area: '田端', pref: '東京都北区', lat: 35.7381, lng: 139.7617 },
    { name: '西日暮里', area: '西日暮里', pref: '東京都荒川区', lat: 35.7324, lng: 139.7680 },
    { name: '日暮里', area: '日暮里', pref: '東京都荒川区', lat: 35.7280, lng: 139.7708 },
    { name: '鶯谷', area: '鶯谷', pref: '東京都台東区', lat: 35.7212, lng: 139.7782 },
    { name: '上野', area: '上野', pref: '東京都台東区', lat: 35.7089, lng: 139.7741 },
    { name: '御徒町', area: '御徒町', pref: '東京都台東区', lat: 35.7078, lng: 139.7736 },
    { name: '秋葉原', area: '秋葉原', pref: '東京都千代田区', lat: 35.7023, lng: 139.7745 },
    { name: '神田', area: '神田', pref: '東京都千代田区', lat: 35.6938, lng: 139.7706 },
    // 東京 その他
    { name: '浅草', area: '浅草', pref: '東京都台東区', lat: 35.7148, lng: 139.7967 },
    { name: '押上', area: '押上・スカイツリー', pref: '東京都墨田区', lat: 35.7102, lng: 139.8133 },
    { name: '錦糸町', area: '錦糸町', pref: '東京都墨田区', lat: 35.6962, lng: 139.8153 },
    { name: '亀戸', area: '亀戸', pref: '東京都江東区', lat: 35.6938, lng: 139.8275 },
    { name: '北千住', area: '北千住', pref: '東京都足立区', lat: 35.7494, lng: 139.8004 },
    { name: '綾瀬', area: '綾瀬', pref: '東京都足立区', lat: 35.7597, lng: 139.8237 },
    { name: '西新井', area: '西新井', pref: '東京都足立区', lat: 35.7754, lng: 139.7816 },
    { name: '六本木', area: '六本木', pref: '東京都港区', lat: 35.6628, lng: 139.7323 },
    { name: '麻布十番', area: '麻布十番', pref: '東京都港区', lat: 35.6568, lng: 139.7388 },
    { name: '表参道', area: '表参道', pref: '東京都渋谷区', lat: 35.6652, lng: 139.7124 },
    { name: '銀座', area: '銀座', pref: '東京都中央区', lat: 35.6717, lng: 139.7650 },
    { name: '御茶ノ水', area: '御茶ノ水', pref: '東京都千代田区', lat: 35.6985, lng: 139.7639 },
    { name: '水道橋', area: '水道橋', pref: '東京都文京区', lat: 35.7028, lng: 139.7524 },
    { name: '飯田橋', area: '飯田橋', pref: '東京都新宿区', lat: 35.7022, lng: 139.7483 },
    { name: '四谷', area: '四谷', pref: '東京都新宿区', lat: 35.6859, lng: 139.7302 },
    { name: '市ヶ谷', area: '市ヶ谷', pref: '東京都新宿区', lat: 35.6900, lng: 139.7367 },
    { name: '中目黒', area: '中目黒', pref: '東京都目黒区', lat: 35.6445, lng: 139.6983 },
    { name: '三軒茶屋', area: '三軒茶屋', pref: '東京都世田谷区', lat: 35.6432, lng: 139.6705 },
    { name: '下北沢', area: '下北沢', pref: '東京都世田谷区', lat: 35.6612, lng: 139.6681 },
    { name: '明大前', area: '明大前', pref: '東京都世田谷区', lat: 35.6649, lng: 139.6539 },
    { name: '笹塚', area: '笹塚', pref: '東京都渋谷区', lat: 35.6705, lng: 139.6610 },
    { name: '中野', area: '中野', pref: '東京都中野区', lat: 35.7071, lng: 139.6653 },
    { name: '阿佐ヶ谷', area: '阿佐ヶ谷', pref: '東京都杉並区', lat: 35.7076, lng: 139.6365 },
    { name: '高円寺', area: '高円寺', pref: '東京都杉並区', lat: 35.7056, lng: 139.6492 },
    { name: '荻窪', area: '荻窪', pref: '東京都杉並区', lat: 35.7028, lng: 139.6241 },
    { name: '西荻窪', area: '西荻窪', pref: '東京都杉並区', lat: 35.7056, lng: 139.6062 },
    { name: '吉祥寺', area: '吉祥寺', pref: '東京都武蔵野市', lat: 35.7031, lng: 139.5796 },
    { name: '三鷹', area: '三鷹', pref: '東京都三鷹市', lat: 35.6837, lng: 139.5605 },
    { name: '武蔵境', area: '武蔵境', pref: '東京都武蔵野市', lat: 35.7153, lng: 139.5647 },
    { name: '国分寺', area: '国分寺', pref: '東京都国分寺市', lat: 35.7003, lng: 139.4822 },
    { name: '立川', area: '立川', pref: '東京都立川市', lat: 35.6983, lng: 139.4154 },
    { name: '八王子', area: '八王子', pref: '東京都八王子市', lat: 35.6665, lng: 139.3165 },
    { name: '町田', area: '町田', pref: '東京都町田市', lat: 35.5453, lng: 139.4453 },
    { name: '調布', area: '調布', pref: '東京都調布市', lat: 35.6524, lng: 139.5443 },
    { name: '府中', area: '府中', pref: '東京都府中市', lat: 35.6680, lng: 139.4773 },
    { name: '葛西', area: '葛西', pref: '東京都江戸川区', lat: 35.6730, lng: 139.8690 },
    { name: '小岩', area: '小岩', pref: '東京都江戸川区', lat: 35.7312, lng: 139.8693 },
    { name: '蒲田', area: '蒲田', pref: '東京都大田区', lat: 35.5639, lng: 139.7164 },
    { name: '大森', area: '大森', pref: '東京都大田区', lat: 35.5904, lng: 139.7161 },
    { name: '武蔵小山', area: '武蔵小山', pref: '東京都品川区', lat: 35.6226, lng: 139.7134 },
    { name: '十条', area: '十条', pref: '東京都北区', lat: 35.7548, lng: 139.7294 },
    { name: '赤羽', area: '赤羽', pref: '東京都北区', lat: 35.7777, lng: 139.7213 },
    { name: '王子', area: '王子', pref: '東京都北区', lat: 35.7518, lng: 139.7377 },
    { name: '尾久', area: '尾久', pref: '東京都荒川区', lat: 35.7493, lng: 139.7613 },
    { name: '亀有', area: '亀有', pref: '東京都葛飾区', lat: 35.7668, lng: 139.8488 },
    { name: '金町', area: '金町', pref: '東京都葛飾区', lat: 35.7719, lng: 139.8665 },

    // === 神奈川県 ===
    { name: '横浜', area: '横浜駅周辺', pref: '神奈川県横浜市西区', lat: 35.4658, lng: 139.6225 },
    { name: '関内', area: '関内・伊勢佐木町', pref: '神奈川県横浜市中区', lat: 35.4434, lng: 139.6441 },
    { name: '桜木町', area: '桜木町・みなとみらい', pref: '神奈川県横浜市西区', lat: 35.4512, lng: 139.6315 },
    { name: '鶴見', area: '鶴見', pref: '神奈川県横浜市鶴見区', lat: 35.5081, lng: 139.6767 },
    { name: '川崎', area: '川崎駅周辺', pref: '神奈川県川崎市川崎区', lat: 35.5307, lng: 139.7026 },
    { name: '武蔵小杉', area: '武蔵小杉', pref: '神奈川県川崎市中原区', lat: 35.5756, lng: 139.6585 },
    { name: '溝の口', area: '溝の口', pref: '神奈川県川崎市高津区', lat: 35.6033, lng: 139.6063 },
    { name: '登戸', area: '登戸', pref: '神奈川県川崎市多摩区', lat: 35.6063, lng: 139.5795 },
    { name: '上大岡', area: '上大岡', pref: '神奈川県横浜市港南区', lat: 35.3912, lng: 139.5975 },
    { name: '戸塚', area: '戸塚', pref: '神奈川県横浜市戸塚区', lat: 35.3973, lng: 139.5321 },
    { name: '大船', area: '大船', pref: '神奈川県鎌倉市', lat: 35.3127, lng: 139.5302 },
    { name: '藤沢', area: '藤沢駅周辺', pref: '神奈川県藤沢市', lat: 35.3357, lng: 139.4876 },
    { name: '茅ヶ崎', area: '茅ヶ崎駅周辺', pref: '神奈川県茅ヶ崎市', lat: 35.3323, lng: 139.4037 },
    { name: '平塚', area: '平塚駅周辺', pref: '神奈川県平塚市', lat: 35.3288, lng: 139.3424 },
    { name: '小田原', area: '小田原駅周辺', pref: '神奈川県小田原市', lat: 35.2551, lng: 139.1539 },
    { name: '厚木', area: '厚木駅周辺', pref: '神奈川県厚木市', lat: 35.4409, lng: 139.3643 },
    { name: '相模原', area: '相模原駅周辺', pref: '神奈川県相模原市', lat: 35.5739, lng: 139.3729 },
    { name: '横須賀', area: '横須賀中央', pref: '神奈川県横須賀市', lat: 35.2816, lng: 139.6720 },
    { name: '鎌倉', area: '鎌倉駅周辺', pref: '神奈川県鎌倉市', lat: 35.3194, lng: 139.5500 },

    // === 新潟県 ===
    { name: '新潟', area: '新潟駅周辺', pref: '新潟県新潟市', lat: 37.9162, lng: 139.0364 },
    { name: '長岡', area: '長岡駅周辺', pref: '新潟県長岡市', lat: 37.4487, lng: 138.8513 },
    { name: '上越', area: '上越駅周辺', pref: '新潟県上越市', lat: 37.1484, lng: 138.2363 },
    { name: '三条', area: '三条駅周辺', pref: '新潟県三条市', lat: 37.6372, lng: 138.9579 },

    // === 富山県 ===
    { name: '富山', area: '富山駅周辺', pref: '富山県富山市', lat: 36.6953, lng: 137.2113 },
    { name: '高岡', area: '高岡駅周辺', pref: '富山県高岡市', lat: 36.7544, lng: 137.0246 },

    // === 石川県 ===
    { name: '金沢', area: '金沢駅周辺', pref: '石川県金沢市', lat: 36.5748, lng: 136.6553 },
    { name: '金沢香林坊', area: '香林坊・片町', pref: '石川県金沢市', lat: 36.5611, lng: 136.6567 },
    { name: '小松', area: '小松駅周辺', pref: '石川県小松市', lat: 36.4037, lng: 136.4494 },

    // === 福井県 ===
    { name: '福井', area: '福井駅周辺', pref: '福井県福井市', lat: 36.0652, lng: 136.2216 },
    { name: '敦賀', area: '敦賀駅周辺', pref: '福井県敦賀市', lat: 35.6461, lng: 136.0751 },

    // === 山梨県 ===
    { name: '甲府', area: '甲府駅周辺', pref: '山梨県甲府市', lat: 35.6636, lng: 138.5684 },
    { name: '富士吉田', area: '富士吉田駅周辺', pref: '山梨県富士吉田市', lat: 35.4885, lng: 138.8083 },

    // === 長野県 ===
    { name: '長野', area: '長野駅周辺', pref: '長野県長野市', lat: 36.6513, lng: 138.1813 },
    { name: '松本', area: '松本駅周辺', pref: '長野県松本市', lat: 36.2380, lng: 137.9721 },
    { name: '上田', area: '上田駅周辺', pref: '長野県上田市', lat: 36.4022, lng: 138.2493 },
    { name: '飯田', area: '飯田駅周辺', pref: '長野県飯田市', lat: 35.5152, lng: 137.8218 },

    // === 岐阜県 ===
    { name: '岐阜', area: '岐阜駅周辺', pref: '岐阜県岐阜市', lat: 35.4232, lng: 136.7608 },
    { name: '大垣', area: '大垣駅周辺', pref: '岐阜県大垣市', lat: 35.3604, lng: 136.6157 },
    { name: '高山', area: '高山駅周辺', pref: '岐阜県高山市', lat: 36.1461, lng: 137.2520 },
    { name: '各務原', area: '各務原駅周辺', pref: '岐阜県各務原市', lat: 35.3970, lng: 136.8487 },

    // === 静岡県 ===
    { name: '静岡', area: '静岡駅周辺', pref: '静岡県静岡市', lat: 34.9769, lng: 138.3831 },
    { name: '浜松', area: '浜松駅周辺', pref: '静岡県浜松市', lat: 34.7108, lng: 137.7261 },
    { name: '沼津', area: '沼津駅周辺', pref: '静岡県沼津市', lat: 35.0955, lng: 138.8631 },
    { name: '富士', area: '富士駅周辺', pref: '静岡県富士市', lat: 35.1616, lng: 138.6762 },
    { name: '三島', area: '三島駅周辺', pref: '静岡県三島市', lat: 35.1186, lng: 138.9199 },

    // === 愛知県 ===
    { name: '名古屋栄', area: '栄・錦', pref: '愛知県名古屋市中区', lat: 35.1680, lng: 136.9071 },
    { name: '名古屋', area: '名古屋駅周辺', pref: '愛知県名古屋市西区', lat: 35.1709, lng: 136.8815 },
    { name: '伏見', area: '伏見', pref: '愛知県名古屋市中区', lat: 35.1637, lng: 136.8987 },
    { name: '金山', area: '金山', pref: '愛知県名古屋市熱田区', lat: 35.1432, lng: 136.9001 },
    { name: '大曽根', area: '大曽根', pref: '愛知県名古屋市北区', lat: 35.1894, lng: 136.9347 },
    { name: '千種', area: '千種', pref: '愛知県名古屋市千種区', lat: 35.1668, lng: 136.9289 },
    { name: '岡崎', area: '岡崎駅周辺', pref: '愛知県岡崎市', lat: 34.9565, lng: 137.1742 },
    { name: '豊橋', area: '豊橋駅周辺', pref: '愛知県豊橋市', lat: 34.7692, lng: 137.3939 },
    { name: '豊田', area: '豊田市駅周辺', pref: '愛知県豊田市', lat: 35.0826, lng: 137.1566 },
    { name: '一宮', area: '一宮駅周辺', pref: '愛知県一宮市', lat: 35.3028, lng: 136.8003 },
    { name: '春日井', area: '春日井駅周辺', pref: '愛知県春日井市', lat: 35.2472, lng: 136.9724 },

    // === 三重県 ===
    { name: '津', area: '津駅周辺', pref: '三重県津市', lat: 34.7302, lng: 136.5085 },
    { name: '四日市', area: '四日市駅周辺', pref: '三重県四日市市', lat: 34.9663, lng: 136.6246 },
    { name: '鈴鹿', area: '鈴鹿市駅周辺', pref: '三重県鈴鹿市', lat: 34.8823, lng: 136.5837 },

    // === 滋賀県 ===
    { name: '大津', area: '大津駅周辺', pref: '滋賀県大津市', lat: 35.0044, lng: 135.8685 },
    { name: '草津', area: '草津駅周辺', pref: '滋賀県草津市', lat: 35.0147, lng: 135.9680 },
    { name: '彦根', area: '彦根駅周辺', pref: '滋賀県彦根市', lat: 35.2740, lng: 136.2638 },

    // === 京都府 ===
    { name: '京都駅', area: '京都駅周辺', pref: '京都府京都市下京区', lat: 34.9858, lng: 135.7588 },
    { name: '四条河原町', area: '四条河原町', pref: '京都府京都市下京区', lat: 35.0039, lng: 135.7716 },
    { name: '祇園', area: '祇園・東山', pref: '京都府京都市東山区', lat: 35.0036, lng: 135.7761 },
    { name: '烏丸', area: '烏丸・御池', pref: '京都府京都市中京区', lat: 35.0099, lng: 135.7557 },
    { name: '北山', area: '北山', pref: '京都府京都市左京区', lat: 35.0476, lng: 135.7701 },
    { name: '三条', area: '三条・木屋町', pref: '京都府京都市中京区', lat: 35.0124, lng: 135.7716 },
    { name: '宇治', area: '宇治駅周辺', pref: '京都府宇治市', lat: 34.8843, lng: 135.7988 },
    { name: '伏見', area: '伏見・桃山', pref: '京都府京都市伏見区', lat: 34.9465, lng: 135.7636 },

    // === 大阪府 ===
    { name: '梅田', area: '梅田・大阪駅周辺', pref: '大阪府大阪市北区', lat: 34.7023, lng: 135.4983 },
    { name: '難波', area: '難波・心斎橋', pref: '大阪府大阪市中央区', lat: 34.6686, lng: 135.5018 },
    { name: '天王寺', area: '天王寺・阿倍野', pref: '大阪府大阪市阿倍野区', lat: 34.6457, lng: 135.5133 },
    { name: '日本橋', area: '日本橋・難波', pref: '大阪府大阪市浪速区', lat: 34.6699, lng: 135.5073 },
    { name: '京橋', area: '京橋', pref: '大阪府大阪市都島区', lat: 34.6949, lng: 135.5329 },
    { name: '鶴橋', area: '鶴橋', pref: '大阪府大阪市生野区', lat: 34.6636, lng: 135.5384 },
    { name: '天満', area: '天満・扇町', pref: '大阪府大阪市北区', lat: 34.6968, lng: 135.5152 },
    { name: '福島', area: '福島・野田', pref: '大阪府大阪市福島区', lat: 34.6939, lng: 135.4730 },
    { name: '堺筋本町', area: '堺筋本町', pref: '大阪府大阪市中央区', lat: 34.6797, lng: 135.5113 },
    { name: '本町', area: '本町', pref: '大阪府大阪市中央区', lat: 34.6825, lng: 135.5004 },
    { name: '東大阪', area: '布施・東大阪', pref: '大阪府東大阪市', lat: 34.6795, lng: 135.6016 },
    { name: '堺', area: '堺東・堺駅周辺', pref: '大阪府堺市', lat: 34.5733, lng: 135.4830 },
    { name: '豊中', area: '豊中・蛍池', pref: '大阪府豊中市', lat: 34.7809, lng: 135.4676 },
    { name: '吹田', area: '吹田・千里山', pref: '大阪府吹田市', lat: 34.7631, lng: 135.5167 },
    { name: '茨木', area: '茨木駅周辺', pref: '大阪府茨木市', lat: 34.8166, lng: 135.5678 },
    { name: '高槻', area: '高槻駅周辺', pref: '大阪府高槻市', lat: 34.8505, lng: 135.6172 },
    { name: '枚方', area: '枚方市駅周辺', pref: '大阪府枚方市', lat: 34.8143, lng: 135.6555 },
    { name: '岸和田', area: '岸和田駅周辺', pref: '大阪府岸和田市', lat: 34.4604, lng: 135.3640 },
    { name: '池田', area: '池田駅周辺', pref: '大阪府池田市', lat: 34.8211, lng: 135.4347 },

    // === 兵庫県 ===
    { name: '三宮', area: '三宮・元町', pref: '兵庫県神戸市中央区', lat: 34.6912, lng: 135.1950 },
    { name: '神戸元町', area: '元町・南京町', pref: '兵庫県神戸市中央区', lat: 34.6887, lng: 135.1827 },
    { name: '神戸北野', area: '北野・異人館', pref: '兵庫県神戸市中央区', lat: 34.6993, lng: 135.1920 },
    { name: '灘', area: '灘・六甲道', pref: '兵庫県神戸市灘区', lat: 34.7142, lng: 135.2272 },
    { name: '芦屋', area: '芦屋駅周辺', pref: '兵庫県芦屋市', lat: 34.7282, lng: 135.3039 },
    { name: '西宮', area: '西宮北口・西宮駅', pref: '兵庫県西宮市', lat: 34.7300, lng: 135.3406 },
    { name: '尼崎', area: '尼崎駅周辺', pref: '兵庫県尼崎市', lat: 34.7337, lng: 135.4056 },
    { name: '宝塚', area: '宝塚駅周辺', pref: '兵庫県宝塚市', lat: 34.7992, lng: 135.3581 },
    { name: '姫路', area: '姫路駅周辺', pref: '兵庫県姫路市', lat: 34.8394, lng: 134.6939 },
    { name: '明石', area: '明石駅周辺', pref: '兵庫県明石市', lat: 34.6550, lng: 134.9995 },
    { name: '加古川', area: '加古川駅周辺', pref: '兵庫県加古川市', lat: 34.7556, lng: 134.8526 },
    { name: '西脇', area: '西脇市駅周辺', pref: '兵庫県西脇市', lat: 34.9914, lng: 134.9826 },

    // === 奈良県 ===
    { name: '奈良', area: '奈良駅周辺', pref: '奈良県奈良市', lat: 34.6851, lng: 135.8050 },
    { name: '橿原', area: '橿原神宮前・大和八木', pref: '奈良県橿原市', lat: 34.4943, lng: 135.7957 },
    { name: '生駒', area: '生駒駅周辺', pref: '奈良県生駒市', lat: 34.6897, lng: 135.6992 },

    // === 和歌山県 ===
    { name: '和歌山', area: '和歌山駅周辺', pref: '和歌山県和歌山市', lat: 34.2304, lng: 135.1675 },
    { name: '田辺', area: '紀伊田辺駅周辺', pref: '和歌山県田辺市', lat: 33.7337, lng: 135.3761 },

    // === 鳥取県 ===
    { name: '鳥取', area: '鳥取駅周辺', pref: '鳥取県鳥取市', lat: 35.5011, lng: 134.2351 },
    { name: '米子', area: '米子駅周辺', pref: '鳥取県米子市', lat: 35.4277, lng: 133.3294 },

    // === 島根県 ===
    { name: '松江', area: '松江駅周辺', pref: '島根県松江市', lat: 35.4722, lng: 133.0505 },
    { name: '出雲', area: '出雲市駅周辺', pref: '島根県出雲市', lat: 35.3669, lng: 132.7648 },
    { name: '浜田', area: '浜田駅周辺', pref: '島根県浜田市', lat: 34.8986, lng: 132.0752 },

    // === 岡山県 ===
    { name: '岡山', area: '岡山駅周辺', pref: '岡山県岡山市', lat: 34.6617, lng: 133.9350 },
    { name: '倉敷', area: '倉敷駅周辺', pref: '岡山県倉敷市', lat: 34.5852, lng: 133.7725 },
    { name: '津山', area: '津山駅周辺', pref: '岡山県津山市', lat: 35.0718, lng: 134.0048 },

    // === 広島県 ===
    { name: '広島', area: '広島駅周辺', pref: '広島県広島市南区', lat: 34.3853, lng: 132.4553 },
    { name: '広島本通', area: '本通・紙屋町', pref: '広島県広島市中区', lat: 34.3931, lng: 132.4574 },
    { name: '横川', area: '横川', pref: '広島県広島市西区', lat: 34.3989, lng: 132.4399 },
    { name: '福山', area: '福山駅周辺', pref: '広島県福山市', lat: 34.4863, lng: 133.3622 },
    { name: '東広島', area: '西条・東広島', pref: '広島県東広島市', lat: 34.4268, lng: 132.7461 },
    { name: '呉', area: '呉駅周辺', pref: '広島県呉市', lat: 34.2494, lng: 132.5601 },

    // === 山口県 ===
    { name: '山口', area: '山口駅周辺', pref: '山口県山口市', lat: 34.1861, lng: 131.4706 },
    { name: '下関', area: '下関駅周辺', pref: '山口県下関市', lat: 33.9527, lng: 130.9241 },
    { name: '宇部', area: '宇部駅周辺', pref: '山口県宇部市', lat: 33.9509, lng: 131.2474 },
    { name: '防府', area: '防府駅周辺', pref: '山口県防府市', lat: 34.0524, lng: 131.5610 },

    // === 徳島県 ===
    { name: '徳島', area: '徳島駅周辺', pref: '徳島県徳島市', lat: 34.0693, lng: 134.5549 },
    { name: '鳴門', area: '鳴門駅周辺', pref: '徳島県鳴門市', lat: 34.1722, lng: 134.6136 },

    // === 香川県 ===
    { name: '高松', area: '高松駅・瓦町', pref: '香川県高松市', lat: 34.3401, lng: 134.0434 },
    { name: '丸亀', area: '丸亀駅周辺', pref: '香川県丸亀市', lat: 34.2817, lng: 133.7967 },

    // === 愛媛県 ===
    { name: '松山', area: '松山駅・大街道', pref: '愛媛県松山市', lat: 33.8395, lng: 132.7658 },
    { name: '今治', area: '今治駅周辺', pref: '愛媛県今治市', lat: 34.0665, lng: 132.9975 },
    { name: '新居浜', area: '新居浜駅周辺', pref: '愛媛県新居浜市', lat: 33.9600, lng: 133.3071 },

    // === 高知県 ===
    { name: '高知', area: '高知駅・帯屋町', pref: '高知県高知市', lat: 33.5597, lng: 133.5311 },
    { name: '南国', area: '後免・南国', pref: '高知県南国市', lat: 33.5715, lng: 133.6413 },

    // === 福岡県 ===
    { name: '博多', area: '博多駅周辺', pref: '福岡県福岡市博多区', lat: 33.5893, lng: 130.4208 },
    { name: '天神', area: '天神・大名', pref: '福岡県福岡市中央区', lat: 33.5904, lng: 130.3990 },
    { name: '中洲', area: '中洲・川端', pref: '福岡県福岡市博多区', lat: 33.5923, lng: 130.4075 },
    { name: '薬院', area: '薬院・今泉', pref: '福岡県福岡市中央区', lat: 33.5768, lng: 130.4060 },
    { name: '西新', area: '西新・藤崎', pref: '福岡県福岡市早良区', lat: 33.5847, lng: 130.3535 },
    { name: '姪浜', area: '姪浜', pref: '福岡県福岡市西区', lat: 33.5947, lng: 130.3357 },
    { name: '香椎', area: '香椎・千早', pref: '福岡県福岡市東区', lat: 33.6237, lng: 130.4388 },
    { name: '小倉', area: '小倉駅周辺', pref: '福岡県北九州市小倉北区', lat: 33.8834, lng: 130.8751 },
    { name: '黒崎', area: '黒崎駅周辺', pref: '福岡県北九州市八幡西区', lat: 33.8650, lng: 130.7592 },
    { name: '久留米', area: '久留米駅周辺', pref: '福岡県久留米市', lat: 33.3189, lng: 130.5076 },
    { name: '大牟田', area: '大牟田駅周辺', pref: '福岡県大牟田市', lat: 33.0241, lng: 130.4471 },
    { name: '飯塚', area: '飯塚駅周辺', pref: '福岡県飯塚市', lat: 33.6396, lng: 130.6910 },
    { name: '春日', area: '春日原・白木原', pref: '福岡県春日市', lat: 33.5264, lng: 130.4701 },

    // === 佐賀県 ===
    { name: '佐賀', area: '佐賀駅周辺', pref: '佐賀県佐賀市', lat: 33.2494, lng: 130.2988 },
    { name: '唐津', area: '唐津駅周辺', pref: '佐賀県唐津市', lat: 33.4461, lng: 129.9683 },

    // === 長崎県 ===
    { name: '長崎', area: '長崎駅・浜町', pref: '長崎県長崎市', lat: 32.7503, lng: 129.8777 },
    { name: '佐世保', area: '佐世保駅周辺', pref: '長崎県佐世保市', lat: 33.1740, lng: 129.7151 },
    { name: '諫早', area: '諫早駅周辺', pref: '長崎県諫早市', lat: 32.8440, lng: 130.0547 },

    // === 熊本県 ===
    { name: '熊本', area: '熊本駅・上通下通', pref: '熊本県熊本市', lat: 32.8031, lng: 130.7079 },
    { name: '熊本上通', area: '上通・下通アーケード', pref: '熊本県熊本市中央区', lat: 32.8046, lng: 130.7044 },
    { name: '八代', area: '八代駅周辺', pref: '熊本県八代市', lat: 32.5147, lng: 130.6043 },

    // === 大分県 ===
    { name: '大分', area: '大分駅周辺', pref: '大分県大分市', lat: 33.2382, lng: 131.6126 },
    { name: '別府', area: '別府駅周辺', pref: '大分県別府市', lat: 33.2846, lng: 131.4931 },
    { name: '中津', area: '中津駅周辺', pref: '大分県中津市', lat: 33.6027, lng: 131.1892 },

    // === 宮崎県 ===
    { name: '宮崎', area: '宮崎駅周辺', pref: '宮崎県宮崎市', lat: 31.9111, lng: 131.4239 },
    { name: '都城', area: '都城駅周辺', pref: '宮崎県都城市', lat: 31.7233, lng: 131.0590 },
    { name: '延岡', area: '延岡駅周辺', pref: '宮崎県延岡市', lat: 32.5827, lng: 131.6602 },

    // === 鹿児島県 ===
    { name: '鹿児島', area: '鹿児島中央駅周辺', pref: '鹿児島県鹿児島市', lat: 31.5966, lng: 130.5571 },
    { name: '天文館', area: '天文館', pref: '鹿児島県鹿児島市', lat: 31.5949, lng: 130.5559 },
    { name: '霧島', area: '国分・霧島', pref: '鹿児島県霧島市', lat: 31.7415, lng: 130.7585 },
    { name: '鹿屋', area: '鹿屋市周辺', pref: '鹿児島県鹿屋市', lat: 31.3786, lng: 130.8527 },

    // === 沖縄県 ===
    { name: '那覇', area: '那覇・国際通り', pref: '沖縄県那覇市', lat: 26.2124, lng: 127.6809 },
    { name: '牧志', area: '牧志・国際通り', pref: '沖縄県那覇市', lat: 26.2166, lng: 127.6877 },
    { name: '浦添', area: '浦添・てだこ浦西', pref: '沖縄県浦添市', lat: 26.2457, lng: 127.7214 },
    { name: '宜野湾', area: '宜野湾・コザ', pref: '沖縄県宜野湾市', lat: 26.2813, lng: 127.7791 },
    { name: '沖縄市', area: '沖縄市・コザ', pref: '沖縄県沖縄市', lat: 26.3312, lng: 127.8092 },
    { name: '名護', area: '名護市周辺', pref: '沖縄県名護市', lat: 26.5913, lng: 127.9780 },
  ];

  const restaurants = [];
  const storeSuffixes = ['駅前店', '北口店', '南口店', '東口店', '西口店', 'ロード店', '中央店', '本店', 'アーケード店', '商店街店'];

  for (const area of areas) {
    const isKanto = area.lat > 34.8 && area.lat < 37.2 && area.lng > 138.5 && area.lng < 141.5;
    const isWest = area.lng < 137.5;
    const isKyushu = area.lat < 34.0 && area.lng < 132.0;

    // チェーン店
    for (const chain of chains) {
      if (chain.kanto && !isKanto) continue;
      if (chain.west && !isWest) continue;
      if (chain.kyushu && !isKyushu) continue;

      const suffix = storeSuffixes[Math.floor(Math.random() * storeSuffixes.length)];
      const lat = area.lat + (Math.random() - 0.5) * 0.012;
      const lng = area.lng + (Math.random() - 0.5) * 0.012;
      const rating = Math.min(5.0, Math.max(2.5, chain.rBase + (Math.random() - 0.5) * chain.rRange));

      restaurants.push([
        `${chain.name} ${area.name}${suffix}`,
        chain.genre,
        chain.price,
        Math.round(rating * 100) / 100,
        lat,
        lng,
        area.area,
        `${area.pref} ${area.name}周辺`,
        chain.desc,
        chain.emoji,
      ]);
    }

    // 個人店（エリアごとに8〜12件）
    const localCount = 8 + Math.floor(Math.random() * 5);
    const usedNames = new Set();

    for (let i = 0; i < localCount; i++) {
      const template = localTemplates[i % localTemplates.length];
      const suffix = template.suffixes[Math.floor(Math.random() * template.suffixes.length)];

      let name;
      let tries = 0;
      do {
        const useAreaName = Math.random() < 0.25;
        const prefix = useAreaName
          ? area.name
          : namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
        name = `${prefix}${suffix}`;
        tries++;
      } while (usedNames.has(name) && tries < 20);
      usedNames.add(name);

      const [minP, maxP] = template.priceRange;
      const steps = Math.floor((maxP - minP) / 50);
      const price = minP + Math.floor(Math.random() * steps) * 50;
      const rating = Math.min(5.0, Math.max(2.0, template.rBase + (Math.random() - 0.5) * template.rRange));
      const lat = area.lat + (Math.random() - 0.5) * 0.015;
      const lng = area.lng + (Math.random() - 0.5) * 0.015;
      const desc = template.descs[Math.floor(Math.random() * template.descs.length)];

      restaurants.push([
        name,
        template.genre,
        price,
        Math.round(rating * 100) / 100,
        lat,
        lng,
        area.area,
        `${area.pref} ${area.name}周辺`,
        desc,
        template.emoji,
      ]);
    }
  }

  console.log(`Generating ${restaurants.length} restaurants...`);

  // バッチ並列挿入（20件ずつ並列）
  const BATCH_SIZE = 20;
  let count = 0;
  for (let i = 0; i < restaurants.length; i += BATCH_SIZE) {
    const batch = restaurants.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(r =>
      sql`INSERT INTO restaurants (name, genre, price, rating, lat, lng, area, address, description, emoji)
          VALUES (${r[0]}, ${r[1]}, ${r[2]}, ${r[3]}, ${r[4]}, ${r[5]}, ${r[6]}, ${r[7]}, ${r[8]}, ${r[9]})`
    ));
    count += batch.length;
    if (count % 1000 === 0 || count >= restaurants.length) {
      console.log(`${count}/${restaurants.length}件登録中...`);
    }
  }

  console.log(`✅ ${count}件の店舗データをDBに登録しました！`);
}

seed().catch(console.error);
