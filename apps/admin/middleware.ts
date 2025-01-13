import { NextRequest, NextResponse } from 'next/server';

import { getConfig } from '@/lib/utils/get-config';
import { getSessionDataFromMiddleware, updateSessionFromMiddleware } from '@/lib/auth/session';
import { UserRole } from '@/lib/auth/types';
import { Routes } from 'routes';

const publicRoutes = [Routes.SignIn];
const adminRoutes = [Routes.Users];

export default async function middleware(req: NextRequest) {
  const { basePath } = getConfig();

  try {
    const { pathname } = req.nextUrl;

    const isPublicRoute = publicRoutes.includes(pathname as Routes);
    const isAdminRoute = adminRoutes.includes(pathname as Routes);

    const { sessionPayload } = await getSessionDataFromMiddleware(req);
    const userId = sessionPayload?.userId;
    const userRole = sessionPayload?.userRole;

    if (isPublicRoute && userId) {
      return NextResponse.redirect(new URL(`${basePath}${Routes.Home}`, req.nextUrl));
    }

    if (!isPublicRoute && !userId) {
      return NextResponse.redirect(new URL(`${basePath}${Routes.SignIn}`, req.nextUrl));
    }

    if (isAdminRoute && userRole !== UserRole.ADMIN) {
      return NextResponse.rewrite(new URL(`${basePath}${Routes.Forbidden}`, req.nextUrl), {
        status: 403
      });
    }

    const res = NextResponse.next();

    if (userId) {
      await updateSessionFromMiddleware(req, res);
    }

    return res;
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.rewrite(new URL(`${basePath}${Routes.ServerError}`, req.nextUrl), {
      status: 500
    });
  }
}

// Exclude API routes and static assets
export const config = {
  matcher: '/((?!.*\\.|api\\/).*)*'
};
