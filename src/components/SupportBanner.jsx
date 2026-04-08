import './SupportBanner.css';

export default function SupportBanner() {
  return (
    <div className="support-banner card" id="support-banner">
      <div className="sb-content">
        <span className="sb-icon">☕</span>
        <div className="sb-info">
          <h4 className="sb-title">貧乏マップを応援する</h4>
          <p className="sb-text">コーヒー1杯分の支援で、サービスの維持・改善を助けてください</p>
        </div>
      </div>
      <div className="sb-buttons">
        <button className="sb-btn sb-btn-100" id="support-100">
          ☕ ¥100
        </button>
        <button className="sb-btn sb-btn-300" id="support-300">
          ☕☕ ¥300
        </button>
        <button className="sb-btn sb-btn-500" id="support-500">
          ☕☕☕ ¥500
        </button>
      </div>
    </div>
  );
}
