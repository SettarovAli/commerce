import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from 'lib/auth/session';
import { getConfig } from 'lib/utils/get-config';
import { Routes } from 'routes';

const publicRoutes = [Routes.SignIn];

export default async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    const { basePath } = getConfig();

    const isPublicRoute = publicRoutes.includes(pathname as Routes);

    const sessionCookie = (await cookies()).get('session')?.value;
    const session = await decrypt(sessionCookie);

    if (!isPublicRoute && !session?.userId) {
      return NextResponse.redirect(new URL(`${basePath}${Routes.SignIn}`, req.nextUrl));
    }

    return NextResponse.next();
  } catch (error: unknown) {
    console.error(error);
  }
}

// Exclude API routes and static assets
export const config = {
  matcher: '/((?!.*\\.|api\\/).*)*'
};
