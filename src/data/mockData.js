// 도쿄 중심 가성비 식당 데이터
export const restaurants = [
  {
    id: 1,
    name: "松屋 新宿大ガード店",
    genre: "牛丼", price: 400, rating: 3.8,
    lat: 35.6934, lng: 139.6999,
    area: "新宿", address: "東京都新宿区新宿7-10-19",
    tags: ["一人OK", "深夜営業"], reviews: 128,
    image: "🥩", emoji: "🥩",
    description: "新宿西口すぐ。いつでも安い牛めし。"
  },
  {
    id: 2,
    name: "ガスト 新宿靖国通店",
    genre: "ファミレス", price: 600, rating: 3.9,
    lat: 35.6942, lng: 139.7028,
    area: "新宿", address: "東京都新宿区歌舞伎町1-1-17",
    tags: ["ドリンクバー", "家族向け"], reviews: 210,
    image: "🍽️", emoji: "🍽️",
    description: "コスパ最強のハンバーグとドリンクバー。"
  },
  {
    id: 3,
    name: "名代 富士そば 渋谷下田ビル店",
    genre: "そば・うどん", price: 400, rating: 4.0,
    lat: 35.6591, lng: 139.7001,
    area: "渋谷", address: "東京都渋谷区宇田川町28-4",
    tags: ["立ち食い", "24時間"], reviews: 203,
    image: "🍜", emoji: "🍜",
    description: "渋谷センター街近く、24時間営業の立ち食いそば。"
  },
  {
    id: 4,
    name: "サイゼリヤ 渋谷東急ハンズ前店",
    genre: "イタリアン", price: 500, rating: 4.2,
    lat: 35.6616, lng: 139.6983,
    area: "渋谷", address: "東京都渋谷区宇田川町39-8",
    tags: ["ワイン", "コスパ"], reviews: 312,
    image: "🍕", emoji: "🍕",
    description: "ミラノ風ドリア300円の最強コスパ。ワインも安い。"
  },
  {
    id: 5,
    name: "日高屋 秋葉原駅南店",
    genre: "中華", price: 500, rating: 3.7,
    lat: 35.6982, lng: 139.7749,
    area: "秋葉原", address: "東京都千代田区神田佐久間町1-16",
    tags: ["中華", "ちょい飲み"], reviews: 91,
    image: "🥟", emoji: "🥟",
    description: "中華そば390円。仕事終わりのちょい飲みに最適。"
  },
  {
    id: 6,
    name: "名物 すた丼の屋 秋葉原店",
    genre: "定食", price: 730, rating: 4.1,
    lat: 35.7005, lng: 139.7733,
    area: "秋葉原", address: "東京都千代田区外神田3-2-12",
    tags: ["大盛り", "ガッツリ"], reviews: 145,
    image: "🍚", emoji: "🍚",
    description: "ニンニク醤油がガツンと効いた豚肉丼。ボリューム満点。"
  },
  {
    id: 7,
    name: "カレーは飲み物。 御徒町店",
    genre: "カレー", price: 890, rating: 4.0,
    lat: 35.7061, lng: 139.7744,
    area: "上野", address: "東京都台東区上野3-23-11",
    tags: ["カレー", "黒カレー"], reviews: 178,
    image: "🍛", emoji: "🍛",
    description: "店名に恥じないボリュームと濃厚さ。黒カレーがおすすめ。"
  },
  {
    id: 8,
    name: "中華蕎麦 とみ田 (東京駅)",
    genre: "ラーメン", price: 950, rating: 4.5,
    lat: 35.6812, lng: 139.7671,
    area: "東京駅", address: "東京都千代田区丸の内1-9-1",
    tags: ["名店", "つけ麺"], reviews: 512,
    image: "🍜", emoji: "🍜",
    description: "東京駅直結で味わえる名店の味。やや高いが価値あり。"
  },
  {
    id: 9,
    name: "餃子の王将 池袋東口店",
    genre: "中華", price: 600, rating: 4.1,
    lat: 35.7303, lng: 139.7121,
    area: "池袋", address: "東京都豊島区南池袋2-27-5",
    tags: ["餃子", "チャーハン"], reviews: 267,
    image: "🥟", emoji: "🥟",
    description: "餃子とチャーハンの黄金セット最強。"
  },
  {
    id: 10,
    name: "鳥貴族 池袋東口店",
    genre: "焼き鳥", price: 360, rating: 4.0,
    lat: 35.7299, lng: 139.7135,
    area: "池袋", address: "東京都豊島区東池袋1-14-12",
    tags: ["均一価格", "飲み放題"], reviews: 189,
    image: "🍗", emoji: "🍗",
    description: "全品均一価格。貴族焼のボリュームがすごい。"
  },
  {
    id: 11,
    name: "すき家 渋谷井の頭通店",
    genre: "牛丼", price: 400, rating: 3.8,
    lat: 35.6606, lng: 139.6984,
    area: "渋谷", address: "東京都渋谷区宇田川町33-1",
    tags: ["一人OK", "テイクアウト"], reviews: 312,
    image: "🥩", emoji: "🥩",
    description: "種類豊富な牛丼と朝定食が魅力。"
  },
  {
    id: 12,
    name: "吉野家 秋葉原店",
    genre: "牛丼", price: 420, rating: 3.9,
    lat: 35.6985, lng: 139.7731,
    area: "秋葉原", address: "東京都千代田区外神田1-15-4",
    tags: ["一人OK", "24時間"], reviews: 145,
    image: "🥩", emoji: "🥩",
    description: "早い、安い、うまい。定番の味。"
  },
  {
    id: 13,
    name: "はなまるうどん 新宿東口店",
    genre: "うどん", price: 350, rating: 4.0,
    lat: 35.6917, lng: 139.7029,
    area: "新宿", address: "東京都新宿区新宿3-21-2",
    tags: ["セルフ", "安い"], reviews: 178,
    image: "🍜", emoji: "🍜",
    description: "かけうどんが圧倒的な安さ。天ぷらも美味しい。"
  },
  {
    id: 14,
    name: "丸亀製麺 六本木店",
    genre: "うどん", price: 400, rating: 4.2,
    lat: 35.6631, lng: 139.7369,
    area: "六本木", address: "東京都港区六本木3-1-1",
    tags: ["打ち立て", "ネギ放題"], reviews: 234,
    image: "🍜", emoji: "🍜",
    description: "打ち立てのコシのあるうどん。ネギ乗せ放題。"
  },
  {
    id: 15,
    name: "天丼てんや 八重洲店",
    genre: "天丼", price: 560, rating: 4.0,
    lat: 35.6806, lng: 139.7690,
    area: "東京駅", address: "東京都中央区八重洲1-6-15",
    tags: ["天丼", "揚げたて"], reviews: 198,
    image: "🍤", emoji: "🍤",
    description: "揚げたての天丼がこの価格で食べられる奇跡。"
  },
  {
    id: 16,
    name: "バーミヤン 上野駅前店",
    genre: "中華", price: 700, rating: 3.8,
    lat: 35.7107, lng: 139.7766,
    area: "上野", address: "東京都台東区上野7-2-16",
    tags: ["ファミレス", "中華"], reviews: 156,
    image: "🥟", emoji: "🥟",
    description: "本格的な中華がファミレス価格で楽しめる。"
  },
  {
    id: 17,
    name: "ジョイフル 京都伏見店",
    genre: "ファミレス", price: 550, rating: 3.9,
    lat: 34.9351, lng: 135.7502,
    area: "京都", address: "京都府京都市伏見区下鳥羽浄春ヶ前町111",
    tags: ["24時間", "ファミレス"], reviews: 167,
    image: "🍽️", emoji: "🍽️",
    description: "西日本発祥の超絶コスパファミレス。24時間営業も多い。"
  },
  {
    id: 18,
    name: "スシロー 梅田茶屋町店",
    genre: "寿司", price: 120, rating: 4.1,
    lat: 34.7061, lng: 135.4988,
    area: "梅田", address: "大阪府大阪市北区茶屋町16-1",
    tags: ["回転寿司", "安い"], reviews: 489,
    image: "🍣", emoji: "🍣",
    description: "100円台から食べられる回転寿司の王者。"
  },
  {
    id: 19,
    name: "くら寿司 難波店",
    genre: "寿司", price: 125, rating: 4.0,
    lat: 34.6644, lng: 135.5015,
    area: "難波", address: "大阪府大阪市中央区難波3-1-27",
    tags: ["回転寿司", "びっくらポン"], reviews: 412,
    image: "🍣", emoji: "🍣",
    description: "びっくらポンが楽しい。サイドメニューも充実。"
  },
  {
    id: 20,
    name: "やよい軒 名古屋駅前店",
    genre: "定食", price: 850, rating: 4.1,
    lat: 35.1709, lng: 136.8815,
    area: "名古屋", address: "愛知県名古屋市中村区名駅4-26-25",
    tags: ["ご飯おかわり自由", "定食"], reviews: 234,
    image: "🍚", emoji: "🍚",
    description: "ご飯おかわり自由が最高。お腹いっぱい食べられる。"
  },
  {
    id: 21,
    name: "なか卯 札幌駅地下街店",
    genre: "丼ぶり・うどん", price: 450, rating: 3.8,
    lat: 43.0686, lng: 141.3508,
    area: "札幌", address: "北海道札幌市中央区北5条西3丁目",
    tags: ["親子丼", "うどん"], reviews: 145,
    image: "🥚", emoji: "🥚",
    description: "親子丼とハイカラうどんセットが神コスパ。"
  },
  {
    id: 22,
    name: "ココイチ 福岡天神店",
    genre: "カレー", price: 800, rating: 4.2,
    lat: 33.5898, lng: 130.3986,
    area: "天神", address: "福岡県福岡市中央区天神2-4-20",
    tags: ["カスタマイズ", "カレー"], reviews: 312,
    image: "🍛", emoji: "🍛",
    description: "カスタマイズ自由なカレーチェーンの王者。"
  },
  {
    id: 23,
    name: "リンガーハット 仙台駅前店",
    genre: "ちゃんぽん", price: 750, rating: 4.0,
    lat: 38.2601, lng: 140.8800,
    area: "仙台", address: "宮城県仙台市青葉区中央1-8-22",
    tags: ["野菜たっぷり", "ちゃんぽん"], reviews: 189,
    image: "🍜", emoji: "🍜",
    description: "野菜たっぷりちゃんぽん。麺増量無料の店舗も健在。"
  },
  {
    id: 24,
    name: "かつや 川崎駅前店",
    genre: "とんかつ", price: 590, rating: 4.3,
    lat: 35.5312, lng: 139.7031,
    area: "川崎", address: "神奈川県川崎市川崎区駅前本町3-1",
    tags: ["カツ丼", "サクサク"], reviews: 267,
    image: "🐷", emoji: "🐷",
    description: "カツ丼梅が500円台。サクサクの品質が高い。"
  },
  {
    id: 25,
    name: "餃子の満洲 所沢東口店",
    genre: "中華", price: 500, rating: 4.1,
    lat: 35.7951, lng: 139.4754,
    area: "所沢", address: "埼玉県所沢市くすのき台1-14-5",
    tags: ["餃子", "埼玉"], reviews: 198,
    image: "🥟", emoji: "🥟",
    description: "「3割うまい!!」埼玉を中心に展開するコスパ中華。"
  }
];

