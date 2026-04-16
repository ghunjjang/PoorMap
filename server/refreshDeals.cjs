const { neon } = require('@neondatabase/serverless');

async function refresh() {
  const sql = neon(process.env.POSTGRES_URL);

  await sql`DELETE FROM deals`;
  console.log('Cleared existing deals.');

  const newDeals = [
    {
      source: 'Amazon.co.jp',
      sourceIcon: '💧',
      category: '飲料',
      title: 'サントリー 天然水 2L×9本（ラベルレス）',
      description: 'Amazon売れ筋ランキング1位の定番ミネラルウォーター。ラベルなしでゴミ分別が楽々。箱買いでさらにお得！',
      originalPrice: 1780,
      dealPrice: 1280,
      discount: 28,
      author: '節約主婦',
      createdAt: '2026-04-10T09:00:00',
      expiresAt: '2026-06-30',
      isHot: true,
      affiliate_url: 'https://www.amazon.co.jp/s?k=サントリー+天然水+2L+9本+ラベルレス&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '🍜',
      category: '食品',
      title: '日清 カップヌードル 78g × 20個入りまとめ買い',
      description: '国民的カップラーメンをまとめ買い！保存食・非常食にも最適。1個あたり約110円と圧倒的コスパ。',
      originalPrice: 2980,
      dealPrice: 2200,
      discount: 26,
      author: '麺好き',
      createdAt: '2026-04-10T10:00:00',
      expiresAt: '2026-06-30',
      isHot: true,
      affiliate_url: 'https://www.amazon.co.jp/s?k=日清+カップヌードル+まとめ買い+20個&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '🧻',
      category: '日用品',
      title: 'スコッティ 3倍長持ちトイレットロール 12ロール',
      description: '通常の3倍長持ちするからストック場所も節約！大容量パックでコスパ最強のトイレットペーパー。',
      originalPrice: 1680,
      dealPrice: 1180,
      discount: 30,
      author: '節約マスター',
      createdAt: '2026-04-10T11:00:00',
      expiresAt: '2026-07-31',
      isHot: false,
      affiliate_url: 'https://www.amazon.co.jp/s?k=スコッティ+3倍+トイレットペーパー+12ロール&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '🧺',
      category: '日用品',
      title: 'アタック ZERO 詰め替え用 超特大 1.35kg',
      description: '洗浄力No.1の人気洗濯洗剤。詰め替え超特大サイズで1回分のコストをとことん削減！',
      originalPrice: 1980,
      dealPrice: 1380,
      discount: 30,
      author: '洗濯職人',
      createdAt: '2026-04-10T12:00:00',
      expiresAt: '2026-07-31',
      isHot: true,
      affiliate_url: 'https://www.amazon.co.jp/s?k=アタックZERO+詰め替え+超特大&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '⚡',
      category: '家電',
      title: 'Anker Nano USB-C 充電器 20W（PD対応）',
      description: 'スマホを超高速充電！Anker最小クラスのUSB-C充電器。iPhone・Android両対応で旅行にも最適。',
      originalPrice: 1990,
      dealPrice: 1490,
      discount: 25,
      author: 'ガジェット好き',
      createdAt: '2026-04-10T13:00:00',
      expiresAt: '2026-12-31',
      isHot: true,
      affiliate_url: 'https://www.amazon.co.jp/s?k=Anker+Nano+USB-C+20W+充電器&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '🍚',
      category: '食品',
      title: '秋田県産 あきたこまち 5kg（令和産）',
      description: 'もちもちした食感で人気の秋田こまち。重い米も自宅まで配送！毎日のご飯を美味しく節約。',
      originalPrice: 3280,
      dealPrice: 2680,
      discount: 18,
      author: 'ご飯命',
      createdAt: '2026-04-10T14:00:00',
      expiresAt: '2026-06-30',
      isHot: false,
      affiliate_url: 'https://www.amazon.co.jp/s?k=あきたこまち+5kg+令和&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '☕',
      category: '食品',
      title: 'ネスカフェ エクセラ 詰め替え用 60g×2袋セット',
      description: '深みとコクが魅力のエクセラ。詰め替え2袋セットでコーヒー代を大幅節約。1杯あたり約25円！',
      originalPrice: 1480,
      dealPrice: 1080,
      discount: 27,
      author: 'カフェ難民',
      createdAt: '2026-04-10T15:00:00',
      expiresAt: '2026-06-30',
      isHot: true,
      affiliate_url: 'https://www.amazon.co.jp/s?k=ネスカフェ+エクセラ+詰め替え+60g+2袋&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '🫧',
      category: '日用品',
      title: 'キュキュット 食器用洗剤 詰め替え 大容量 1380ml',
      description: '油汚れに強いキュキュット！大容量詰め替えでコスト削減。泡切れが良く、手肌にも優しい。',
      originalPrice: 1100,
      dealPrice: 780,
      discount: 29,
      author: 'お皿ピカピカ',
      createdAt: '2026-04-10T16:00:00',
      expiresAt: '2026-07-31',
      isHot: false,
      affiliate_url: 'https://www.amazon.co.jp/s?k=キュキュット+詰め替え+大容量+1380ml&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '🍟',
      category: '食品',
      title: 'カルビー じゃがりこ チーズ 60g×12個入り',
      description: 'サクサク食感でやみつきになるじゃがりこ！まとめ買いで1個あたり130円以下のコスパ最強スナック。',
      originalPrice: 2180,
      dealPrice: 1580,
      discount: 28,
      author: 'おやつ番長',
      createdAt: '2026-04-10T17:00:00',
      expiresAt: '2026-06-30',
      isHot: true,
      affiliate_url: 'https://www.amazon.co.jp/s?k=カルビー+じゃがりこ+12個+まとめ買い&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '🍫',
      category: '食品',
      title: '明治 ザ・チョコレート 各種 5枚×5種 セット',
      description: '本格カカオの贅沢チョコレート。ギフトにも普段使いにも最適。まとめ買いで1枚約100円！',
      originalPrice: 1980,
      dealPrice: 1480,
      discount: 25,
      author: 'チョコ愛好家',
      createdAt: '2026-04-10T17:30:00',
      expiresAt: '2026-06-30',
      isHot: false,
      affiliate_url: 'https://www.amazon.co.jp/s?k=明治+ザチョコレート+5枚+セット&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '🧼',
      category: '日用品',
      title: 'ビオレu 手指の消毒用アルコール 本体+詰め替えセット',
      description: '花王の定番ハンドソープ。アルコール消毒タイプで除菌力もバッチリ。本体＋詰め替えセットがお得！',
      originalPrice: 1480,
      dealPrice: 1080,
      discount: 27,
      author: '清潔第一',
      createdAt: '2026-04-10T18:00:00',
      expiresAt: '2026-08-31',
      isHot: false,
      affiliate_url: 'https://www.amazon.co.jp/s?k=ビオレu+手指+消毒+アルコール+詰め替え&tag=amazon0ff1f1-20'
    },
    {
      source: 'Amazon.co.jp',
      sourceIcon: '📺',
      category: '家電',
      title: 'Amazon Fire TV Stick 4K（第2世代）リモコン付き',
      description: 'Prime Video・Netflix・YouTube・TVerが大画面で楽しめる！テレビをスマートTVに変えるコスパ最強デバイス。',
      originalPrice: 8980,
      dealPrice: 4980,
      discount: 44,
      author: 'ストリーミング通',
      createdAt: '2026-04-10T18:30:00',
      expiresAt: '2026-12-31',
      isHot: true,
      affiliate_url: 'https://www.amazon.co.jp/s?k=Fire+TV+Stick+4K+第2世代&tag=amazon0ff1f1-20'
    }
  ];

  let inserted = 0;
  for (const d of newDeals) {
    await sql`
      INSERT INTO deals (source, sourceicon, category, title, description, originalprice, dealprice, discount, author, createdat, expiresat, ishot, affiliate_url)
      VALUES (${d.source}, ${d.sourceIcon}, ${d.category}, ${d.title}, ${d.description}, ${d.originalPrice}, ${d.dealPrice}, ${d.discount}, ${d.author}, ${d.createdAt}, ${d.expiresAt}, ${d.isHot}, ${d.affiliate_url})
    `;
    inserted++;
  }

  console.log(`✅ ${inserted}件のディールを登録しました！`);
}

refresh().catch(console.error);
