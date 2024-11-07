'use server';

import { flattenValidationErrors } from 'next-safe-action';
import { actionClient } from '@/lib/safe-action';
import { createUserSchema } from '@/lib/users/schemas';
import { UsersService } from '@/lib/users/service';

export const createUserAction = actionClient
  .schema(createUserSchema, {
    handleValidationErrorsShape: (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({ parsedInput }) => {
    const res = await UsersService.createUser(parsedInput);
    return res;
  });
