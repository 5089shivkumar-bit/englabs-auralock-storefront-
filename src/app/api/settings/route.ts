import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SettingsSchema } from '@/lib/validation';
import { z } from 'zod';

export async function GET() {
  try {
    const { data, error } = await supabase.from('system_settings').select('*').limit(1).maybeSingle();
    if (error || !data) {
       return NextResponse.json({ email: 'support@englabs.in', phone: '+91 98765 43210' });
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ email: 'support@englabs.in', phone: '+91 98765 43210' });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedSettings = SettingsSchema.parse(body);
    
    // Check if settings already exist
    const { data: existing } = await supabase.from('system_settings').select('id').limit(1).maybeSingle();
    
    if (existing) {
      const { error } = await supabase.from('system_settings').update(validatedSettings).eq('id', existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('system_settings').insert([validatedSettings]);
      if (error) throw error;
    }
    return NextResponse.json({ success: true, settings: validatedSettings });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
