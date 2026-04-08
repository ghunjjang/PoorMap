import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, 'poormap.db');

// Connect to existing DB (created by initDb.js or newly created)
const db = new Database(dbPath);

console.log('Starting massive data fetch from OSM Overpass API...');

// Overpass QL query: Fetching famous budget chains across a broad area of Japan (Tokyo + Osaka + Kyoto + Nagoya bounds roughly)
// For speed, let's limit to nodes matching the names.
const query = `
  [out:json][timeout:90];
  (
    node["amenity"~"fast_food|restaurant"]["name"~"松屋|すき家|吉野家|サイゼリヤ|ガスト|日高屋|鳥貴族|丸亀製麺|餃子の王将|スシロー|くら寿司|はなまるうどん|なか卯|天丼てんや"](33.0, 130.0, 40.0, 141.0);
  );
  out body;
`;

const postData = 'data=' + encodeURIComponent(query);

const options = {
  hostname: 'overpass-api.de',
  port: 443,
  path: '/api/interpreter',
  method: 'POST',
  rejectUnauthorized: false,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let rawData = '';

  res.on('data', (chunk) => { rawData += chunk; });
  
  res.on('end', () => {
    try {
      console.log('Downloaded raw data...');
      const parsedData = JSON.parse(rawData);
      const elements = parsedData.elements;
      console.log(`Received ${elements.length} raw restaurant nodes.`);

      // Prepare DB Statement
      const insertRestaurant = db.prepare(`
        INSERT INTO restaurants (name, genre, price, rating, lat, lng, area, address, description, emoji)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      db.transaction(() => {
        let count = 0;
        for (const el of elements) {
          if (!el.tags || !el.tags.name) continue;
          
          const name = el.tags.name;
          let genre = '定食';
          let price = 500;
          let emoji = '🍽️';

          if (name.includes('松屋') || name.includes('すき家') || name.includes('吉野家')) {
            genre = '牛丼'; price = 400; emoji = '🥩';
          } else if (name.includes('サイゼリヤ') || name.includes('ガスト')) {
            genre = 'ファミレス'; price = 600; emoji = '🍕';
          } else if (name.includes('日高屋') || name.includes('餃子の王将')) {
            genre = '中華'; price = 600; emoji = '🥟';
          } else if (name.includes('丸亀製麺') || name.includes('はなまるうどん')) {
            genre = 'うどん'; price = 400; emoji = '🍜';
          } else if (name.includes('スシロー') || name.includes('くら寿司')) {
            genre = '寿司'; price = 1200; emoji = '🍣';
          } else if (name.includes('なか卯')) {
            genre = '丼ぶり・うどん'; price = 450; emoji = '🥚';
          } else if (name.includes('天丼てんや')) {
            genre = '天丼'; price = 560; emoji = '🍤';
          } else if (name.includes('鳥貴族')) {
            genre = '焼き鳥'; price = 360; emoji = '🍗';
          }

          // Insert into Db
          insertRestaurant.run(
            name, 
            genre, 
            price, 
            (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1), // mock rating
            el.lat, 
            el.lon, 
            "日本", 
            "住所未登録", // OSM addresses usually need extensive reverse geocoding, skip for now to save time
            "", 
            emoji
          );
          count++;
        }
        console.log(`Successfully inserted ${count} budget restaurants into DB!`);
      })();
      
    } catch (e) {
      console.error('Error parsing OSM data OR DB error:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
