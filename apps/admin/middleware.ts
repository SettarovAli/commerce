import { NextRequest, NextResponse } from 'next/server';
import { getSessionDataFromMiddleware, updateSessionFromMiddleware } from '@/lib/auth/session';
import { getConfig } from '@/lib/utils/get-config';
import { Routes } from 'routes';

const publicRoutes = [Routes.SignIn];

export default async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    const { basePath } = getConfig();

    const isPublicRoute = publicRoutes.includes(pathname as Routes);

    const { sessionPayload } = await getSessionDataFromMiddleware(req);
    const userId = sessionPayload?.userId;

    if (isPublicRoute && userId) {
      return NextResponse.redirect(new URL(`${basePath}${Routes.Home}`, req.nextUrl));
    }

    if (!isPublicRoute && !userId) {
      return NextResponse.redirect(new URL(`${basePath}${Routes.SignIn}`, req.nextUrl));
    }

    const res = NextResponse.next();

    if (userId) {
      await updateSessionFromMiddleware(req, res);
    }

    return res;
  } catch (error: unknown) {
    console.error(error);
  }
}

// Exclude API routes and static assets
export const config = {
  matcher: '/((?!.*\\.|api\\/).*)*'
};
