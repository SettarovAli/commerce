'use server';

import { authService } from 'lib/firebase/auth/service';
import { ValidationFields, validateFormData } from 'lib/zod';
import { z } from 'zod';

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

  const { name, email, password } = result.data as {
    name: string;
    email: string;
    password: string;
  };

  const actionRes = await authService.signUp(name, email, password);

  return { validation: result, actionRes };
};

export const resetForgotPasswordAction = async (formData: FormData) => {
  const schema = z.object({
    email: ValidationFields.EMAIL
  });

  const result = validateFormData(formData, schema, {
    email: 'email'
  });

  if (!result.success) {
    return { validation: result };
  }

  const { email } = result.data as {
    email: string;
  };

  const actionRes = await authService.resetForgotPassword(email);

  return { validation: result, actionRes };
};

export const resetPasswordAction = async (actionCode: string, formData: FormData) => {
  const schema = z.object({
    newPassword: ValidationFields.PASSWORD
  });

  const result = validateFormData(formData, schema, {
    newPassword: 'new-password'
  });

  if (!result.success) {
    return { validation: result };
  }

  const { newPassword } = result.data as {
    newPassword: string;
  };

  const actionRes = await authService.resetPassword(actionCode, newPassword);

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

  const result = validateFormData(formData, schema, {
    password: 'password'
  });

  return { validation: result };
};
