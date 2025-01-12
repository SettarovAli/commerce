'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';

import { Form } from '@/components/ui/form';
import { SubmitButton } from '@/components/common/form/submit-button';
import { InputField } from '@/components/common/form/input-field';
import { signInAction } from '@/lib/auth/actions';
import { signInSchema } from '@/lib/auth/schemas';
import { Routes } from 'routes';

const SignInForm = () => {
  const router = useRouter();

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    signInAction,
    zodResolver(signInSchema),
    {
      formProps: {
        defaultValues: { email: '', password: '' }
      },
      actionProps: {
        onSuccess: () => {
          router.push(Routes.Home);
        },
        onError: ({ error }) => {
          toast.error(error.serverError);
        }
      }
    }
  );

  return (
    <Form {...form}>
      <form
        className="mx-auto flex w-3/4 max-w-[400px] flex-col gap-4"
        onSubmit={handleSubmitWithAction}
        noValidate
      >
        <InputField type="email" label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />
        <SubmitButton loading={action.isExecuting}>Sign In</SubmitButton>
      </form>
    </Form>
  );
};

export default SignInForm;
