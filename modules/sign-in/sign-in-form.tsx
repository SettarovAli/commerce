'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { loginUserWithEmailAndPassword } from '@/lib/firebase/auth/email';
import { Routes } from '@/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUserWithEmailAndPassword(email, password, setIsLoading, router);
  };

  return (
    <form className="mt-10 flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
      <Input label="Email address" name="email" value={email} onChange={setEmail} />
      <Input label="Password" name="password" value={password} onChange={setPassword} />
      <Link
        href={Routes.ForgotPassword}
        className="flex justify-end self-end text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
      >
        Forgot Password
      </Link>
      <Button type="submit" disabled={isLoading}>
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
