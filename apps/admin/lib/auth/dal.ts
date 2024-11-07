import 'server-only';

import { cache } from 'react';
import { AuthService } from '@/lib/auth/service';

export const getCurrentUser = cache(async () => {
  try {
    const user = await AuthService.getCurrentUserData();
    if (!user) return null;

    const { password, ...sanitizedUser } = user;

    return sanitizedUser;
  } catch (error: unknown) {
    return null;
  }
});
