'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { signUpUser } from '@/lib/firebase/auth/email';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpUser(name, email, password, setIsLoading, router);
  };

  return (
    <form className="mt-10 flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
      <Input label="First Name" name="text" value={name} onChange={setName} />
      <Input label="Email address" name="email" value={email} onChange={setEmail} />
      <Input label="Password" name="password" value={password} onChange={setPassword} />
      <Button type="submit" disabled={isLoading}>
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;
