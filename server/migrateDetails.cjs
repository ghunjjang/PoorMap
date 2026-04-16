const { neon } = require('@neondatabase/serverless');

async function migrate() {
  const sql = neon(process.env.POSTGRES_URL);

  console.log('Adding detail columns to restaurants table...');

  await sql`ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS hours TEXT DEFAULT '11:00〜22:00'`;
  await sql`ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS closed_day TEXT DEFAULT '不定休'`;
  await sql`ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS tags TEXT DEFAULT ''`;
  await sql`ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS website TEXT DEFAULT ''`;
  await sql`ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS reviews INTEGER DEFAULT 0`;

  console.log('✅ Migration complete!');
}

migrate().catch(console.error);
