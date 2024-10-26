'use client';

import Input from 'components/input';
import SubmitButton from 'components/submit-button';
import { useAuthAction } from 'hooks/use-auth-action';
import { signUpAction } from 'lib/firebase/auth/server-actions';
import { useRouter } from 'next/navigation';
import { Routes } from 'routes';

const SignUpForm = () => {
  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: signUpAction,
    onSuccess: () => {
      router.push(Routes.SignIn);
    }
  });

  return (
    <form className="mt-10 flex flex-col gap-4" action={action} noValidate>
      <Input type="text" name="name" label="First Name" errors={errors.name} />
      <Input type="email" name="email" label="Email address" errors={errors.email} />
      <Input type="password" name="password" label="Password" errors={errors.password} />
      <SubmitButton>Sign up</SubmitButton>
    </form>
  );
};

export default SignUpForm;
