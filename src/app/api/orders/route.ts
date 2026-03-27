import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.orders);
}

export async function POST(request: Request) {
  const orderDetails = await request.json();
  const db = getDB();
  
  const newOrder = {
    id: `ORD-${Date.now()}`,
    ...orderDetails,
    paymentStatus: 'Pending',
    dispatchStatus: 'Pending',
    date: new Date().toISOString()
  };
  
  db.orders.unshift(newOrder); // Add to top
  saveDB(db);
  
  return NextResponse.json({ success: true, order: newOrder });
}

export async function PUT(request: Request) {
    const { id, dispatchStatus } = await request.json();
    const db = getDB();
    const orderIndex = db.orders.findIndex((o: any) => o.id === id);
    if (orderIndex > -1) {
        db.orders[orderIndex].dispatchStatus = dispatchStatus;
        saveDB(db);
        return NextResponse.json({ success: true, order: db.orders[orderIndex] });
    }
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
}
