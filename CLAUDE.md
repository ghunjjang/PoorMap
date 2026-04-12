# PoorMap (貧乏マップ) — Project Context

## 프로젝트 개요
일본 도쿄 중심의 **가성비 식당 지도 + Amazon 어소시에이트 핫딜** 서비스.
일본 사용자 타겟. 서비스명: 貧乏マップ (빈보 맙푸 = "가난한 사람의 지도")

## 기술 스택
- **Frontend**: React 19 + Vite 8, React-Leaflet (Google Maps 타일), React Router v7
- **Backend**: Express 5, NeonDB (PostgreSQL), Vercel Serverless Functions
- **DB 환경변수**: `POSTGRES_URL` (Neon)
- **배포**: Vercel (`vercel.app`), 추후 `binbo-map.jp` 도메인 연결 고려 중

## 디렉토리 구조
```
/api/index.js          — Express 서버 (Vercel Serverless)
/server/migratePostgres.js — DB 마이그레이션 (SQLite→Postgres 완료)
/src/
  App.jsx              — 라우터 설정
  pages/
    MapPage.jsx        — 메인 지도 페이지
    CommunityPage.jsx  — 커뮤니티 게시판
    DealsPage.jsx      — Amazon 핫딜 페이지
    TermsPage.jsx / PrivacyPage.jsx
  components/
    ReportModal.jsx    — 식당 제보 모달
    GuideModal.jsx     — 첫 방문자 가이드 모달
    BottomNav.jsx      — 하단 탭 네비게이션
    PremiumBanner.jsx  — 프리미엄 배너
    AdBanner.jsx       — 광고 배너
    SupportBanner.jsx  — 서포트 배너
  data/mockData.js     — 로컬 목데이터 (DB로 전환 완료, 폴백용)
```

## API 엔드포인트
| Method | Path | 설명 |
|--------|------|------|
| GET | `/api/restaurants` | 전체 식당 목록 |
| POST | `/api/restaurants` | 식당 제보 등록 |
| GET | `/api/posts` | 커뮤니티 게시글 (최신순) |
| POST | `/api/posts` | 게시글 작성 |
| GET | `/api/deals` | 핫딜 목록 (최신순) |
| POST | `/api/deals/:id/like` | 딜 추천/비추천 (`type: 'plus'|'minus'`) |

## DB 테이블
- `restaurants`: id, name, genre, price, rating, lat, lng, area, address, description, emoji
- `posts`: id, category, title, author, content, createdAt, isHot
- `deals`: id, title, originalPrice, dealPrice, discount, source, category, expiresAt, likes, ...

## 핵심 비즈니스 로직
- **가격 필터**: ¥200~¥1500 슬라이더, 색상 코딩 (저렴=green, 중간=yellow, 비싼=red)
- **마커**: 가격 + 이모지 커스텀 마커, Google Maps 타일 사용
- **Amazon 어소시에이트**: 태그 `amazon0ff1f1-20`, Amazon.co.jp 링크
- **첫 방문 가이드**: `localStorage` `poor_map_visited` 키로 제어

## 타겟 시장 (일본)
- 통화: 엔화 (¥)
- 마케팅: X(트위터) #節約 #激安 #コスパ, 5ch, Yahoo! 知恵袋, PR TIMES
- UI 언어: 일본어 중심 (일부 한국어 혼재 → 점진적 일본어화 진행 중)
- 주요 식당 장르: 牛丼, そば・うどん, 定食, 中華, ファミレス, 寿司, 焼き鳥

## 환경변수
- `POSTGRES_URL` — Neon PostgreSQL 연결 문자열
- `VITE_API_URL` — API 베이스 URL (개발시 빈값이면 로컬, 배포시 Vercel URL)

## 주의사항
- DB 마이그레이션: SQLite → PostgreSQL 완료, `server/migratePostgres.js` 참고
- `mockData.js`의 데이터는 실제 DB로 이관 완료, 직접 수정 불필요
- Vercel Serverless: `api/index.js`에서 `export default app` (CommonJS X)
