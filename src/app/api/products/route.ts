import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ProductSchema } from '@/lib/validation';
import { z } from 'zod';

import { getDB } from '@/lib/db';

export async function GET() {
  try {
    const { data, error } = await supabase.from('products').select('*');
    const db = getDB();
    if (error || !data || data.length === 0) {
      console.log("Supabase fetch failed or empty, falling back to local database.json");
      return NextResponse.json(db.products || []);
    }
    
    // Merge database.json products with Supabase products
    const allProducts = data.map((item: any) => ({ ...item }));
    if (db.products && db.products.length > 0) {
      db.products.forEach((p: any) => {
        const existing = allProducts.find((x: any) => x.id === p.id);
        if (!existing) {
          allProducts.push(p);
        } else if (!existing.image && p.image) {
          existing.image = p.image;
        }
      });
    }
    
    return NextResponse.json(allProducts);
  } catch (err) {
    console.error("Supabase connection error, falling back to local database.json");
    const db = getDB();
    return NextResponse.json(db.products || []);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedProduct = ProductSchema.parse(body);
    const productWithId = { id: Date.now().toString(), ...validatedProduct };
    const { data, error } = await supabase.from('products').insert([productWithId]).select();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, product: data?.[0] || productWithId });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    if (!data || data.length === 0) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true, product: data[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
  
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
