import Button from '@/components/button';
import Input from '@/components/input';
import { useAuthAction } from '@/hooks/use-auth-action';
import { updateUserEmail } from '@/lib/firebase/auth/actions';
import { updateEmailAction } from '@/lib/firebase/auth/server-actions';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';

const ChangeEmailForm: React.FC = () => {
  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: updateEmailAction,
    clientAction: async (data: Record<'newEmail' | 'password', string>) => {
      return await updateUserEmail(data.newEmail, data.password);
    },
    onSuccess: () => {
      router.push(Routes.SignIn);
    }
  });

  return (
    <form className="flex flex-col gap-4" action={action} noValidate>
      <Input type="email" name="new-email" label="New email address" errors={errors.newEmail} />
      <Input type="password" name="password" label="Password" errors={errors.password} />
      <Button type="submit">Change Email</Button>
    </form>
  );
};

export default ChangeEmailForm;
