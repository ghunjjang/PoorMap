// 도쿄 중심 가성비 식당 데이터 (타베로그 참고 기반 목데이터)
export const restaurants = [
  {
    id: 1,
    name: "松屋 新宿東口店",
    nameKr: "마츠야 신주쿠 히가시구치점",
    genre: "牛丼",
    price: 450,
    rating: 3.42,
    lat: 35.6925,
    lng: 139.7035,
    area: "新宿",
    address: "東京都新宿区新宿3-22-7",
    tags: ["一人OK", "深夜営業", "大盛り無料"],
    reviews: 128,
    image: "🥩",
    description: "牛めし並盛450円。24時間営業で深夜も利用可能。味噌汁無料サービスあり。"
  },
  {
    id: 2,
    name: "富士そば 渋谷店",
    nameKr: "후지소바 시부야점",
    genre: "そば・うどん",
    price: 380,
    rating: 3.35,
    lat: 35.6592,
    lng: 139.7006,
    area: "渋谷",
    address: "東京都渋谷区道玄坂1-3-1",
    tags: ["一人OK", "深夜営業", "立ち食い"],
    reviews: 95,
    image: "🍜",
    description: "かけそば380円から。朝そばセットが人気。天ぷらトッピングも格安。"
  },
  {
    id: 3,
    name: "やよい軒 池袋店",
    nameKr: "야요이켄 이케부쿠로점",
    genre: "定食",
    price: 750,
    rating: 3.48,
    lat: 35.7295,
    lng: 139.7109,
    area: "池袋",
    address: "東京都豊島区東池袋1-23-1",
    tags: ["ご飯おかわり無料", "一人OK", "定食"],
    reviews: 203,
    image: "🍱",
    description: "しょうが焼き定食750円。ご飯おかわり自由が最大の魅力。野菜もたっぷり。"
  },
  {
    id: 4,
    name: "日高屋 上野店",
    nameKr: "히다카야 우에노점",
    genre: "中華",
    price: 420,
    rating: 3.30,
    lat: 35.7130,
    lng: 139.7742,
    area: "上野",
    address: "東京都台東区上野6-16-7",
    tags: ["一人OK", "深夜営業", "中華"],
    reviews: 167,
    image: "🍜",
    description: "中華そば420円。半チャーハンセットでも650円。安定の味とコスパ。"
  },
  {
    id: 5,
    name: "すき家 秋葉原店",
    nameKr: "스키야 아키하바라점",
    genre: "牛丼",
    price: 430,
    rating: 3.28,
    lat: 35.6984,
    lng: 139.7731,
    area: "秋葉原",
    address: "東京都千代田区外神田1-15-16",
    tags: ["一人OK", "24時間", "テイクアウト"],
    reviews: 89,
    image: "🥩",
    description: "牛丼並盛430円。トッピングの種類が豊富。朝食メニューも充実。"
  },
  {
    id: 6,
    name: "かつや 品川店",
    nameKr: "카츠야 시나가와점",
    genre: "とんかつ",
    price: 594,
    rating: 3.38,
    lat: 35.6284,
    lng: 139.7388,
    area: "品川",
    address: "東京都港区港南2-16-3",
    tags: ["一人OK", "割引券", "テイクアウト"],
    reviews: 142,
    image: "🍖",
    description: "カツ丼(梅)594円。会計時に100円引きクーポンもらえる。"
  },
  {
    id: 7,
    name: "天丼てんや 東京駅店",
    nameKr: "텐동 텐야 도쿄역점",
    genre: "天ぷら",
    price: 560,
    rating: 3.45,
    lat: 35.6812,
    lng: 139.7671,
    area: "東京",
    address: "東京都千代田区丸の内1-9-1",
    tags: ["一人OK", "天丼", "コスパ最強"],
    reviews: 256,
    image: "🍤",
    description: "天丼560円。えび、いか、かぼちゃ、いんげんの本格天丼がワンコイン級。"
  },
  {
    id: 8,
    name: "ガスト 浅草雷門店",
    nameKr: "가스토 아사쿠사 카미나리몬점",
    genre: "ファミレス",
    price: 549,
    rating: 3.25,
    lat: 35.7114,
    lng: 139.7955,
    area: "浅草",
    address: "東京都台東区雷門2-17-8",
    tags: ["ドリンクバー", "Wi-Fi", "長居OK"],
    reviews: 78,
    image: "🍝",
    description: "日替わりランチ549円〜。ドリンクバー付きで長居もOK。"
  },
  {
    id: 9,
    name: "丸亀製麺 六本木ティーキューブ店",
    nameKr: "마루가메 세이멘 롯폰기점",
    genre: "うどん",
    price: 390,
    rating: 3.52,
    lat: 35.6627,
    lng: 139.7318,
    area: "六本木",
    address: "東京都港区六本木3-1-1",
    tags: ["セルフ", "一人OK", "うどん"],
    reviews: 312,
    image: "🍜",
    description: "かけうどん390円。打ちたて茹でたてのうどんを目の前で。天ぷらも安い。"
  },
  {
    id: 10,
    name: "餃子の王将 高田馬場店",
    nameKr: "교자노오쇼 타카다노바바점",
    genre: "中華",
    price: 319,
    rating: 3.40,
    lat: 35.7126,
    lng: 139.7036,
    area: "高田馬場",
    address: "東京都新宿区高田馬場2-14-2",
    tags: ["餃子", "一人OK", "炒飯"],
    reviews: 198,
    image: "🥟",
    description: "焼き餃子6個319円。チャーハン+餃子セットが最強コスパ。"
  },
  {
    id: 11,
    name: "CoCo壱番屋 中野店",
    nameKr: "코코이치방야 나카노점",
    genre: "カレー",
    price: 580,
    rating: 3.35,
    lat: 35.7057,
    lng: 139.6659,
    area: "中野",
    address: "東京都中野区中野5-52-15",
    tags: ["カレー", "一人OK", "トッピング豊富"],
    reviews: 145,
    image: "🍛",
    description: "ポークカレー580円。辛さ・ライス量・トッピングを自由にカスタマイズ。"
  },
  {
    id: 12,
    name: "幸楽苑 北千住店",
    nameKr: "코라쿠엔 키타센주점",
    genre: "ラーメン",
    price: 490,
    rating: 3.32,
    lat: 35.7487,
    lng: 139.8046,
    area: "北千住",
    address: "東京都足立区千住1-36-6",
    tags: ["ラーメン", "一人OK", "餃子セット"],
    reviews: 87,
    image: "🍜",
    description: "中華そば490円。驚きの低価格で本格ラーメンが楽しめる。"
  },
  {
    id: 13,
    name: "サイゼリヤ 吉祥寺店",
    nameKr: "사이제리야 키치죠지점",
    genre: "イタリアン",
    price: 500,
    rating: 3.38,
    lat: 35.7032,
    lng: 139.5797,
    area: "吉祥寺",
    address: "東京都武蔵野市吉祥寺本町1-8-3",
    tags: ["ワイン100円", "ドリア", "コスパ最強"],
    reviews: 421,
    image: "🍕",
    description: "ミラノ風ドリア300円、グラスワイン100円。イタリアンの価格破壊王。"
  },
  {
    id: 14,
    name: "なか卯 神田店",
    nameKr: "나카우 칸다점",
    genre: "丼もの",
    price: 490,
    rating: 3.33,
    lat: 35.6917,
    lng: 139.7710,
    area: "神田",
    address: "東京都千代田区内神田3-10-6",
    tags: ["親子丼", "一人OK", "うどんセット"],
    reviews: 110,
    image: "🍚",
    description: "親子丼490円。ふわとろ卵の親子丼は牛丼チェーンとは一線を画す味。"
  },
  {
    id: 15,
    name: "ゆで太郎 神保町店",
    nameKr: "유데타로 진보초점",
    genre: "そば",
    price: 370,
    rating: 3.36,
    lat: 35.6960,
    lng: 139.7574,
    area: "神保町",
    address: "東京都千代田区神田神保町1-18",
    tags: ["立ち食い", "朝そば", "一人OK"],
    reviews: 76,
    image: "🍜",
    description: "もりそば370円。朝そばセットは朝限定のお得メニュー。"
  },
  {
    id: 16,
    name: "鳥貴族 恵比寿店",
    nameKr: "토리키조쿠 에비스점",
    genre: "焼き鳥",
    price: 360,
    rating: 3.44,
    lat: 35.6467,
    lng: 139.7102,
    area: "恵比寿",
    address: "東京都渋谷区恵比寿西1-7-7",
    tags: ["全品均一", "飲み放題", "焼き鳥"],
    reviews: 189,
    image: "🍗",
    description: "全品360円均一。2本盛りで1本180円。ドリンクも360円で飲み放題プランあり。"
  },
  {
    id: 17,
    name: "吉野家 銀座店",
    nameKr: "요시노야 긴자점",
    genre: "牛丼",
    price: 468,
    rating: 3.30,
    lat: 35.6722,
    lng: 139.7649,
    area: "銀座",
    address: "東京都中央区銀座4-2-1",
    tags: ["牛丼", "24時間", "テイクアウト"],
    reviews: 156,
    image: "🥩",
    description: "牛丼並盛468円。銀座エリアでこの価格は驚異的。朝定食もおすすめ。"
  },
  {
    id: 18,
    name: "はなまるうどん お台場店",
    nameKr: "하나마루우동 오다이바점",
    genre: "うどん",
    price: 350,
    rating: 3.30,
    lat: 35.6268,
    lng: 139.7753,
    area: "お台場",
    address: "東京都港区台場1-7-1",
    tags: ["うどん", "天ぷら", "セルフ"],
    reviews: 63,
    image: "🍜",
    description: "かけ(小)350円。お台場の観光地価格の中でオアシス的存在。"
  }
];

