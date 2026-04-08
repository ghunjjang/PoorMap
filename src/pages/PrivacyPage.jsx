import './TermsPage.css'; // Reusing the same styles

export default function PrivacyPage() {
  return (
    <div className="legal-page animate-fade-in">
      <div className="legal-container glass">
        <h1 className="legal-title">プライバシーポリシー (Privacy Policy)</h1>
        <p className="legal-date">最終更新日: 2026年4月</p>

        <section className="legal-section">
          <h2>1. 収集する情報</h2>
          <p>
            当サービス（貧乏マップ）では、ユーザー体験の向上および最適な店舗情報提供のため、以下の情報を収集する場合があります。
          </p>
          <ul>
            <li>位置情報（GPS等による現在地情報。ユーザーの許可がある場合のみ）</li>
            <li>アクセスログ（IPアドレス、ブラウザ種類等）</li>
            <li>ユーザーが投稿した店舗情報および口コミデータ</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. 情報の利用目的</h2>
          <p>収集した情報は、以下の目的で利用されます。</p>
          <ul>
            <li>現在地周辺の店舗情報をマップ上に表示するため</li>
            <li>本サービスの機能改善および新規開発のため</li>
            <li>不正アクセスの検知やセキュリティ向上のため</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. 第三者への提供</h2>
          <p>
            当サービスは、法令に基づく場合を除き、事前の同意なくユーザーの個人情報を第三者に提供することはありません。ただし、アクセス解析ツール（Google Analytics等）を利用しており、これらのツールがクッキー(Cookie)を使用してデータを収集する場合があります。
          </p>
        </section>

        <section className="legal-section">
          <h2>4. 情報の管理</h2>
          <p>
            収集した個人情報は、漏洩、滅失、または毀損の防止その他の安全管理のために必要かつ適切な措置を講じます。
          </p>
        </section>

        <section className="legal-section">
          <h2>5. プライバシーポリシーの変更</h2>
          <p>
            本ポリシーの内容は、ユーザーに通知することなく変更することができるものとします。変更後のプライバシーポリシーは、本サービスに掲載したときから効力を生じるものとします。
          </p>
        </section>

        <section className="legal-section">
          <h2>6. お問い合わせ窓口</h2>
          <p>
            本ポリシーに関するお問い合わせは、本サービスの公式X（旧Twitter）アカウントのDM等からお願いいたします。
          </p>
        </section>

        <button className="btn-secondary legal-back-btn" onClick={() => window.history.back()}>
          戻る (Back)
        </button>
      </div>
    </div>
  );
}
