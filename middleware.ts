import { Routes } from '@/routes';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;

  try {
    if (pathname === Routes.AuthAction) {
      const mode = searchParams.get('mode');
      if (mode === 'resetPassword') {
        return NextResponse.redirect(new URL(`${Routes.ResetPassword}${search}`, request.url));
      }
      if (mode === 'verifyEmail') {
        return NextResponse.redirect(new URL(`${Routes.VerifyEmail}${search}`, request.url));
      }
      if (mode === 'recoverEmail') {
        return NextResponse.redirect(new URL(`${Routes.RecoverEmail}${search}`, request.url));
      }
    }
  } catch (error: any) {
    console.error(error);
  }
}

// Exclude API routes and static assets
export const config = {
  matcher: '/((?!.*\\.|api\\/).*)*'
};
