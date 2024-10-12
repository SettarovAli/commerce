'use client';

import Input from 'components/input';
import SubmitButton from 'components/submit-button';
import { useAuthAction } from 'hooks/use-auth-action';
import { signInAction } from 'lib/firebase/auth/server-actions';
import { authService } from 'lib/firebase/auth/service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Routes } from 'routes';

type AuthActionData = Record<'email' | 'password', string>;

const SignInForm = () => {
  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: signInAction,
    clientAction: async (data: AuthActionData) => {
      return await authService.signInWithEmailAndPassword(data.email, data.password);
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
      <SubmitButton>Sign In</SubmitButton>
    </form>
  );
};

export default SignInForm;
