import 'server-only';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { cache } from 'react';
import { SignJWT, jwtVerify } from 'jose';
import {
  Session,
  SessionPayload,
  SessionDataPayload,
  SessionData,
  SessionCookieOptions
} from 'lib/auth/types';
import { Routes } from 'routes';

const { JWT_SECRET_KEY } = process.env;

const key = new TextEncoder().encode(JWT_SECRET_KEY);
const SESSION_COOKIE_NAME = 'session';
const SESSION_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day

const getSessionExpirationTime = (): Date => new Date(Date.now() + SESSION_EXPIRATION_TIME);

const getSession = async (): Promise<Session> => {
  return (await cookies()).get(SESSION_COOKIE_NAME)?.value;
};

const getSessionFromMiddleware = (req: NextRequest): Session => {
  return req.cookies.get(SESSION_COOKIE_NAME)?.value as Session;
};

const getSessionCookieOptions = (expiresAt?: Date): SessionCookieOptions => ({
  httpOnly: true,
  secure: true,
  expires: expiresAt || getSessionExpirationTime(),
  sameSite: 'lax',
  path: '/'
});

const setSession = async (session: string, expiresAt?: Date): Promise<void> => {
  const options = getSessionCookieOptions(expiresAt);
  (await cookies()).set(SESSION_COOKIE_NAME, session, options);
};

const setSessionFromMiddleware = (res: NextResponse, session: string, expiresAt?: Date): void => {
  const options = getSessionCookieOptions(expiresAt);
  res.cookies.set(SESSION_COOKIE_NAME, session, options);
};

export const encrypt = async (payload: SessionPayload): Promise<string> => {
  const expirationTime = Math.floor(Date.now() / 1000) + SESSION_EXPIRATION_TIME / 1000;
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key);
};

export const decrypt = async (session: string = ''): Promise<SessionDataPayload | null> => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256']
    });
    return payload as SessionDataPayload;
  } catch (error) {
    return null;
  }
};

export const getSessionData = async (): Promise<SessionData> => {
  const session = await getSession();
  const sessionPayload = await decrypt(session);
  return { session, sessionPayload };
};

export const getSessionDataFromMiddleware = async (req: NextRequest): Promise<SessionData> => {
  const session = getSessionFromMiddleware(req);
  const sessionPayload = await decrypt(session);
  return { session, sessionPayload };
};

export const createSession = async (userId: string): Promise<void> => {
  const expiresAt = getSessionExpirationTime();
  const session = await encrypt({ userId, expiresAt });
  await setSession(session, expiresAt);
};

export const createSessionFromMiddleware = async (
  res: NextResponse,
  userId: string
): Promise<void> => {
  const expiresAt = getSessionExpirationTime();
  const session = await encrypt({ userId, expiresAt });
  setSessionFromMiddleware(res, session, expiresAt);
};

export const verifySession = cache(async (): Promise<SessionDataPayload> => {
  const { sessionPayload } = await getSessionData();
  const userId = sessionPayload?.userId;

  if (!userId) {
    redirect(Routes.SignIn);
  }

  return sessionPayload;
});

export const updateSession = async (): Promise<void> => {
  const { session, sessionPayload } = await getSessionData();
  const userId = sessionPayload?.userId;
  if (!session || !userId) return;
  await createSession(userId);
};

export const updateSessionFromMiddleware = async (
  req: NextRequest,
  res: NextResponse
): Promise<void> => {
  const { session, sessionPayload } = await getSessionDataFromMiddleware(req);
  const userId = sessionPayload?.userId;
  if (!session || !userId) return;
  await createSessionFromMiddleware(res, sessionPayload.userId);
};

export const deleteSession = async (): Promise<never> => {
  (await cookies()).delete(SESSION_COOKIE_NAME);
  redirect(Routes.SignIn);
};
