import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import HomeClient from '@/components/home/HomeClient';

import { getDB } from '@/lib/db';

async function ProductsSection() {
  let products: any[] = [];
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    const db = getDB();
    if (error || !data || data.length === 0) {
      console.log("Supabase fetch failed on home, using local fallback");
      products = db.products || [];
    } else {
      products = data.map((item: any) => ({ ...item }));
      if (db.products && db.products.length > 0) {
        db.products.forEach((p: any) => {
          const existing = products.find(x => x.id === p.id);
          if (!existing) {
            products.push(p);
          } else if (!existing.image && p.image) {
            existing.image = p.image;
          }
        });
      }
    }
  } catch (err) {
    console.error("Home Supabase error, using local fallback");
    const db = getDB();
    products = db.products || [];
  }

  return <HomeClient initialProducts={products} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center font-mono text-purple-600">Initializing Aura Protocol...</div>}>
      <ProductsSection />
    </Suspense>
  );
}
