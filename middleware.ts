import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { Routes } from 'routes';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup', '/'];

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

    const isProtectedRoute = protectedRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.includes(pathname);

    // 3. Decrypt the session from the cookie
    const cookie = cookies().get('session')?.value;
    const session = await decrypt(cookie);

    // 4. Redirect
    if (isProtectedRoute && !session?.userId) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (isPublicRoute && session?.userId && !request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    return NextResponse.next();
  } catch (error: any) {
    console.error(error);
  }
}

// Exclude API routes and static assets
export const config = {
  matcher: '/((?!.*\\.|api\\/).*)*'
};
