import { useState, useEffect, useCallback } from 'react';
import './TweetPage.css';

const communityTemplates = {
  reddit: (r) => `**I made a free map to find cheap food in Japan (under ¥1000)**

Site: https://poor-map.vercel.app

Found a great spot today: **${r.name}** in ${r.area} for only ¥${r.price}!

The map has 10,000+ budget-friendly restaurants across all of Japan. You can filter by price and genre. Completely free to use.

Hope it helps fellow budget travelers / expats!`,

  fivech: (r) => `節約飯マップ作ったので紹介します
https://poor-map.vercel.app

全国1万店舗以上のコスパ飯を地図で検索できます
予算上限スライダーで1000円以下に絞れます

${r.name}（${r.area}）¥${r.price} みたいな店が全国で探せます
無料です、ぜひ使ってみてください`,

  note: (r) => `# 全国のコスパ飯を地図で探せる無料サービスを作りました

## 貧乏マップとは？

「貧乏マップ」は、全国1万店舗以上のコスパ最強の飲食店を地図で検索できる無料Webサービスです。

- 予算スライダーで1000円以下に絞り込み
- ジャンル別フィルター（牛丼・ラーメン・定食・うどんなど）
- GPS機能で現在地周辺の格安飯をすぐ発見
- 全国47都道府県対応

→ https://poor-map.vercel.app

## 使い方

1. サイトを開く
2. 予算スライダーで上限を設定（例：¥800以下）
3. 地図上に表示された店舗マーカーをタップ
4. 「Googleマップで見る」から道案内も可能

節約生活をしている方、旅行中の方、学生さんにぜひ使っていただきたいです！`,

  zenn: (r) => `---
title: 個人開発で全国1万店舗のコスパ飯マップを作った話
emoji: 🗾
type: idea
topics: [個人開発, React, NeonDB, Vercel]
published: true
---

## 作ったもの

**貧乏マップ** — 全国のコスパ飯・格安飯を地図で探せる無料Webサービスです。

https://poor-map.vercel.app

## 機能

- 全国1万店舗以上のデータ（47都道府県対応）
- 予算スライダーで¥200〜¥1500の範囲でフィルタリング
- ジャンル別フィルター
- GPS機能で現在地周辺を検索
- ユーザーによる店舗制報機能

## 技術スタック

- **フロントエンド**: React 19 + Vite + React-Leaflet
- **バックエンド**: Express 5 + Vercel Serverless Functions
- **DB**: NeonDB (PostgreSQL)
- **デプロイ**: Vercel

## 工夫したこと

全国170以上のエリア × 29チェーン + 個人店データを組み合わせて1万件以上のデータを生成。マップ表示は最大300件に制限してパフォーマンスを確保しました。

ぜひ使ってみてください！フィードバックお待ちしています 🙏`,
};

const templates = [
  (r) => `🍴 今日のコスパ飯！

🏪 ${r.name}
💴 ¥${r.price}
⭐ ${Number(r.rating).toFixed(1)}
📍 ${r.area}

${r.description}

全国のコスパ飯を地図で探せる👇
https://poor-map.vercel.app

#節約 #コスパ #貧乏マップ #激安グルメ`,

  (r) => `💡 ${r.area}のおすすめ格安飯

🏪 ${r.name}
💴 ¥${r.price} · ⭐${Number(r.rating).toFixed(1)}

${r.description}

🗾 貧乏マップで近くのお得な店を探そう！
https://poor-map.vercel.app

#節約飯 #激安 #コスパ最強 #安ウマ`,

  (r) => `🗾 貧乏マップ今日のピックアップ

【${r.genre}】📍${r.area}

✅ ${r.name}
💴 ¥${r.price}〜 · ⭐${Number(r.rating).toFixed(1)}

${r.description}

地図で全国1万店舗以上を検索👇
https://poor-map.vercel.app

#節約 #安ウマ #コスパ飯 #貧乏飯`,

  (r) => `⚡ ${r.price}円で満腹になれる店を発見！

🏪 ${r.name}（${r.area}）
⭐ ${Number(r.rating).toFixed(1)}

${r.description}

他にも全国のコスパ飯が見つかる👇
https://poor-map.vercel.app

#節約生活 #コスパ #格安グルメ #貧乏マップ`,

  (r) => `🥢 ${r.genre}好き必見！

${r.name}（${r.area}）
たったの ¥${r.price} で食べられる！⭐${Number(r.rating).toFixed(1)}

${r.description}

💰 貧乏マップで節約飯を探そう
https://poor-map.vercel.app

#${r.genre.replace(/[・\s]/g, '')} #節約飯 #コスパ #貧乏マップ`,
];

