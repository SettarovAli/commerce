'use server';

import { resetForgotPassword, resetPassword, signUpUser } from '@/lib/firebase/auth/actions';
import { ValidationFields, handleValidation } from '@/lib/zod';
import { z } from 'zod';

const validateFormData = (
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

export const signInAction = async (formData: FormData) => {
  const schema = z.object({
    email: ValidationFields.EMAIL,
    password: ValidationFields.PASSWORD
  });

  const result = validateFormData(formData, schema, {
    email: 'email',
    password: 'password'
  });

  return { validation: result };
};

export const signUpAction = async (formData: FormData) => {
  const schema = z.object({
    name: ValidationFields.REQUIRED,
    email: ValidationFields.EMAIL,
    password: ValidationFields.PASSWORD
  });

  const result = validateFormData(formData, schema, {
    name: 'name',
    email: 'email',
    password: 'password'
  });

  if (!result.success) {
    return { validation: result };
  }

  const actionRes = await signUpUser(result.data.name, result.data.email, result.data.password);

  return { validation: result, actionRes };
};

export const resetForgotPasswordAction = async (formData: FormData) => {
  const schema = z.object({
    email: ValidationFields.EMAIL
  });

  const result = validateFormData(formData, schema, { email: 'email' });

  if (!result.success) {
    return { validation: result };
  }

  const actionRes = await resetForgotPassword(result.data.email);

  return { validation: result, actionRes };
};

export const resetPasswordAction = async (actionCode: string, formData: FormData) => {
  const schema = z.object({
    newPassword: ValidationFields.PASSWORD
  });

  const result = validateFormData(formData, schema, { newPassword: 'new-password' });

  if (!result.success) {
    return { validation: result };
  }

  const actionRes = await resetPassword(actionCode, result.data.newPassword);

  return { validation: result, actionRes };
};

export const updateEmailAction = async (formData: FormData) => {
  const schema = z.object({
    newEmail: ValidationFields.EMAIL,
    password: ValidationFields.PASSWORD
  });

  const result = validateFormData(formData, schema, {
    newEmail: 'new-email',
    password: 'password'
  });

  return { validation: result };
};

export const updatePasswordAction = async (formData: FormData) => {
  const schema = z.object({
    password: ValidationFields.PASSWORD,
    newPassword: ValidationFields.PASSWORD
  });

  const result = validateFormData(formData, schema, {
    password: 'password',
    newPassword: 'new-password'
  });

  return { validation: result };
};

export const deleteEmailUserAction = async (formData: FormData) => {
  const schema = z.object({
    password: ValidationFields.PASSWORD
  });

  const result = validateFormData(formData, schema, { password: 'password' });

  return { validation: result };
};