// 커뮤니티 게시글 데이터
export const communityPosts = [
  {
    id: 1,
    category: "자유",
    title: "도쿄역 주변에서 런치 500엔 이하 있어?",
    author: "절약마스터",
    content: "출장으로 도쿄역 쓰는데 매번 편의점만... 500엔 이하로 제대로 먹을 수 있는 곳!",
    comments: 23,
    likes: 45,
    createdAt: "2026-04-05T10:30:00",
    isHot: true
  }
];

// Amazon アソシエイト ホットディール（12種）
export const deals = [
  {
    id: 1,
    source: "Amazon.co.jp", sourceIcon: "💧", category: "飲料",
    title: "サントリー 天然水 2L×9本（ラベルレス）",
    description: "Amazon売れ筋ランキング1位の定番ミネラルウォーター。ラベルなしでゴミ分別が楽々。箱買いでさらにお得！",
    originalPrice: 1780, dealPrice: 1280, discount: 28,
    author: "節約主婦", createdAt: "2026-04-10T09:00:00", expiresAt: "2026-06-30",
    likes: 342, comments: 28, isHot: true,
    affiliate_url: "https://www.amazon.co.jp/s?k=サントリー+天然水+2L+9本+ラベルレス&tag=amazon0ff1f1-20"
  },
  {
    id: 2,
    source: "Amazon.co.jp", sourceIcon: "🍜", category: "食品",
    title: "日清 カップヌードル 78g × 20個入りまとめ買い",
    description: "国民的カップラーメンをまとめ買い！保存食・非常食にも最適。1個あたり約110円と圧倒的コスパ。",
    originalPrice: 2980, dealPrice: 2200, discount: 26,
    author: "麺好き", createdAt: "2026-04-10T10:00:00", expiresAt: "2026-06-30",
    likes: 567, comments: 45, isHot: true,
    affiliate_url: "https://www.amazon.co.jp/s?k=日清+カップヌードル+まとめ買い+20個&tag=amazon0ff1f1-20"
  },
  {
    id: 3,
    source: "Amazon.co.jp", sourceIcon: "🧻", category: "日用品",
    title: "スコッティ 3倍長持ちトイレットロール 12ロール",
    description: "通常の3倍長持ちするからストック場所も節約！大容量パックでコスパ最強のトイレットペーパー。",
    originalPrice: 1680, dealPrice: 1180, discount: 30,
    author: "節約マスター", createdAt: "2026-04-10T11:00:00", expiresAt: "2026-07-31",
    likes: 891, comments: 102, isHot: false,
    affiliate_url: "https://www.amazon.co.jp/s?k=スコッティ+3倍+トイレットペーパー+12ロール&tag=amazon0ff1f1-20"
  },
  {
    id: 4,
    source: "Amazon.co.jp", sourceIcon: "🧺", category: "日用品",
    title: "アタック ZERO 詰め替え用 超特大 1.35kg",
    description: "洗浄力No.1の人気洗濯洗剤。詰め替え超特大サイズで1回分のコストをとことん削減！",
    originalPrice: 1980, dealPrice: 1380, discount: 30,
    author: "洗濯職人", createdAt: "2026-04-10T12:00:00", expiresAt: "2026-07-31",
    likes: 312, comments: 18, isHot: true,
    affiliate_url: "https://www.amazon.co.jp/s?k=アタックZERO+詰め替え+超特大&tag=amazon0ff1f1-20"
  },
  {
    id: 5,
    source: "Amazon.co.jp", sourceIcon: "⚡", category: "家電",
    title: "Anker Nano USB-C 充電器 20W（PD対応）",
    description: "スマホを超高速充電！Anker最小クラスのUSB-C充電器。iPhone・Android両対応で旅行にも最適。",
    originalPrice: 1990, dealPrice: 1490, discount: 25,
    author: "ガジェット好き", createdAt: "2026-04-10T13:00:00", expiresAt: "2026-12-31",
    likes: 1204, comments: 89, isHot: true,
    affiliate_url: "https://www.amazon.co.jp/s?k=Anker+Nano+USB-C+20W+充電器&tag=amazon0ff1f1-20"
  },
  {
    id: 6,
    source: "Amazon.co.jp", sourceIcon: "🍚", category: "食品",
    title: "秋田県産 あきたこまち 5kg（令和産）",
    description: "もちもちした食感で人気の秋田こまち。重い米も自宅まで配送！毎日のご飯を美味しく節約。",
    originalPrice: 3280, dealPrice: 2680, discount: 18,
    author: "ご飯命", createdAt: "2026-04-10T14:00:00", expiresAt: "2026-06-30",
    likes: 421, comments: 31, isHot: false,
    affiliate_url: "https://www.amazon.co.jp/s?k=あきたこまち+5kg+令和&tag=amazon0ff1f1-20"
  },
  {
    id: 7,
    source: "Amazon.co.jp", sourceIcon: "☕", category: "食品",
    title: "ネスカフェ エクセラ 詰め替え用 60g×2袋セット",
    description: "深みとコクが魅力のエクセラ。詰め替え2袋セットでコーヒー代を大幅節約。1杯あたり約25円！",
    originalPrice: 1480, dealPrice: 1080, discount: 27,
    author: "カフェ難民", createdAt: "2026-04-10T15:00:00", expiresAt: "2026-06-30",
    likes: 256, comments: 24, isHot: true,
    affiliate_url: "https://www.amazon.co.jp/s?k=ネスカフェ+エクセラ+詰め替え+60g+2袋&tag=amazon0ff1f1-20"
  },
  {
    id: 8,
    source: "Amazon.co.jp", sourceIcon: "🫧", category: "日用品",
    title: "キュキュット 食器用洗剤 詰め替え 大容量 1380ml",
    description: "油汚れに強いキュキュット！大容量詰め替えでコスト削減。泡切れが良く、手肌にも優しい。",
    originalPrice: 1100, dealPrice: 780, discount: 29,
    author: "お皿ピカピカ", createdAt: "2026-04-10T16:00:00", expiresAt: "2026-07-31",
    likes: 198, comments: 12, isHot: false,
    affiliate_url: "https://www.amazon.co.jp/s?k=キュキュット+詰め替え+大容量+1380ml&tag=amazon0ff1f1-20"
  },
  {
    id: 9,
    source: "Amazon.co.jp", sourceIcon: "🍟", category: "食品",
    title: "カルビー じゃがりこ チーズ 60g×12個入り",
    description: "サクサク食感でやみつきになるじゃがりこ！まとめ買いで1個あたり130円以下のコスパ最強スナック。",
    originalPrice: 2180, dealPrice: 1580, discount: 28,
    author: "おやつ番長", createdAt: "2026-04-10T17:00:00", expiresAt: "2026-06-30",
    likes: 389, comments: 27, isHot: true,
    affiliate_url: "https://www.amazon.co.jp/s?k=カルビー+じゃがりこ+12個+まとめ買い&tag=amazon0ff1f1-20"
  },
  {
    id: 10,
    source: "Amazon.co.jp", sourceIcon: "🍫", category: "食品",
    title: "明治 ザ・チョコレート 各種 5枚×5種 セット",
    description: "本格カカオの贅沢チョコレート。ギフトにも普段使いにも最適。まとめ買いで1枚約100円！",
    originalPrice: 1980, dealPrice: 1480, discount: 25,
    author: "チョコ愛好家", createdAt: "2026-04-10T17:30:00", expiresAt: "2026-06-30",
    likes: 212, comments: 15, isHot: false,
    affiliate_url: "https://www.amazon.co.jp/s?k=明治+ザチョコレート+5枚+セット&tag=amazon0ff1f1-20"
  },
  {
    id: 11,
    source: "Amazon.co.jp", sourceIcon: "🧼", category: "日用品",
    title: "ビオレu 手指の消毒用アルコール 本体+詰め替えセット",
    description: "花王の定番ハンドソープ。アルコール消毒タイプで除菌力もバッチリ。本体＋詰め替えセットがお得！",
    originalPrice: 1480, dealPrice: 1080, discount: 27,
    author: "清潔第一", createdAt: "2026-04-10T18:00:00", expiresAt: "2026-08-31",
    likes: 145, comments: 9, isHot: false,
    affiliate_url: "https://www.amazon.co.jp/s?k=ビオレu+手指+消毒+アルコール+詰め替え&tag=amazon0ff1f1-20"
  },
  {
    id: 12,
    source: "Amazon.co.jp", sourceIcon: "📺", category: "家電",
    title: "Amazon Fire TV Stick 4K（第2世代）リモコン付き",
    description: "Prime Video・Netflix・YouTube・TVerが大画面で楽しめる！テレビをスマートTVに変えるコスパ最強デバイス。",
    originalPrice: 8980, dealPrice: 4980, discount: 44,
    author: "ストリーミング通", createdAt: "2026-04-10T18:30:00", expiresAt: "2026-12-31",
    likes: 567, comments: 42, isHot: true,
    affiliate_url: "https://www.amazon.co.jp/s?k=Fire+TV+Stick+4K+第2世代&tag=amazon0ff1f1-20"
  }
];

