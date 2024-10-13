import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import type { SessionPayload } from 'lib/jwt/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const { JWT_SECRET_KEY } = process.env;

const key = new TextEncoder().encode(JWT_SECRET_KEY);

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
};

export const decrypt = async (session: string | undefined = '') => {
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
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });

  redirect('/dashboard');
};

export const verifySession = async () => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { isAuth: true, userId: Number(session.userId) };
};

export const updateSession = async () => {
  const session = cookies().get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/'
  });
};

export const deleteSession = () => {
  cookies().delete('session');
  redirect('/login');
};
