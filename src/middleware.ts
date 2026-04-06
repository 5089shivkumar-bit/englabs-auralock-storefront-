import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Skip protection for the admin dashboard itself since it contains the login form
    if (pathname === '/admin' || pathname === '/admin/login') {
      return NextResponse.next();
    }

    const adminToken = request.cookies.get('auralock_admin_token')?.value;
    const adminSecret = process.env.ADMIN_SECRET || '4c7e50ee-9621-408c-80ff-bc299ee3a299';

    if (adminToken !== adminSecret) {
      // Redirect to a simple login or back to home
      // For now, redirect to login if we have one, otherwise home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
