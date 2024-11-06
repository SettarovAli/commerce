import { z } from 'zod';
import { ValidationFields } from '@/lib/zod';

export const signInSchema = z.object({
  email: ValidationFields.EMAIL,
  password: ValidationFields.PASSWORD
});

export type SignInSchema = z.infer<typeof signInSchema>;
