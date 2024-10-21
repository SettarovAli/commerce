'use server';

import bcrypt from 'bcrypt';
import { push, ref, set } from 'firebase/database';
import { db } from 'lib/firebase';
import { createSession, deleteSession } from 'lib/jwt/session';
import { FormState } from 'lib/jwt/types';
import { ValidationFields } from 'lib/zod';
import { z } from 'zod';

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  const schema = z.object({
    name: ValidationFields.REQUIRED,
    email: ValidationFields.EMAIL,
    password: ValidationFields.PASSWORD
  });

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = false;
  // const existingUser = await db.query.users.findFirst({
  //   where: eq(users.email, email)
  // });

  if (existingUser) {
    return {
      message: 'Email already exists, please use a different email or login.'
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const usersRef = ref(db, 'users');
  const newDataRef = push(usersRef);

  set(newDataRef, {
    name,
    email,
    password: hashedPassword
  });

  const user = data[0];

  if (!user) {
    return {
      message: 'An error occurred while creating your account.'
    };
  }

  const userId = user.id.toString();
  await createSession(userId);
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const schema = z.object({
    email: ValidationFields.EMAIL,
    password: ValidationFields.PASSWORD
  });

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });
  const errorMessage = { message: 'Invalid login credentials.' };

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, validatedFields.data.email)
  });

  if (!user) {
    return errorMessage;
  }

  const passwordMatch = await bcrypt.compare(validatedFields.data.password, user.password);

  if (!passwordMatch) {
    return errorMessage;
  }

  const userId = user.id.toString();
  await createSession(userId);
}

export async function logout() {
  deleteSession();
}
