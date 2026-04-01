import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://kroqfuodefeplkvdxknx.supabase.co';
const supabaseKey = 'sb_publishable_5SBsnjbMKJ9o11X0B0R1XQ_7zPzuiBv';
const supabase = createClient(supabaseUrl, supabaseKey);

const dbPath = path.join(process.cwd(), 'database.json');

async function migrate() {
  if (!fs.existsSync(dbPath)) {
    console.log("No database.json found. Skipping migration.");
    return;
  }

  const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  // 1. Migrate Products
  if (data.products && data.products.length > 0) {
    console.log(`Migrating ${data.products.length} products...`);
    for (const p of data.products) {
      const { error } = await supabase.from('products').upsert({
        id: String(p.id),
        name: p.name,
        price: p.price,
        features: p.features || [],
        image: p.image || null,
        images: p.images || [],
        // Mapping defaults if missing in local but expected in SB
        description: p.description || '',
        category: p.category || 'general',
        stock_status: p.stock_status || 'in-stock'
      });
      if (error) console.error(`Error migrating product ${p.id}:`, error.message);
    }
  }

  // 2. Migrate Settings
  if (data.settings) {
    console.log("Migrating settings...");
    const { data: existing } = await supabase.from('system_settings').select('id').limit(1).single();
    if (existing) {
       await supabase.from('system_settings').update({
         email: data.settings.email,
         phone: data.settings.phone
       }).eq('id', existing.id);
    } else {
       await supabase.from('system_settings').insert([{
         email: data.settings.email,
         phone: data.settings.phone
       }]);
    }
  }

  // 3. Migrate Orders
  if (data.orders && data.orders.length > 0) {
    console.log(`Migrating ${data.orders.length} orders...`);
    for (const o of data.orders) {
      const { error } = await supabase.from('orders').upsert({
        ...o,
        id: String(o.id)
      });
      if (error) console.error(`Error migrating order ${o.id}:`, error.message);
    }
  }

  console.log("Migration finished!");
}

migrate();
