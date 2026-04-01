import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderDetails } = await request.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 1. Log the successful payment in Supabase
      // Assuming we have an 'orders' table
      const { error } = await supabase
        .from('orders')
        .insert([{
          id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          status: 'paid',
          customer_name: orderDetails?.name,
          customer_phone: orderDetails?.phone,
          address: orderDetails?.address,
          product_id: orderDetails?.productId,
          amount: orderDetails?.amount,
          created_at: new Date().toISOString()
        }]);

      if (error) {
         console.error("Supabase Order Log Error:", error);
         // Still return success to client if payment was real but logging failed
      }

      return NextResponse.json({ success: true, message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Invalid payment signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
