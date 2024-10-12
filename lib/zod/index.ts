import { ValidationFailureRes, ValidationSuccessRes, ZObjectType, ZodParams } from 'lib/zod/types';
import { z } from 'zod';

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

export const handleValidation = <T extends ZObjectType>(
  params: ZodParams<T>
): ValidationSuccessRes | ValidationFailureRes => {
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

export const validateFormData = (
  formData: FormData,
  schema: z.ZodSchema,
  fields: Record<string, string>
) => {
  const data = Object.keys(fields).reduce(
    (acc, key) => {
      const value = fields[key];
      if (value) acc[key] = formData.get(value);
      return acc;
    },
    {} as Record<string, unknown>
  );

  return handleValidation({
    data,
    schema
  });
};
