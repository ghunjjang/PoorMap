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

// 핫딜 데이터 (Amazon 어소시에이트 연동 - 풍성한 12종 세트)
export const deals = [
  {
    id: 1,
    title: "[Amazon 브랜드] 천연수 2L x 9병 (라벨리스)",
    originalPrice: 1500,
    dealPrice: 1180,
    discount: 21,
    source: "Amazon.co.jp",
    sourceIcon: "🛒",
    category: "생필품",
    expiresAt: "2026-05-30",
    likes: 342,
    comments: 28,
    author: "할인명탐정",
    createdAt: "2026-04-05T09:00:00",
    isHot: true,
    description: "아마존 베스트셀러! 라벨이 없어 분리수거가 간편한 초가성비 생수입니다.",
    affiliate_url: "https://www.amazon.co.jp/dp/B08GZR18S3?tag=amazon0ff1f1-20"
  },
  {
    id: 2,
    title: "닛신 컵누들 78g x 20개입 (벌크)",
    originalPrice: 5000,
    dealPrice: 4400,
    discount: 12,
    source: "Amazon.co.jp",
    sourceIcon: "🍜",
    category: "식품",
    expiresAt: "2026-05-15",
    likes: 567,
    comments: 45,
    author: "라면고수",
    createdAt: "2026-04-06T12:00:00",
    isHot: true,
    description: "일본 국민 컵라면! 벌크 구매로 개당 가격을 낮춘 최강의 비상식량입니다.",
    affiliate_url: "https://www.amazon.co.jp/dp/B002P67WY4?tag=amazon0ff1f1-20"
  },
  {
    id: 3,
    title: "스코티 플라워 팩 화장지 12롤 (3배 더 긴 타입)",
    originalPrice: 1800,
    dealPrice: 1220,
    discount: 32,
    source: "Amazon.co.jp",
    sourceIcon: "🛒",
    category: "생필품",
    expiresAt: "2026-06-01",
    likes: 891,
    comments: 102,
    author: "살림왕",
    createdAt: "2026-04-07T09:30:00",
    isHot: false,
    description: "일반 롤보다 3배 길어 교체 주기와 보관 공간을 아껴주는 경제적인 제품입니다.",
    affiliate_url: "https://www.amazon.co.jp/dp/B085GDK3FH?tag=amazon0ff1f1-20"
  },
  {
    id: 4,
    title: "Anker PowerPort 2 Elite (24W 2포트 충전기)",
    originalPrice: 2000,
    dealPrice: 1580,
    discount: 21,
    source: "Amazon.co.jp",
    sourceIcon: "🔌",
    category: "가전",
    expiresAt: "2026-04-30",
    likes: 1204,
    comments: 89,
    author: "IT매니아",
    createdAt: "2026-04-08T14:20:00",
    isHot: true,
    description: "수만 개의 리뷰가 증명하는 스테디셀러 고속 충전기. 여행용으로도 최고입니다.",
    affiliate_url: "https://www.amazon.co.jp/dp/B06ZXXQGZ8?tag=amazon0ff1f1-20"
  },
  {
    id: 5,
    title: "아키타현산 아키타코마치 5kg (백미)",
    originalPrice: 3500,
    dealPrice: 2880,
    discount: 18,
    source: "Amazon.co.jp",
    sourceIcon: "🛒",
    category: "식품",
    expiresAt: "2026-05-20",
    likes: 421,
    comments: 31,
    author: "밥심",
    createdAt: "2026-04-08T15:00:00",
    isHot: true,
    description: "무거운 쌀도 집 앞까지 배송! 찰지고 맛있는 아키타코마치 햅쌀입니다.",
    affiliate_url: "https://www.amazon.co.jp/dp/B00G0N9HGE?tag=amazon0ff1f1-20"
  },
  {
    id: 6,
    title: "아タック ZERO 세탁세제 리필 대용량 1620g",
    originalPrice: 2200,
    dealPrice: 1480,
    discount: 33,
    source: "Amazon.co.jp",
    sourceIcon: "🛒",
    category: "생필품",
    expiresAt: "2026-06-15",
    likes: 312,
    comments: 18,
    author: "빨래왕",
    createdAt: "2026-04-08T16:00:00",
    isHot: false,
    description: "세정력이 뛰어난 어택 제로. 리필용 대용량으로 생활비를 절약하세요.",
    affiliate_url: "https://www.amazon.co.jp/dp/B08FBXWXYX?tag=amazon0ff1f1-20"
  },
  {
    id: 7,
    title: "큐큐토 주방세제 대용량 리필 1380ml",
    originalPrice: 1200,
    dealPrice: 780,
    discount: 35,
    source: "Amazon.co.jp",
    sourceIcon: "🛒",
    category: "생필품",
    expiresAt: "2026-07-01",
    likes: 198,
    comments: 12,
    author: "설거지인생",
    createdAt: "2026-04-08T16:30:00",
    isHot: true,
    description: "기름기 제거에 탁월한 큐큐토. 대용량 리필로 경제적입니다.",
    affiliate_url: "https://www.amazon.co.jp/dp/B07T99S7P4?tag=amazon0ff1f1-20"
  },
  {
    id: 8,
    title: "네스카페 엑셀라 180g (스틱/리필)",
    originalPrice: 1500,
    dealPrice: 1100,
    discount: 27,
    source: "Amazon.co.jp",
    sourceIcon: "☕",
    category: "식품",
    expiresAt: "2026-05-10",
    likes: 256,
    comments: 24,
    author: "카페인중독",
    createdAt: "2026-04-08T17:00:00",
    isHot: true,
    description: "깊고 진한 맛의 네스카페 엑셀라. 매일 마시는 커피도 가성비 있게!",
    affiliate_url: "https://www.amazon.co.jp/dp/B00G0N9HGE?tag=amazon0ff1f1-20"
  },
  {
    id: 9,
    title: "비오레 u 손세정제 리필 800ml x 2개",
    originalPrice: 1800,
    dealPrice: 1380,
    discount: 23,
    source: "Amazon.co.jp",
    sourceIcon: "🧼",
    category: "생필품",
    expiresAt: "2026-08-30",
    likes: 145,
    comments: 9,
    author: "청결매니아",
    createdAt: "2026-04-08T17:15:00",
    isHot: false,
    description: "온 가족이 사용하는 비오레 u. 2개 묶음 세트로 더욱 저렴합니다.",
    affiliate_url: "https://www.amazon.co.jp/dp/B07C3L6WJS?tag=amazon0ff1f1-20"
  },
  {
    id: 10,
    title: "가루비 포테토칩스우스시오지 60g x 12개입",
    originalPrice: 1900,
    dealPrice: 1480,
    discount: 22,
    source: "Amazon.co.jp",
    sourceIcon: "🍪",
    category: "식품",
    expiresAt: "2026-05-05",
    likes: 389,
    comments: 27,
    author: "과자중독",
    createdAt: "2026-04-08T17:30:00",
    isHot: true,
    description: "일본 국민 과자 가루비 포테토칩! 집에서 쟁여두고 먹기 좋습니다.",
    affiliate_url: "https://www.amazon.co.jp/dp/B07G31Z9RR?tag=amazon0ff1f1-20"
  },
  {
    id: 11,
    title: "메이지 밀크 초콜릿 50g x 10개입",
    originalPrice: 1500,
    dealPrice: 1200,
    discount: 20,
    source: "Amazon.co.jp",
    sourceIcon: "🍫",
    category: "식품",
    expiresAt: "2026-05-15",
    likes: 212,
    comments: 15,
    author: "초코덕후",
    createdAt: "2026-04-08T17:45:00",
    isHot: false,
    description: "부드럽고 달콤한 메이지 초콜릿. 간식용으로 박스 구매 추천!",
    affiliate_url: "https://www.amazon.co.jp/dp/B007R9S1F2?tag=amazon0ff1f1-20"
  },
  {
    id: 12,
    title: "Amazon 베이직 HDMI 케이블 1.8m",
    originalPrice: 1200,
    dealPrice: 880,
    discount: 27,
    source: "Amazon.co.jp",
    sourceIcon: "🔌",
    category: "가전",
    expiresAt: "2026-12-31",
    likes: 567,
    comments: 42,
    author: "가전전문가",
    createdAt: "2026-04-08T18:00:00",
    isHot: true,
    description: "믿고 쓰는 아마존 베이직! 고품질 HDMI 케이블을 저렴한 가격에 만나보세요.",
    affiliate_url: "https://www.amazon.co.jp/dp/B014I8SSD0?tag=amazon0ff1f1-20"
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
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
  return date.toLocaleDateString("ko-KR");
};
