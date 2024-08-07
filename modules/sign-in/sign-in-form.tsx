'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { loginUserWithEmailAndPassword } from '@/lib/firebase/auth/email';
import { ValidationError, ValidationFields, handleValidation } from '@/lib/zod';
import { Routes } from '@/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const Schema = z.object({
  email: ValidationFields.EMAIL,
  password: ValidationFields.PASSWORD
});

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError<typeof Schema>>({});

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidation({
      data: { email, password },
      schema: Schema,
      onError: setErrors,
      onSuccess: (res) => {
        loginUserWithEmailAndPassword(res.email, res.password, setIsLoading, router);
        setErrors({});
      }
    });
  };

  return (
    <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <Input
        label="Email address"
        name="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <Input
        label="Password"
        name="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <Link
        href={Routes.ForgotPassword}
        className="flex justify-end self-end text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
      >
        Forgot Password
      </Link>
      <Button type="submit" isLoading={isLoading}>
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
