import './AdBanner.css';

const adData = [
  {
    id: 'ad-food-delivery',
    title: '出前館',
    subtitle: '初回注文 50%OFF クーポン配布中！',
    cta: '今すぐ注文 →',
    color: '#e94560',
    icon: '🛵',
    link: '#'
  },
  {
    id: 'ad-credit-card',
    title: '楽天カード',
    subtitle: '新規入会で5,000ポイントプレゼント',
    cta: '詳細を見る →',
    color: '#00d2ff',
    icon: '💳',
    link: '#'
  },
  {
    id: 'ad-coupon-app',
    title: 'スマートニュース',
    subtitle: 'クーポン使い放題！毎日お得に食事',
    cta: 'ダウンロード →',
    color: '#ffd700',
    icon: '📱',
    link: '#'
  },
  {
    id: 'ad-amazon-budget',
    title: 'Amazon 가성비 샵',
    subtitle: '생활필수품부터 통조림까지 최대 40% 할인!',
    cta: '특가 확인하기 →',
    color: '#FF9900',
    icon: '📦',
    link: 'https://www.amazon.co.jp/b?node=2351230051&tag=amazon0ff1f1-20'
  }
];

export default function AdBanner({ variant = 'inline', adIndex = 0 }) {
  const ad = adData[adIndex % adData.length];

  if (variant === 'sticky-bottom') {
    return (
      <div className="ad-sticky-bottom glass" id="ad-sticky">
        <div className="ad-sticky-content">
          <span className="ad-sticky-icon">{ad.icon}</span>
          <div className="ad-sticky-text">
            <span className="ad-sticky-title">{ad.title}</span>
            <span className="ad-sticky-subtitle">{ad.subtitle}</span>
          </div>
          <a href={ad.link} className="ad-sticky-cta" style={{ background: ad.color }}>
            {ad.cta}
          </a>
        </div>
        <span className="ad-label">AD</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="ad-card card" id={`ad-card-${ad.id}`}>
        <span className="ad-label">PR</span>
        <div className="ad-card-content">
          <span className="ad-card-icon">{ad.icon}</span>
          <div className="ad-card-info">
            <span className="ad-card-title">{ad.title}</span>
            <span className="ad-card-subtitle">{ad.subtitle}</span>
          </div>
        </div>
        <a href={ad.link} className="btn-primary ad-card-cta">{ad.cta}</a>
      </div>
    );
  }

  // inline variant (between posts/deals)
  return (
    <div className="ad-inline" id={`ad-inline-${ad.id}`}>
      <span className="ad-label">広告</span>
      <div className="ad-inline-content" style={{ borderColor: `${ad.color}33` }}>
        <span className="ad-inline-icon">{ad.icon}</span>
        <div className="ad-inline-text">
          <span className="ad-inline-title">{ad.title} — {ad.subtitle}</span>
        </div>
        <a href={ad.link} className="ad-inline-cta" style={{ color: ad.color }}>
          {ad.cta}
        </a>
      </div>
    </div>
  );
}
