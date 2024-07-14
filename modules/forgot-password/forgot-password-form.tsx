'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { forgotPassword } from '@/lib/firebase/auth/password';
import { ValidationError, ValidationFields, handleValidation } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const Schema = z.object({
  email: ValidationFields.EMAIL
});

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError<typeof Schema>>({});

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidation({
      data: { email },
      schema: Schema,
      onError: setErrors,
      onSuccess: (res) => {
        forgotPassword(res.email, setIsLoading, router);
        setEmail('');
        setErrors({});
      }
    });
  };

  return (
    <form className="mx-auto max-w-3xl space-y-6" onSubmit={handleSubmit} noValidate>
      <Input
        label="Email address"
        name="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <Button type="submit" isLoading={isLoading}>
        Reset Password
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
