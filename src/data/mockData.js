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
    description: "牛めし並盛450円. 24시간 영업으로 심야 이용 가능. 미소시루 무료 서비스."
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
    tags: ["一人OK", "深夜営業", "立ち食이"],
    reviews: 95,
    image: "🍜",
    description: "카케소바 380엔부터. 아침 소바 세트가 인기. 텐푸라 토핑도 저렴."
  },
  {
    id: 3,
    name: "やよい軒 池袋店",
    nameKr: "야요이켄 이케부쿠로점",
    genre: "定식",
    price: 750,
    rating: 3.48,
    lat: 35.7295,
    lng: 139.7109,
    area: "池袋",
    address: "東京都豊島区東池袋1-23-1",
    tags: ["밥 무한리필", "一人OK", "定식"],
    reviews: 203,
    image: "🍱",
    description: "쇼가야키 정식 750엔. 밥 무한리필이 최대 매력. 야채도 듬뿍."
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

// 핫딜 데이터 (Amazon 어소시에이트 연동)
export const deals = [
  {
    id: 1,
    title: "Amazon LAKURAKU 생수 (2L x 9병)",
    originalPrice: 1500,
    dealPrice: 880,
    discount: 41,
    source: "Amazon.co.jp",
    sourceIcon: "🛒",
    category: "생필품",
    expiresAt: "2026-05-30",
    likes: 342,
    comments: 28,
    author: "할인명탐정",
    createdAt: "2026-04-05T09:00:00",
    isHot: true,
    description: "1병당 90엔대! 무거운 생수도 집 앞까지 무료 배송. 정기 구독 시 추가 할인.",
    affiliate_url: "https://www.amazon.co.jp/dp/B07JJL1T6T?tag=amazon0ff1f1-20"
  },
  {
    id: 2,
    title: "닛신 컵누들 20개 박스세트",
    originalPrice: 4500,
    dealPrice: 2980,
    discount: 33,
    source: "Amazon.co.jp",
    sourceIcon: "🍜",
    category: "식품",
    expiresAt: "2026-05-15",
    likes: 567,
    comments: 45,
    author: "라면고수",
    createdAt: "2026-04-06T12:00:00",
    isHot: true,
    description: "개당 150엔 꼴! 편의점보다 저렴한 비상식량. 자취생 필수 아이템.",
    affiliate_url: "https://www.amazon.co.jp/dp/B002P67WY4?tag=amazon0ff1f1-20"
  },
  {
    id: 3,
    title: "에리에르 화장지 12롤 x 6팩 (벌크)",
    originalPrice: 4000,
    dealPrice: 2480,
    discount: 38,
    source: "Amazon.co.jp",
    sourceIcon: "🛒",
    category: "생필품",
    expiresAt: "2026-06-01",
    likes: 891,
    comments: 102,
    author: "살림왕",
    createdAt: "2026-04-07T09:30:00",
    isHot: false,
    description: "벌크 구매로 생활비 절약! 부드러운 품질과 압도적 가성비.",
    affiliate_url: "https://www.amazon.co.jp/dp/B07BHKZFFG?tag=amazon0ff1f1-20"
  },
  {
    id: 4,
    title: "Anker 고속 충전기 20W",
    originalPrice: 2500,
    dealPrice: 1780,
    discount: 29,
    source: "Amazon.co.jp",
    sourceIcon: "🛒",
    category: "가전",
    expiresAt: "2026-04-30",
    likes: 1204,
    comments: 89,
    author: "IT매니아",
    createdAt: "2026-04-08T14:20:00",
    isHot: true,
    description: "작지만 강력한 성능. 여행 필수템 가성비 충전기.",
    affiliate_url: "https://www.amazon.co.jp/dp/B08P59N6S2?tag=amazon0ff1f1-20"
  }
];

// 카테고리 목록
export const categories = [
  { id: "all", label: "모든", icon: "📋" },
  { id: "자유", label: "자유", icon: "💬" },
  { id: "절약술", label: "절약술", icon: "💰" },
  { id: "생필품", label: "생필품", icon: "🛒" },
  { id: "식품", label: "식품", icon: "🍜" },
  { id: "가먼", label: "가전", icon: "🔌" }
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
  "一人OK", "深夜営業", "24時間", "大盛り無料", "밥 무한리필"
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
