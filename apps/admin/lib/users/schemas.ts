import { z } from 'zod';
import { ValidationFields } from '@/lib/zod';
import { UserRole } from '@/lib/auth/types';

export const createUserSchema = z.object({
  name: ValidationFields.REQUIRED,
  email: ValidationFields.EMAIL,
  password: ValidationFields.PASSWORD,
  role: z.enum(Object.values(UserRole) as [UserRole])
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