// 카테고리 목록
export const categories = [
  { id: "all", label: "모든", icon: "📋" },
  { id: "자유", label: "자유", icon: "💬" },
  { id: "절약술", label: "절약술", icon: "💰" },
  { id: "생필품", label: "생필품", icon: "🛒" },
  { id: "식품", label: "식품", icon: "🍜" },
  { id: "가전", label: "가전", icon: "🔌" }
];

// 장르 필터 목록
export const genres = [
  { id: "all", label: "모든", icon: "🍽️" },
  { id: "牛丼", label: "규동", icon: "🥩" },
  { id: "そば・うどん", label: "소바·우동", icon: "🍜" },
  { id: "定식", label: "정식", icon: "🍱" }
];

// 태그 리스트
export const reportTags = [
  "一人OK", "深夜営業", "24시간", "곱빼기 무료", "밥 무한리필"
];

// 닉네임 랜덤 생성용
export const randomNicknames = [
  "절약의 귀신", "빈소년", "원코인 사무라이", "최저가 헌터"
];

export const getRandomNickname = () => {
  return randomNicknames[Math.floor(Math.random() * randomNicknames.length)];
};

// 시간 포맷
export const formatTimeAgo = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "たった今";
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}日前`;
  return date.toLocaleDateString("ja-JP");
};
