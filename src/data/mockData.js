// 도쿄 중심 가성비 식당 데이터
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
    description: "牛め시並盛450円. 24시간 영업으로 심야 이용 가능. 미소시루 무료 서비스."
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