// 커뮤니티 게시글 데이터
export const communityPosts = [
  {
    id: 1,
    category: "自由",
    title: "東京駅周辺でランチ500円以下ってある？",
    author: "節約マスター",
    content: "出張で東京駅使うんだけど、毎回コンビニばかり。500円以下でちゃんとしたランチ食べれる店知りたい！",
    comments: 23,
    likes: 45,
    createdAt: "2026-04-05T10:30:00",
    isHot: true
  },
  {
    id: 2,
    category: "節約術",
    title: "【神】サイゼリヤの最強コスパメニューまとめ",
    author: "サイゼ信者",
    content: "ミラノ風ドリア300円、辛味チキン300円、グラスワイン100円。1000円あれば大満足ディナーができる最強の組み合わせを紹介。",
    comments: 67,
    likes: 234,
    createdAt: "2026-04-04T18:20:00",
    isHot: true
  },
  {
    id: 3,
    category: "グルメ",
    title: "マジで美味い立ち食いそば屋ランキング（個人的）",
    author: "そばマニア",
    content: "1位: ゆで太郎（コスパ最強）\n2位: 富士そば（安定感）\n3位: 小諸そば（天ぷらが美味い）",
    comments: 34,
    likes: 89,
    createdAt: "2026-04-04T14:15:00",
    isHot: false
  },
  {
    id: 4,
    category: "社会人",
    title: "手取り20万で東京一人暮らし、食費を3万に抑える方法",
    author: "社畜の知恵",
    content: "自炊メイン+週2回だけ外食のルール。外食はすべて500円以下の店に限定。これで月3万達成できてる。",
    comments: 89,
    likes: 312,
    createdAt: "2026-04-03T22:00:00",
    isHot: true
  },
  {
    id: 5,
    category: "学生",
    title: "大学生におすすめ！学割が使えるチェーン店リスト",
    author: "貧乏学生",
    content: "丸亀製麺、すき家、松屋...学生証見せるだけで割引になる店を片っ端から調べてみた。",
    comments: 45,
    likes: 178,
    createdAt: "2026-04-03T16:40:00",
    isHot: false
  },
  {
    id: 6,
    category: "節約術",
    title: "コンビニより安い！業務スーパー神商品ベスト10",
    author: "業スーの民",
    content: "1kg冷凍うどん158円、1L紙パック牛乳138円...業務スーパーで買うべき商品まとめ。",
    comments: 56,
    likes: 267,
    createdAt: "2026-04-02T20:30:00",
    isHot: true
  },
  {
    id: 7,
    category: "自由",
    title: "新宿のワンコインランチまとめ作りたい",
    author: "新宿番長",
    content: "新宿で500円以内で食べられるランチ情報を集めてます。知ってる方いたら教えてください！",
    comments: 31,
    likes: 56,
    createdAt: "2026-04-02T12:10:00",
    isHot: false
  },
  {
    id: 8,
    category: "グルメ",
    title: "やよい軒のご飯おかわり自由は国宝級",
    author: "白米教",
    content: "750円の定食でご飯おかわり自由とかいう神サービス。3杯おかわりして実質1杯50円以下。",
    comments: 42,
    likes: 198,
    createdAt: "2026-04-01T19:45:00",
    isHot: true
  }
];

