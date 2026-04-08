import { useState } from 'react';
import './PremiumBanner.css';

export default function PremiumBanner() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="premium-banner card" id="premium-banner" onClick={() => setShowModal(true)}>
        <div className="pb-glow" />
        <div className="pb-content">
          <div className="pb-icon-wrap">
            <span className="pb-icon">👑</span>
          </div>
          <div className="pb-info">
            <h3 className="pb-title">貧乏マップ PRO</h3>
            <p className="pb-subtitle">広告非表示 + 限定機能が使い放題</p>
          </div>
          <span className="pb-price">¥300<span className="pb-period">/月</span></span>
        </div>
        <div className="pb-features">
          <span className="pb-feature">✅ 広告非表示</span>
          <span className="pb-feature">✅ 高度なフィルター</span>
          <span className="pb-feature">✅ お気に入り保存無制限</span>
          <span className="pb-feature">✅ 価格推移グラフ</span>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="premium-modal animate-scale-in" onClick={e => e.stopPropagation()} id="premium-modal">
            <button className="rc-close pm-close" onClick={() => setShowModal(false)}>✕</button>
            <div className="pm-header">
              <span className="pm-crown">👑</span>
              <h2 className="pm-title gradient-text">貧乏マップ PRO</h2>
              <p className="pm-desc">もっとお得に、もっと便利に。</p>
            </div>

            <div className="pm-plans">
              <div className="pm-plan">
                <span className="pm-plan-name">月額プラン</span>
                <span className="pm-plan-price">¥300<small>/月</small></span>
              </div>
              <div className="pm-plan pm-plan--popular">
                <span className="pm-popular-badge">おすすめ</span>
                <span className="pm-plan-name">年額プラン</span>
                <span className="pm-plan-price">¥2,400<small>/年</small></span>
                <span className="pm-plan-save">2ヶ月分お得！</span>
              </div>
            </div>

            <ul className="pm-feature-list">
              <li>✅ すべての広告を非表示</li>
              <li>✅ 高度なフィルター（営業時間、距離、評価スコア）</li>
              <li>✅ お気に入りリスト無制限保存</li>
              <li>✅ 価格推移グラフの閲覧</li>
              <li>✅ PRO限定コミュニティアクセス</li>
              <li>✅ 新機能の先行利用</li>
            </ul>

            <button className="btn-primary pm-subscribe" id="premium-subscribe">
              🚀 PROプランに登録する
            </button>
            <p className="pm-note">いつでもキャンセル可能 · 7日間無料トライアル</p>
          </div>
        </div>
      )}
    </>
  );
}
