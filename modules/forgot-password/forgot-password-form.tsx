'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useAuthAction } from '@/hooks/use-auth-action';
import { resetForgotPasswordAction } from '@/lib/firebase/auth/server-actions';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';

const ForgotPasswordForm = () => {
  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: resetForgotPasswordAction,
    onSuccess: () => {
      router.push(Routes.SignIn);
    }
  });

  return (
    <form className="mx-auto max-w-3xl space-y-6" action={action} noValidate>
      <Input type="email" name="email" label="Email address" errors={errors.email} />
      <Button type="submit">Reset Password</Button>
    </form>
  );
};

export default ForgotPasswordForm;
