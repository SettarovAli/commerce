'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { forgotPassword } from '@/lib/firebase/auth/password';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  return (
    <form
      className="mx-auto max-w-3xl space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        forgotPassword(email, setIsLoading, router);
      }}
    >
      <Input label="Email address" name="email" value={email} onChange={setEmail} />
      <Button type="submit" disabled={isLoading}>
        Reset Password
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
