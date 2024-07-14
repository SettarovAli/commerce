'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { signUpUser } from '@/lib/firebase/auth/email';
import { ValidationError, ValidationFields, handleValidation } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const Schema = z.object({
  email: ValidationFields.EMAIL,
  password: ValidationFields.PASSWORD,
  name: ValidationFields.REQUIRED
});

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError<typeof Schema>>({});

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidation({
      data: { name, email, password },
      schema: Schema,
      onError: setErrors,
      onSuccess: (res) => {
        signUpUser(res.name, res.email, res.password, setIsLoading, router);
        setErrors({});
      }
    });
  };

  return (
    <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <Input
        label="First Name"
        name="username"
        value={name}
        onChange={setName}
        error={errors.name}
      />
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
      <Button type="submit" isLoading={isLoading}>
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;
