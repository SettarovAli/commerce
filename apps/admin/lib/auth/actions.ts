'use server';

import { flattenValidationErrors } from 'next-safe-action';
import { actionClient } from '@/lib/safe-action';
import { signInSchema } from '@/lib/auth/schemas';
import { AuthService } from '@/lib/auth/service';

export const signInAction = actionClient
  .schema(signInSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput }) => {
    const res = await AuthService.signIn(parsedInput);
    return res;
  });

export const signOutAction = async () => {
  await AuthService.signOut();
};
