import { useState } from 'react';
import { reportTags, getRandomNickname, genres } from '../data/mockData';
import './ReportModal.css';

export default function ReportModal({ onClose, onSubmit }) {
  const [nickname, setNickname] = useState('');
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleRandomNickname = () => {
    setNickname(getRandomNickname());
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeName || !price) return;
    onSubmit({
      nickname: nickname || getRandomNickname(),
      storeName,
      address,
      price: parseInt(price),
      genre,
      description,
      tags: selectedTags
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="report-modal-overlay">
      <div className="report-modal animate-scale-in" onClick={e => e.stopPropagation()} id="report-modal">
        <div className="rm-header">
          <h2 className="rm-title">
            <span className="rm-title-icon">📝</span>
            お店を制報する
          </h2>
          <button className="rc-close" onClick={onClose} id="close-report-modal">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="rm-form">
          {/* Nickname */}
          <div className="rm-field">
            <label className="rm-label">ニックネーム</label>
            <div className="rm-nickname-row">
              <input
                type="text"
                className="rm-input"
                placeholder="匿名で投稿されます"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                id="report-nickname"
              />
              <button
                type="button"
                className="btn-secondary rm-random-btn"
                onClick={handleRandomNickname}
                id="random-nickname-btn"
              >
                🎲 ランダム
              </button>
            </div>
          </div>

          {/* Store Name */}
          <div className="rm-field">
            <label className="rm-label">店名 <span className="rm-required">*必須</span></label>
            <input
              type="text"
              className="rm-input"
              placeholder="例: 松屋 渋谷店"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              required
              id="report-store-name"
            />
          </div>

          {/* Address */}
          <div className="rm-field">
            <label className="rm-label">住所</label>
            <input
              type="text"
              className="rm-input"
              placeholder="例: 東京都渋谷区..."
              value={address}
              onChange={e => setAddress(e.target.value)}
              id="report-address"
            />
          </div>

          {/* Price & Genre */}
          <div className="rm-row">
            <div className="rm-field rm-field-half">
              <label className="rm-label">価格 <span className="rm-required">*必須</span></label>
              <div className="rm-price-input">
                <span className="rm-yen">¥</span>
                <input
                  type="number"
                  className="rm-input"
                  placeholder="500"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                  min="0"
                  max="5000"
                  id="report-price"
                />
              </div>
            </div>
            <div className="rm-field rm-field-half">
              <label className="rm-label">ジャンル</label>
              <select
                className="rm-input rm-select"
                value={genre}
                onChange={e => setGenre(e.target.value)}
                id="report-genre"
              >
                <option value="">選択</option>
                {genres.filter(g => g.id !== 'all').map(g => (
                  <option key={g.id} value={g.id}>{g.icon} {g.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="rm-field">
            <label className="rm-label">おすすめポイント</label>
            <textarea
              className="rm-input rm-textarea"
              placeholder="このお店の魅力を教えてください..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              id="report-description"
            />
          </div>

          {/* Tags */}
          <div className="rm-field">
            <label className="rm-label">タグ（複数選択可）</label>
            <div className="rm-tags">
              {reportTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`chip ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary rm-submit" id="report-submit">
            🚀 制報する
          </button>
        </form>
      </div>
    </div>
  );
}
