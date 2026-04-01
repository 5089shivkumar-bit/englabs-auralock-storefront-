import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kroqfuodefeplkvdxknx.supabase.co';
const supabaseKey = 'sb_publishable_5SBsnjbMKJ9o11X0B0R1XQ_7zPzuiBv';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const o = await supabase.from('orders').select('*');
  console.log("Orders:", o.data, o.error);
  const s = await supabase.from('settings').select('*');
  console.log("Settings:", s.data, s.error);
}

check();
