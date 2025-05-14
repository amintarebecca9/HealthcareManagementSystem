// Cookie utility functions for managing authentication tokens
import { NextRequest } from 'next/server';

// Set a cookie
export function setCookie(name: string, value: string, days = 7) {
  if (typeof document === 'undefined') return;
  
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  
  document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict${
    process.env.NODE_ENV === 'production' ? '; Secure' : ''
  }`;
  
  // Also set in localStorage for client-side access
  localStorage.setItem(name, value);
}

// Get a cookie
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  
  const cookieString = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith(`${name}=`));
  
  return cookieString ? cookieString.split('=')[1] : undefined;
}

// Remove a cookie
export function removeCookie(name: string) {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
  
  // Also remove from localStorage
  localStorage.removeItem(name);
}

// Get a cookie from NextRequest (for middleware)
export function getCookieFromRequest(req: NextRequest, name: string): string | undefined {
  return req.cookies.get(name)?.value;
}

export default {
  setCookie,
  getCookie,
  removeCookie,
  getCookieFromRequest,
};