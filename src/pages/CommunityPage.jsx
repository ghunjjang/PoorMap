import { useState, useMemo, useEffect } from 'react';
import { communityPosts, categories, formatTimeAgo, getRandomNickname } from '../data/mockData';
import AdBanner from '../components/AdBanner';
import SimpleFooter from '../components/SimpleFooter';
import './CommunityPage.css';

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('自由');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || '';
    fetch(`${apiBase}/api/posts`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return posts;
    return posts.filter(p => p.category === activeCategory);
  }, [posts, activeCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newPost = {
      id: posts.length + 1,
      category: newCategory,
      title: newTitle,
      author: nickname || getRandomNickname(),
      content: newContent,
      comments: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      isHot: false
    };
    setPosts(prev => [newPost, ...prev]);
    setNewTitle('');
    setNewContent('');
    setNickname('');
    setShowWriteForm(false);
  };

  return (
    <div className="community-page page-container" id="community-page">
      {/* Header */}
      <header className="community-header">
        <div className="community-header-top">
          <h1 className="community-title">
            <span>💬</span>
            <span className="gradient-text">貧乏部屋</span>
          </h1>
          <button
            className="btn-primary"
            onClick={() => setShowWriteForm(!showWriteForm)}
            id="write-post-btn"
          >
            ✏️ 投稿する
          </button>
        </div>
        <p className="community-subtitle">
          節約の知恵を共有する匿名コミュニティ
        </p>
      </header>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'category-tab--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            id={`category-${cat.id}`}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Write Form */}
      {showWriteForm && (
        <form className="write-form card animate-slide-up" onSubmit={handleSubmit} id="write-form">
          <div className="wf-row">
            <div className="wf-field wf-nick">
              <input
                type="text"
                className="rm-input"
                placeholder="ニックネーム（空欄でランダム）"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                id="post-nickname"
              />
              <button
                type="button"
                className="btn-secondary wf-random"
                onClick={() => setNickname(getRandomNickname())}
              >
                🎲
              </button>
            </div>
            <select
              className="rm-input rm-select wf-cat-select"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              id="post-category"
            >
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            className="rm-input"
            placeholder="タイトルを入力..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
            id="post-title"
          />
          <textarea
            className="rm-input rm-textarea"
            placeholder="内容を入力..."
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            rows={3}
            id="post-content"
          />
          <div className="wf-actions">
            <button type="button" className="btn-secondary" onClick={() => setShowWriteForm(false)}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" id="post-submit">
              投稿する
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="posts-list">
        {filteredPosts.map((post, idx) => (
          <>
            <article
              key={post.id}
              className="post-item card"
              style={{ animationDelay: `${idx * 0.05}s` }}
              id={`post-${post.id}`}
            >
              <div className="post-top">
                <span className={`post-category-badge ${post.isHot ? 'hot' : ''}`}>
                  {post.isHot && '🔥 '}{post.category}
                </span>
                <span className="post-time">{formatTimeAgo(post.createdAt)}</span>
              </div>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
              <div className="post-footer">
                <span className="post-author">👤 {post.author}</span>
                <div className="post-stats">
                  <span className="post-stat">💬 {post.comments}</span>
                  <span className="post-stat">❤️ {post.likes}</span>
                </div>
              </div>
            </article>
            {/* 3번째 게시글 뒤에 인라인 광고 */}
            {idx === 2 && <AdBanner variant="inline" adIndex={0} />}
            {/* 5번째 게시글 뒤에 인라인 광고 */}
            {idx === 4 && <AdBanner variant="inline" adIndex={1} />}
          </>
        ))}

        {/* 카드형 광고 */}
        <AdBanner variant="card" adIndex={2} />

      </div>

      {filteredPosts.length === 0 && (
        <div className="empty-state animate-fade-in">
          <span className="empty-icon">📭</span>
          <p>まだ投稿がありません</p>
          <button className="btn-primary" onClick={() => setShowWriteForm(true)}>
            最初の投稿を書く
          </button>
        </div>
      )}
      <SimpleFooter />
    </div>
  );
}
