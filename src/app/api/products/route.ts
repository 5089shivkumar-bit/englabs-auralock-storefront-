import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { ProductSchema } from '@/lib/validation';
import { z } from 'zod';

export async function GET() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
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