// 핫딜 데이터
export const deals = [
  {
    id: 1,
    title: "松屋 牛めし並盛 50円引きクーポン",
    originalPrice: 450,
    dealPrice: 400,
    discount: 11,
    source: "松屋アプリ",
    sourceIcon: "📱",
    category: "クーポン",
    expiresAt: "2026-04-10",
    likes: 342,
    comments: 28,
    author: "クーポン探偵",
    createdAt: "2026-04-05T09:00:00",
    isHot: true,
    description: "松屋公式アプリをダウンロードすると即もらえる50円引きクーポン。併用不可だけど登録するだけでOK。"
  },
  {
    id: 2,
    title: "すき家 朝定食 300円〜",
    originalPrice: 500,
    dealPrice: 300,
    discount: 40,
    source: "すき家",
    sourceIcon: "🏪",
    category: "キャンペーン",
    expiresAt: "2026-04-30",
    likes: 567,
    comments: 45,
    author: "朝活マン",
    createdAt: "2026-04-04T06:30:00",
    isHot: true,
    description: "朝5時〜11時限定。たまごかけご飯定食300円。味噌汁+おしんこ付き。"
  },
  {
    id: 3,
    title: "サイゼリヤ ランチドリンクバー無料キャンペーン",
    originalPrice: 110,
    dealPrice: 0,
    discount: 100,
    source: "サイゼリヤ",
    sourceIcon: "🍕",
    category: "キャンペーン",
    expiresAt: "2026-04-15",
    likes: 891,
    comments: 102,
    author: "サイゼ民",
    createdAt: "2026-04-03T12:00:00",
    isHot: true,
    description: "ランチメニュー注文でドリンクバー無料。11:00〜15:00限定。"
  },
  {
    id: 4,
    title: "丸亀製麺 うどん半額DAY（毎月1日）",
    originalPrice: 390,
    dealPrice: 195,
    discount: 50,
    source: "丸亀製麺",
    sourceIcon: "🍜",
    category: "定期セール",
    expiresAt: "2026-05-01",
    likes: 1204,
    comments: 89,
    author: "うどん大臣",
    createdAt: "2026-04-01T08:00:00",
    isHot: true,
    description: "毎月1日はかけうどん半額！行列覚悟だけど行く価値あり。"
  },
  {
    id: 5,
    title: "【楽天市場】冷凍弁当20食セット 5,980円（1食299円）",
    originalPrice: 12000,
    dealPrice: 5980,
    discount: 50,
    source: "楽天市場",
    sourceIcon: "🛒",
    category: "ネット通販",
    expiresAt: "2026-04-12",
    likes: 234,
    comments: 34,
    author: "通販師匠",
    createdAt: "2026-04-04T15:20:00",
    isHot: false,
    description: "1食299円で栄養バランス◎の冷凍弁当。レンチンだけで完成。一人暮らしの味方。"
  },
  {
    id: 6,
    title: "かつや 感謝祭カツ丼ワンコイン500円",
    originalPrice: 594,
    dealPrice: 500,
    discount: 16,
    source: "かつや",
    sourceIcon: "🍖",
    category: "キャンペーン",
    expiresAt: "2026-04-08",
    likes: 456,
    comments: 56,
    author: "カツ丼侍",
    createdAt: "2026-04-02T11:00:00",
    isHot: true,
    description: "年に数回の感謝祭。カツ丼が500円ぽっきり。100円引き券との併用は不可。"
  }
];

