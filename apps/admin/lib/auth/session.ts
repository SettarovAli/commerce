import 'server-only';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { SessionPayload } from 'lib/auth/types';
import { Routes } from 'routes';

type Session = string | undefined;

const { JWT_SECRET_KEY } = process.env;

const key = new TextEncoder().encode(JWT_SECRET_KEY);
const SESSION_COOKIE_NAME = 'session';
const SESSION_EXPIRATION_TIME = 10 * 1000; // 10 seconds

const getSessionExpirationTime = () => new Date(Date.now() + SESSION_EXPIRATION_TIME);

const getSession = async (): Promise<Session> => {
  return (await cookies()).get(SESSION_COOKIE_NAME)?.value;
};

const setSession = async (session: string, expiresAt: Date) => {
  (await cookies()).set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
};

export const getSessionData = async (): Promise<{
  session: Session;
  sessionPayload: JWTPayload | null;
}> => {
  const session = await getSession();
  const sessionPayload = await decrypt(session);
  return { session, sessionPayload };
};

export const encrypt = async (payload: SessionPayload) => {
  const expirationTime = Math.floor(Date.now() / 1000) + SESSION_EXPIRATION_TIME / 1000;
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key);
};

export const decrypt = async (session: string = '') => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256']
    });
    return payload;
  } catch (error) {
    return null;
  }
};

export const createSession = async (userId: string) => {
  const expiresAt = getSessionExpirationTime();
  const session = await encrypt({ userId, expiresAt });
  await setSession(session, expiresAt);
};

export const verifySession = async () => {
  const { sessionPayload } = await getSessionData();
  const userId = sessionPayload?.userId;

  if (!userId || typeof userId !== 'string') {
    redirect(Routes.SignIn);
  }

  return { isAuth: true, userId };
};

export const updateSession = async () => {
  const { session, sessionPayload } = await getSessionData();

  if (!session || !sessionPayload) return;

  const expiresAt = getSessionExpirationTime();
  await setSession(session, expiresAt);
};

export const deleteSession = async () => {
  (await cookies()).delete(SESSION_COOKIE_NAME);
  redirect(Routes.SignIn);
};
