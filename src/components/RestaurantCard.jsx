import { useState } from 'react';
import './RestaurantCard.css';

export default function RestaurantCard({ restaurant, onClose }) {
  const [showReview, setShowReview] = useState(false);
  const [judgment, setJudgment] = useState(null);

  if (!restaurant) return null;

  const priceColor = restaurant.price <= 400 ? 'var(--color-cheap)' :
                     restaurant.price <= 600 ? 'var(--color-mid)' : 'var(--color-expensive)';

  return (
    <div className="restaurant-card animate-slide-up" id="restaurant-detail-card">
      <div className="rc-header">
        <div className="rc-emoji">{restaurant.image}</div>
        <div className="rc-header-info">
          <h3 className="rc-name">{restaurant.name}</h3>
          <div className="rc-meta">
            <span className="rc-area">📍 {restaurant.area}</span>
            <span className="rc-genre">{restaurant.genre}</span>
          </div>
        </div>
        <button className="rc-close" onClick={onClose} id="close-restaurant-card">✕</button>
      </div>

      <div className="rc-price-row">
        <span className="rc-price" style={{ color: priceColor }}>
          ¥{restaurant.price.toLocaleString()}
        </span>
        <div className="rc-rating">
          <span className="rc-rating-star">★</span>
          <span className="rc-rating-value">{restaurant.rating.toFixed(2)}</span>
          <span className="rc-rating-count">({restaurant.reviews}件)</span>
        </div>
      </div>

      <p className="rc-description">{restaurant.description}</p>

      <div className="rc-tags">
        {restaurant.tags.map((tag, i) => (
          <span key={i} className="chip">{tag}</span>
        ))}
      </div>

      <div className="rc-address">
        <span className="rc-address-icon">📮</span>
        <span>{restaurant.address}</span>
      </div>

      <div className="rc-actions">
        <button
          className={`rc-judge-btn ${judgment === 'good' ? 'active-good' : ''}`}
          onClick={() => setJudgment('good')}
          id="judge-good"
        >
          👍 安くて美味い！
        </button>
        <button
          className={`rc-judge-btn ${judgment === 'bad' ? 'active-bad' : ''}`}
          onClick={() => setJudgment('bad')}
          id="judge-bad"
        >
          👎 微妙...
        </button>
      </div>

      {judgment && (
        <div className="rc-judged animate-fade-in">
          ✅ 審判完了！ありがとうございます
        </div>
      )}

      <a
        className="rc-tabelog-link"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.name} ${restaurant.address}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        id="google-map-link"
      >
        🔗 Googleマップで詳細を見る
      </a>
    </div>
  );
}
