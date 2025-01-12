import { decryptSession } from '@/lib/auth/session';
import { AuthorizationError } from '@/lib/errors/authorization-error';

export async function validateSession(req: Request): Promise<void> {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthorizationError('Missing or invalid Authorization header');
  }

  const session = authHeader.split(' ')[1];
  const sessionPayload = await decryptSession(session);

  if (!sessionPayload) {
    throw new AuthorizationError('Invalid or expired session token');
  }
}
