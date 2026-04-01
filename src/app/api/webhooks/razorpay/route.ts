import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'dummy_webhook_secret';
    
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (expectedSignature === signature) {
      const event = JSON.parse(body);
      console.log("Razorpay Webhook Received:", event.event);

      const orderId = event.payload.payment.entity.order_id;
      const status = event.event === 'order.paid' ? 'paid' : (event.event === 'payment.captured' ? 'captured' : 'failed');

      // Update Order Status in Supabase
      if (orderId) {
        await supabase
          .from('orders')
          .update({ status: status, updated_at: new Date().toISOString() })
          .eq('id', orderId);
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