// 카테고리 목록
export const categories = [
  { id: "all", label: "すべて", icon: "📋" },
  { id: "自由", label: "自由", icon: "💬" },
  { id: "節約術", label: "節約術", icon: "💰" },
  { id: "社会人", label: "社会人", icon: "👔" },
  { id: "学生", label: "学生", icon: "🎓" },
  { id: "グルメ", label: "グルメ", icon: "🍽️" }
];

// 장르 필터 목록
export const genres = [
  { id: "all", label: "すべて", icon: "🍽️" },
  { id: "牛丼", label: "牛丼", icon: "🥩" },
  { id: "そば・うどん", label: "そば・うどん", icon: "🍜" },
  { id: "定食", label: "定食", icon: "🍱" },
  { id: "中華", label: "中華", icon: "🥟" },
  { id: "カレー", label: "カレー", icon: "🍛" },
  { id: "天ぷら", label: "天ぷら", icon: "🍤" },
  { id: "イタリアン", label: "イタリアン", icon: "🍕" },
  { id: "焼き鳥", label: "焼き鳥", icon: "🍗" },
  { id: "ラーメン", label: "ラーメン", icon: "🍜" },
  { id: "ファミレス", label: "ファミレス", icon: "🍝" }
];

// 태그 리스트
export const reportTags = [
  "一人OK", "深夜営業", "24時間", "大盛り無料", "ご飯おかわり無料",
  "テイクアウト", "立ち食い", "Wi-Fi", "コスパ最強", "現金のみ",
  "割引券", "学割", "セルフ", "ドリンクバー", "食べ放題", "飲み放題"
];

// 닉네임 랜덤 생성용
export const randomNicknames = [
  "節約の鬼", "貧乏グルメ王", "ワンコイン侍", "激安ハンター",
  "コスパの神", "牛丼マイスター", "ラーメン修行僧", "うどん仙人",
  "チェーン店博士", "割引クーポン探偵", "定食愛好家", "立ち食いの達人",
  "500円ランチ探検家", "業スーの民", "自炊挫折マン", "外食依存症",
  "レシート収集家", "タイムセール追跡者", "半額シール待ち人", "冷凍食品研究家"
];

export const getRandomNickname = () => {
  return randomNicknames[Math.floor(Math.random() * randomNicknames.length)];
};

// 시간 포맷
export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "たった今";
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}日前`;
  return date.toLocaleDateString("ja-JP");
};
