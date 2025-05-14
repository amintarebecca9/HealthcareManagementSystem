import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookieFromRequest } from './lib/cookies';

export function middleware(request: NextRequest) {
  // Get authentication data from cookies
  const token = getCookieFromRequest(request, 'token') || '';
  const userRole = getCookieFromRequest(request, 'userRole') || '';
  const path = request.nextUrl.pathname;

  // Check if the user is trying to access protected routes
  if (path.startsWith('/admin') || 
      path.startsWith('/doctor') || 
      path.startsWith('/patient') || 
      path.startsWith('/staff')) {
    
    // If not authenticated, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Role-based access control
    if (path.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
    }
    
    if (path.startsWith('/doctor') && userRole !== 'doctor') {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
    }
    
    if (path.startsWith('/patient') && userRole !== 'patient') {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
    }
    
    if (path.startsWith('/staff') && userRole !== 'staff') {
      return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
    }
  }
  
  // If trying to access login/register while logged in
  if ((path === '/login' || path === '/register') && token) {
    const userRoleValue = userRole || 'patient';  // Default to patient if role not found
    return NextResponse.redirect(new URL(`/${userRoleValue}/dashboard`, request.url));
  }

  return NextResponse.next();
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/admin/:path*',
    '/doctor/:path*',
    '/patient/:path*',
    '/staff/:path*',
    '/login',
    '/register',
  ],
};