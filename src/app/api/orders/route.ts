import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { OrderSchema } from '@/lib/validation';
import { z } from 'zod';

export async function GET() {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderDetails = OrderSchema.parse(body);
  
  const year = new Date().getFullYear();
  const prefix = `ORD-${year}-`;
  
  const { data: existingOrders } = await supabase.from('orders').select('id').like('id', `${prefix}%`);
  let nextSeq = 1;
  if (existingOrders && existingOrders.length > 0) {
     const maxSeq = Math.max(...existingOrders.map((o: any) => parseInt(o.id.replace(prefix, ''), 10) || 0));
     if (!isNaN(maxSeq)) nextSeq = maxSeq + 1;
  }
  
  const generatedId = `${prefix}${nextSeq.toString().padStart(4, '0')}`;
  
  const newOrder = {
    ...orderDetails,
    id: generatedId,
    razorpayOrderId: orderDetails.orderId,
    paymentStatus: orderDetails.paymentStatus || 'Pending',
    dispatchStatus: 'Pending',
    date: new Date().toISOString()
  };
  
  await supabase.from('orders').insert([newOrder]);
  
  // Twilio Integration
  try {
     const sid = process.env.TWILIO_ACCOUNT_SID;
     const token = process.env.TWILIO_AUTH_TOKEN;
     const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
     
     if (sid && token && twilioPhone) {
        const client = twilio(sid, token);
        const cleanPhone = newOrder.phone.replace(/\D/g, '');

        const whatsappPayload = 
          `Hello ${newOrder.name || 'Customer'},\n\n` +
          `Your order is confirmed ✅\n\n` +
          `Order ID: ${newOrder.id}\n` +
          `Product: ${newOrder.productName}\n\n` +
          `We will contact you soon for delivery.\n\n` +
          `- Englabs Products`;

        client.messages.create({
           body: whatsappPayload,
           from: twilioPhone.startsWith('whatsapp:') ? twilioPhone : `whatsapp:${twilioPhone}`,
           to: `whatsapp:${cleanPhone}`
        }).catch((err: any) => console.error("Twilio WhatsApp Payload Error:", err));
     }
  } catch(err) {
     console.error("Twilio System Module Failure:", err);
  }

  // Nodemailer Integration
  try {
     const emailUser = process.env.EMAIL_USER;
     const emailPass = process.env.EMAIL_PASS;
     
     if (emailUser && emailPass && newOrder.email) {
       const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: emailUser,
           pass: emailPass
         }
       });

       const mailOptions = {
         from: `"AuraLock Operations" <${emailUser}>`,
         to: newOrder.email,
         subject: `Order Confirmed: ${newOrder.id} - AuraLock`,
         html: `
           <div style="font-family: -apple-system, BlinkMacSystemFont; max-width: 500px; margin: 40px auto; color: #111827; border: 1px solid #e5e7eb; border-radius: 16px; padding: 40px;">
             <h2>Order Confirmed – AuraLock</h2>
             <p>Thank you for your purchase, ${newOrder.name || 'Valued Customer'}.</p>
             <div style="background-color: #f9fafb; padding: 24px; border-radius: 12px;">
               <p><strong>Order ID:</strong> ${newOrder.id}</p>
               <p><strong>Product:</strong> ${newOrder.productName}</p>
               <p><strong>Total:</strong> ₹${newOrder.price?.toLocaleString('en-IN')}</p>
             </div>
             <p style="color: #059669; font-weight: bold;">We will contact you soon regarding hardware dispatch.</p>
           </div>
         `
       };
       transporter.sendMail(mailOptions).catch(err => console.error("Email Gateway Error:", err));
     }
  } catch(err) {
     console.error("Nodemailer System Failure:", err);
  }

  return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Order API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, dispatchStatus } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

    const { data, error } = await supabase.from('orders').update({ dispatchStatus }).eq('id', id).select();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    if (!data || data.length === 0) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    return NextResponse.json({ success: true, order: data[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}
