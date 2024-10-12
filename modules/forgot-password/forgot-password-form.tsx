'use client';

import Input from 'components/input';
import SubmitButton from 'components/submit-button';
import { useAuthAction } from 'hooks/use-auth-action';
import { resetForgotPasswordAction } from 'lib/firebase/auth/server-actions';
import { useRouter } from 'next/navigation';
import { Routes } from 'routes';

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
      <SubmitButton>Reset Password</SubmitButton>
    </form>
  );
};

export default ForgotPasswordForm;
