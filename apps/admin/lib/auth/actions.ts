'use server';

import { flattenValidationErrors } from 'next-safe-action';
import { actionClient } from '@/lib/safe-action';
import { signInSchema } from '@/lib/auth/schemas';
import { AuthService } from '@/lib/auth/service';
import { createSession } from '@/lib/auth/session';

export const signInAction = actionClient
  .schema(signInSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput }) => {
    const { userId, userData } = await AuthService.signIn(parsedInput);
    await createSession(userId);
    return { message: `Hello, ${userData.name}!` };
  });

export const signOutAction = async () => {
  await AuthService.signOut();
};
