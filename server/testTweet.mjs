import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

// v1.1로 시도
try {
  const result = await client.v1.tweet('🗾 貧乏マップ テスト - 全国のコスパ飯が地図で探せる！ https://poor-map.vercel.app #節約 #コスパ');
  console.log('✅ v1.1 成功！Tweet ID:', result.id_str);
} catch (err) {
  console.error('❌ v1.1 エラー:', err.code, err.message);
  console.error('詳細:', JSON.stringify(err.data, null, 2));

  // v2로도 시도
  try {
    const rwClient = client.readWrite;
    const result2 = await rwClient.v2.tweet('🗾 貧乏マップ テスト - 全国のコスパ飯が地図で探せる！ https://poor-map.vercel.app #節約 #コスパ');
    console.log('✅ v2 成功！Tweet ID:', result2.data.id);
  } catch (err2) {
    console.error('❌ v2 エラー:', err2.code, err2.message);
    console.error('詳細:', JSON.stringify(err2.data, null, 2));
  }
}
