import { z } from 'zod';
import { ValidationFields } from '@/lib/zod';

export const createUserSchema = z.object({
  name: ValidationFields.REQUIRED,
  email: ValidationFields.EMAIL,
  password: ValidationFields.PASSWORD
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
