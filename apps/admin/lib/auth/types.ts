import { JWTPayload } from 'jose';

export type User = {
  createdAt: number;
  email: string;
  name: string;
  password: string;
};

export type Session = string | undefined;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export type SessionDataPayload = JWTPayload & SessionPayload;

export type SessionData = {
  session: Session;
  sessionPayload: SessionDataPayload | null;
};

export type SessionCookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  expires: Date;
  sameSite: 'lax' | 'strict' | 'none';
  path: string;
};
