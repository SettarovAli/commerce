'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useAuthAction } from '@/hooks/use-auth-action';
import { loginUserWithEmailAndPassword } from '@/lib/firebase/auth/actions';
import { signInAction } from '@/lib/firebase/auth/server-actions';
import { Routes } from '@/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: signInAction,
    clientAction: async (data: Record<'email' | 'password', string>) => {
      return await loginUserWithEmailAndPassword(data.email, data.password);
    },
    onSuccess: () => {
      router.push(Routes.Home);
    }
  });

  return (
    <form className="mt-10 flex flex-col gap-4" action={action} noValidate>
      <Input type="email" name="email" label="Email address" errors={errors.email} />
      <Input type="password" name="password" label="Password" errors={errors.password} />
      <Link
        href={Routes.ForgotPassword}
        className="flex justify-end self-end text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
      >
        Forgot Password
      </Link>
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default SignInForm;
