import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import HomeClient from '@/components/home/HomeClient';

async function ProductsSection() {
  // Fetch products directly on the server
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('name');

  return <HomeClient initialProducts={products || []} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center font-mono text-purple-600">Initializing Aura Protocol...</div>}>
      <ProductsSection />
    </Suspense>
  );
}
