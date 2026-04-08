import { useState, useEffect } from 'react';
import './GuideModal.css';

export default function GuideModal({ onClose }) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    {
      title: "🗺️ 近くの激安店を探そう",
      content: "マップ上のアイコンをタップして、周辺の500円以下の店やコスパ最高の食道を見つけましょう。予算スライダーで価格帯を調整できます。",
      icon: "📍"
    },
    {
      title: "📝 お得情報を投稿しよう",
      content: "知っている安い店があれば、'制報する'ボタンから投稿してください。あなたの情報が他の誰かの節約を助けます！",
      icon: "✏️"
    },
    {
      title: "💬 貧乏部屋で話そう",
      content: "コミュニティページ（貧乏部屋）では、全国の節約家たちと情報交換ができます。匿名で気軽に参加しましょう。",
      icon: "💬"
    }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="guide-modal-overlay animate-fade-in">
      <div className="guide-modal-content glass animate-scale-in">
        <div className="guide-header">
          <span className="guide-step-indicator">Step {step} of {totalSteps}</span>
          <button className="guide-close-x" onClick={onClose}>&times;</button>
        </div>
        
        <div className="guide-body">
          <div className="guide-big-icon">{currentStep.icon}</div>
          <h2 className="guide-title">{currentStep.title}</h2>
          <p className="guide-text">{currentStep.content}</p>
        </div>

        <div className="guide-footer">
          <div className="guide-dots">
            {steps.map((_, i) => (
              <div key={i} className={`guide-dot ${step === i + 1 ? 'active' : ''}`} />
            ))}
          </div>
          
          <div className="guide-actions">
            {step > 1 && (
              <button className="btn-secondary" onClick={() => setStep(step - 1)}>
                戻る
              </button>
            )}
            {step < totalSteps ? (
              <button className="btn-primary" onClick={() => setStep(step + 1)}>
                次へ
              </button>
            ) : (
              <button className="btn-primary" onClick={onClose}>
                地図を始める！
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
