import { JWTPayload } from 'jose';

export enum UserRole {
  VIEWER = 'viewer',
  EDITOR = 'editor',
  ADMIN = 'admin'
}

export type User = {
  createdAt: number;
  email: string;
  name: string;
  password: string;
  role: UserRole;
};

export type Session = string | undefined;

export type SessionPayload = {
  userId: string;
  userRole: UserRole;
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
