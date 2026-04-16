import { useState, useMemo, useEffect } from 'react';
import { deals, formatTimeAgo } from '../data/mockData';
import AdBanner from '../components/AdBanner';
import SimpleFooter from '../components/SimpleFooter';
import './DealsPage.css';

export default function DealsPage() {
  const [sortBy, setSortBy] = useState('latest');
  const [allDeals, setAllDeals] = useState(deals);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || '';
    fetch(`${apiBase}/api/deals`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const mapped = data.map(d => ({
          id: d.id,
          source: d.source || '',
          sourceIcon: d.sourceicon || d.sourceIcon || '🛒',
          category: d.category || '',
          title: d.title || '',
          description: d.description || '',
          originalPrice: Number(d.originalprice ?? d.originalPrice) || 0,
          dealPrice: Number(d.dealprice ?? d.dealPrice) || 0,
          discount: Number(d.discount) || 0,
          author: d.author || '',
          likes: Number(d.likes) || 0,
          comments: Number(d.comments) || 0,
          createdAt: d.createdat || d.createdAt || '',
          expiresAt: d.expiresat || d.expiresAt || '',
          isHot: Boolean(d.ishot ?? d.isHot),
          affiliate_url: d.affiliate_url || '',
        }));
        setAllDeals(mapped);
      })
      .catch(console.error);
  }, []);

  const sortedDeals = useMemo(() => {
    const sorted = [...allDeals];
    if (sortBy === 'latest') {
      sorted.sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tb - ta;
      });
    } else {
      sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return sorted;
  }, [allDeals, sortBy]);

  const handleLike = (id) => {
    setAllDeals(prev =>
      prev.map(d => d.id === id ? { ...d, likes: d.likes + 1 } : d)
    );
  };

  return (
    <div className="deals-page page-container" id="deals-page">
      {/* Header */}
      <header className="deals-header">
        <div className="deals-header-top">
          <h1 className="deals-title">
            <span>🔥</span>
            <span className="gradient-text">激安情報</span>
          </h1>
        </div>
        <p className="deals-subtitle">
          ユーザーが制報したお得な情報をチェック！
        </p>
      </header>

      {/* Sort Tabs */}
      <div className="deals-sort">
        <button
          className={`sort-btn ${sortBy === 'latest' ? 'sort-btn--active' : ''}`}
          onClick={() => setSortBy('latest')}
          id="sort-latest"
        >
          🕐 最新順
        </button>
        <button
          className={`sort-btn ${sortBy === 'popular' ? 'sort-btn--active' : ''}`}
          onClick={() => setSortBy('popular')}
          id="sort-popular"
        >
          🔥 人気順
        </button>
      </div>

      {/* Deals List */}
      <div className="deals-list">
        {sortedDeals.map((deal, idx) => (
          <div key={deal.id}>
            <article
              className="deal-card card"
              style={{ animationDelay: `${idx * 0.07}s` }}
              id={`deal-${deal.id}`}
            >
              {deal.isHot && <div className="deal-hot-badge">🔥 HOT</div>}

              <div className="deal-top">
                <div className="deal-source">
                  <span className="deal-source-icon">{deal.sourceIcon}</span>
                  <span className="deal-source-name">{deal.source}</span>
                </div>
                <span className="deal-category-badge">{deal.category}</span>
              </div>

              <h3 className="deal-title">{deal.title}</h3>

              <p className="deal-description">{deal.description}</p>

              <div className="deal-price-row">
                <div className="deal-prices">
                  {deal.originalPrice > deal.dealPrice && (
                    <span className="deal-original-price">¥{deal.originalPrice.toLocaleString()}</span>
                  )}
                  <span className="deal-current-price">
                    {deal.dealPrice === 0 ? '無料！' : `¥${deal.dealPrice.toLocaleString()}`}
                  </span>
                </div>
                <span className="deal-discount">-{deal.discount}%</span>
              </div>

              <div className="deal-footer">
                <div className="deal-meta">
                  <span className="deal-author">👤 {deal.author}</span>
                  <span className="deal-time">{formatTimeAgo(deal.createdAt)}</span>
                </div>
                <div className="deal-actions">
                  <a 
                    className="btn-primary" 
                    href={deal.affiliate_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '12px', padding: '6px 12px', textDecoration: 'none' }}
                    id={`affiliate-deal-${deal.id}`}
                  >
                    🔗 詳細を見る
                  </a>
                  <button
                    className="deal-like-btn"
                    onClick={() => handleLike(deal.id)}
                    id={`like-deal-${deal.id}`}
                  >
                    ❤️ {deal.likes}
                  </button>
                  <span className="deal-comment-count">💬 {deal.comments}</span>
                </div>
              </div>

              <div className="deal-expires">
                ⏰ {deal.expiresAt}まで
              </div>
            </article>
            {idx === 1 && <AdBanner variant="inline" adIndex={0} />}
            {idx === 3 && <AdBanner variant="inline" adIndex={2} />}
          </div>
        ))}

      </div>
      <SimpleFooter />
    </div>
  );
}
