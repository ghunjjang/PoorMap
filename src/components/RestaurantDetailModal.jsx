import './RestaurantDetailModal.css';

export default function RestaurantDetailModal({ restaurant, onClose }) {
  if (!restaurant) return null;

  const r = restaurant;
  const isCheap = r.price <= 500;
  const isMid = r.price <= 800;
  const priceColor = isCheap ? 'var(--color-cheap)' : isMid ? 'var(--color-mid)' : 'var(--color-expensive)';
  const tags = r.tags ? (Array.isArray(r.tags) ? r.tags : r.tags.split(',').filter(Boolean)) : [];

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${r.name} ${r.address || r.area}`)}`;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-sheet" onClick={e => e.stopPropagation()}>
        <div className="detail-drag-handle" />

        {/* Header */}
        <div className="detail-header">
          <div className="detail-emoji">{r.image || r.emoji || '🍴'}</div>
          <div className="detail-header-info">
            <h2 className="detail-name">{r.name}</h2>
            <div className="detail-meta">
              <span className="detail-genre">{r.genre}</span>
              <span className="detail-area">📍 {r.area}</span>
            </div>
          </div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>

        {/* Price & Rating */}
        <div className="detail-stats">
          <div className="detail-stat-price" style={{ color: priceColor }}>
            <span className="detail-stat-label">目安価格</span>
            <span className="detail-stat-value">¥{r.price?.toLocaleString()}</span>
          </div>
          <div className="detail-stat-divider" />
          <div className="detail-stat">
            <span className="detail-stat-label">評価</span>
            <span className="detail-stat-value">
              ★{typeof r.rating === 'number' ? r.rating.toFixed(1) : r.rating}
            </span>
          </div>
          {r.reviews > 0 && (
            <>
              <div className="detail-stat-divider" />
              <div className="detail-stat">
                <span className="detail-stat-label">口コミ</span>
                <span className="detail-stat-value">{r.reviews}件</span>
              </div>
            </>
          )}
        </div>

        {/* Description */}
        {r.description && (
          <p className="detail-desc">{r.description}</p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="detail-tags">
            {tags.map((tag, i) => (
              <span key={i} className="detail-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Info Table */}
        <div className="detail-info-table">
          {r.hours && (
            <div className="detail-info-row">
              <span className="detail-info-icon">🕐</span>
              <span className="detail-info-label">営業時間</span>
              <span className="detail-info-value">{r.hours}</span>
            </div>
          )}
          {r.closed_day && (
            <div className="detail-info-row">
              <span className="detail-info-icon">📅</span>
              <span className="detail-info-label">定休日</span>
              <span className="detail-info-value">{r.closed_day}</span>
            </div>
          )}
          {r.address && (
            <div className="detail-info-row">
              <span className="detail-info-icon">🏠</span>
              <span className="detail-info-label">住所</span>
              <span className="detail-info-value">{r.address}</span>
            </div>
          )}
          {r.website && (
            <div className="detail-info-row">
              <span className="detail-info-icon">🌐</span>
              <span className="detail-info-label">ウェブサイト</span>
              <a
                className="detail-info-link"
                href={r.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                公式サイト
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="detail-actions">
          <a
            className="detail-btn-maps"
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            🗺️ Googleマップで見る
          </a>
          <a
            className="detail-btn-tweet"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${r.name}（${r.area}）の${r.genre}が神コスパ！✨\nなんと¥${r.price.toLocaleString()}で食べられる最強飯🍜\n\n#貧乏マップ #神コスパ #激安グルメ\nhttps://poor-map.vercel.app`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            𝕏 シェア
          </a>
          <button
            className="detail-btn-copy"
            onClick={() => {
              navigator.clipboard.writeText(`貧乏マップで発見！✨\n${r.name}（${r.area}）\n¥${r.price.toLocaleString()}でコスパ最高！🍜\nhttps://poor-map.vercel.app`);
              alert('URLをコピーしました！');
            }}
          >
            🔗 リンクをコピー
          </button>
        </div>
      </div>
    </div>
  );
}
