import { ZodType, z } from 'zod';

export const ValidationMessages = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please provide a valid email',
  PASSWORD: 'Password should be at least 6 characters'
};

export const ValidationFields = {
  REQUIRED: z.string().min(1, ValidationMessages.REQUIRED).trim(),
  EMAIL: z.string().email(ValidationMessages.EMAIL).trim(),
  PASSWORD: z.string().min(6, ValidationMessages.PASSWORD).trim()
};

type ZObjectType = ZodType<Record<string, unknown>>;

type ZodParams<T extends ZObjectType> = {
  data: Record<string, unknown>;
  schema: T;
};

export const handleValidation = <T extends ZObjectType>(params: ZodParams<T>) => {
  const { data, schema } = params;

  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  return {
    success: true,
    data: validatedFields.data
  };
};