export default function TweetPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [tweetText, setTweetText] = useState('');
  const [templateIdx, setTemplateIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('x');
  const [communityCopied, setCommunityCopied] = useState('');

  const fetchRandom = useCallback(async () => {
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/restaurants/random`);
      const data = await res.json();
      setRestaurant(data);
      const idx = Math.floor(Math.random() * templates.length);
      setTemplateIdx(idx);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandom();
  }, [fetchRandom]);

  useEffect(() => {
    if (restaurant) {
      setTweetText(templates[templateIdx](restaurant));
    }
  }, [restaurant, templateIdx]);

  const handleCopy = () => {
    navigator.clipboard.writeText(tweetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTweetOpen = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
    setHistory(prev => [{ text: tweetText, restaurant: restaurant?.name, time: new Date().toLocaleTimeString('ja-JP') }, ...prev].slice(0, 5));
  };

  const handleRegenerate = () => {
    const nextIdx = (templateIdx + 1) % templates.length;
    setTemplateIdx(nextIdx);
  };

  const charCount = tweetText.length;
  const isOver = charCount > 280;

  const handleCommunityCopy = (key, text) => {
    navigator.clipboard.writeText(text);
    setCommunityCopied(key);
    setTimeout(() => setCommunityCopied(''), 2000);
  };

  const communityChannels = restaurant ? [
    { key: 'reddit', label: '🌐 Reddit', sublabel: 'r/japanlife · r/movingtojapan', text: communityTemplates.reddit(restaurant) },
    { key: 'fivech', label: '💬 5ch / 2ch', sublabel: '節約板・生活板', text: communityTemplates.fivech(restaurant) },
    { key: 'note', label: '📝 note.com', sublabel: '紹介記事', text: communityTemplates.note(restaurant) },
    { key: 'zenn', label: '👨‍💻 Zenn', sublabel: '開発記事', text: communityTemplates.zenn(restaurant) },
  ] : [];

  return (
    <div className="tweet-page">
      <div className="tweet-container">
        <div className="tweet-header">
          <h1 className="tweet-title">📣 홍보 도구</h1>
          <p className="tweet-subtitle">各プラットフォーム用の投稿文を自動生成</p>
        </div>

        {/* Tab */}
        <div className="tweet-tabs">
          <button className={`tweet-tab ${activeTab === 'x' ? 'active' : ''}`} onClick={() => setActiveTab('x')}>🐦 X (Twitter)</button>
          <button className={`tweet-tab ${activeTab === 'community' ? 'active' : ''}`} onClick={() => setActiveTab('community')}>💬 コミュニティ</button>
        </div>

        {activeTab === 'community' && restaurant && (
          <div className="community-section">
            <div className="tweet-restaurant-card glass">
              <div className="tweet-rc-header">
                <span className="tweet-rc-emoji">{restaurant.emoji || '🍴'}</span>
                <div>
                  <div className="tweet-rc-name">{restaurant.name}</div>
                  <div className="tweet-rc-meta">¥{restaurant.price} · ⭐{Number(restaurant.rating).toFixed(1)} · {restaurant.area}</div>
                </div>
              </div>
            </div>
            {communityChannels.map(ch => (
              <div key={ch.key} className="community-card glass">
                <div className="community-card-header">
                  <div>
                    <span className="community-label">{ch.label}</span>
                    <span className="community-sublabel">{ch.sublabel}</span>
                  </div>
                  <button
                    className={`community-copy-btn ${communityCopied === ch.key ? 'copied' : ''}`}
                    onClick={() => handleCommunityCopy(ch.key, ch.text)}
                  >
                    {communityCopied === ch.key ? '✅ コピー済み' : '📋 コピー'}
                  </button>
                </div>
                <pre className="community-text">{ch.text}</pre>
              </div>
            ))}
            <button className="tweet-btn-new" style={{width:'100%', padding:'12px'}} onClick={fetchRandom}>
              🎲 別の店舗で再生成
            </button>
          </div>
        )}

        {activeTab === 'x' && (loading ? (
          <div className="tweet-loading">
            <div className="loading-spinner" />
            <p>店舗を取得中...</p>
          </div>
        ) : restaurant ? (
          <>
            {/* Restaurant Card */}
            <div className="tweet-restaurant-card glass">
              <div className="tweet-rc-header">
                <span className="tweet-rc-emoji">{restaurant.emoji || '🍴'}</span>
                <div>
                  <div className="tweet-rc-name">{restaurant.name}</div>
                  <div className="tweet-rc-meta">¥{restaurant.price} · ⭐{Number(restaurant.rating).toFixed(1)} · {restaurant.area}</div>
                </div>
              </div>
            </div>

            {/* Tweet Preview */}
            <div className="tweet-preview-box glass">
              <div className="tweet-preview-header">
                <span>ツイートプレビュー</span>
                <span className={`tweet-char-count ${isOver ? 'over' : ''}`}>{charCount}/280</span>
              </div>
              <textarea
                className="tweet-textarea"
                value={tweetText}
                onChange={e => setTweetText(e.target.value)}
                rows={10}
              />
            </div>

            {/* Action Buttons */}
            <div className="tweet-actions">
              <button className="tweet-btn-post" onClick={handleTweetOpen} disabled={isOver}>
                🐦 Xで投稿する
              </button>
              <button className="tweet-btn-copy" onClick={handleCopy}>
                {copied ? '✅ コピー済み' : '📋 テキストをコピー'}
              </button>
            </div>

            <div className="tweet-secondary-actions">
              <button className="tweet-btn-template" onClick={handleRegenerate}>
                🔄 テンプレート変更
              </button>
              <button className="tweet-btn-new" onClick={fetchRandom}>
                🎲 別の店舗
              </button>
            </div>

            {/* Hashtag Suggestions */}
            <div className="tweet-hashtags glass">
              <div className="tweet-hashtags-title">よく使うハッシュタグ</div>
              <div className="tweet-hashtags-list">
                {['#節約', '#コスパ', '#貧乏マップ', '#激安グルメ', '#節約飯', '#安ウマ', '#節約生活', '#貧乏飯', '#格安グルメ', '#コスパ最強'].map(tag => (
                  <button
                    key={tag}
                    className="hashtag-chip"
                    onClick={() => {
                      if (!tweetText.includes(tag)) {
                        setTweetText(prev => prev + '\n' + tag);
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="tweet-error">データ取得に失敗しました</div>
        ))}

        {/* Post History */}
        {history.length > 0 && (
          <div className="tweet-history glass">
            <div className="tweet-history-title">📝 投稿履歴（このセッション）</div>
            {history.map((h, i) => (
              <div key={i} className="tweet-history-item">
                <span className="tweet-history-name">{h.restaurant}</span>
                <span className="tweet-history-time">{h.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Guide */}
        <div className="tweet-guide glass">
          <div className="tweet-guide-title">💡 使い方</div>
          <ol className="tweet-guide-list">
            <li>「別の店舗」で投稿したい店を選ぶ</li>
            <li>「テンプレート変更」でバリエーションを変える</li>
            <li>テキストを直接編集してもOK</li>
            <li>「Xで投稿する」をクリック → Xの投稿画面が開く</li>
            <li>そのまま「ポストする」ボタンを押すだけ！</li>
          </ol>
          <p className="tweet-guide-tip">💰 完全無料！1日2〜3回投稿するだけでフォロワーが増えます</p>
        </div>
      </div>
    </div>
  );
}
