import { Routes } from '@/routes';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;

  try {
    if (pathname === Routes.AuthAction) {
      const mode = searchParams.get('mode');
      switch (mode) {
        case 'resetPassword':
          return NextResponse.redirect(new URL(`${Routes.ResetPassword}${search}`, request.url));
        case 'verifyEmail':
          return NextResponse.redirect(new URL(`${Routes.VerifyEmail}${search}`, request.url));
        case 'recoverEmail':
          return NextResponse.redirect(new URL(`${Routes.RecoverEmail}${search}`, request.url));
        default:
          break;
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
