'use client';

import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';

import { Form } from '@/components/ui/form';
import { SubmitButton } from '@/components/common/form/submit-button';
import { InputField } from '@/components/common/form/input-field';
import { createUserAction } from '@/lib/users/actions';
import { createUserSchema } from '@/lib/users/schemas';

const CreateUserForm = () => {
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createUserAction,
    zodResolver(createUserSchema),
    {
      formProps: {
        defaultValues: { name: '', email: '', password: '' }
      },
      actionProps: {
        onSuccess: ({ data }) => {
          toast.success(data?.message);
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
        className="flex max-w-[400px] flex-col gap-4"
        onSubmit={handleSubmitWithAction}
        noValidate
      >
        <InputField type="text" label="Name" name="name" />
        <InputField type="email" label="Email" name="email" />
        <InputField type="password" label="Password" name="password" />
        <SubmitButton loading={action.isExecuting}>Create user</SubmitButton>
      </form>
    </Form>
  );
};

export { CreateUserForm };
