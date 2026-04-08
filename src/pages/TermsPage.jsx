import './TermsPage.css';

export default function TermsPage() {
  return (
    <div className="legal-page animate-fade-in">
      <div className="legal-container glass">
        <h1 className="legal-title">利用規約 (Terms of Service)</h1>
        <p className="legal-date">最終更新日: 2026年4月</p>

        <section className="legal-section">
          <h2>第1条（適用）</h2>
          <p>
            本規約は、ユーザーと「貧乏マップ」（以下「本サービス」）の利用に関わる一切の関係に適用されるものとします。
          </p>
        </section>

        <section className="legal-section">
          <h2>第2条（禁止事項）</h2>
          <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
          <ul>
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</li>
            <li>虚偽の店舗情報や口コミを投稿する行為</li>
            <li>他のユーザーまたは第三者に不利益、損害、不快感を与える行為</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>第3条（本サービスの提供の停止等）</h2>
          <p>
            運営者は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
          </p>
          <ul>
            <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
            <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
            <li>その他、運営者が本サービスの提供が困難と判断した場合</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>第4条（免責事項）</h2>
          <p>
            運営者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            ユーザーが本サービスを利用したことにより生じた損害について、運営者は一切の責任を負わないものとします。
          </p>
        </section>

        <section className="legal-section">
          <h2>第5条（利用規約の変更）</h2>
          <p>
            運営者は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
          </p>
        </section>

        <button className="btn-secondary legal-back-btn" onClick={() => window.history.back()}>
          戻る (Back)
        </button>
      </div>
    </div>
  );
}
