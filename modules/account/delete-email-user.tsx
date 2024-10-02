import Button from '@/components/button';
import Input from '@/components/input';
import { useAuthAction } from '@/hooks/use-auth-action';
import { deleteEmailUser } from '@/lib/firebase/auth/actions';
import { deleteEmailUserAction } from '@/lib/firebase/auth/server-actions';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';

const DeleteEmailUser: React.FC = () => {
  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: deleteEmailUserAction,
    clientAction: async (data: Record<'password', string>) => {
      return await deleteEmailUser(data.password);
    },
    onSuccess: () => {
      router.push(Routes.SignIn);
    }
  });

  return (
    <form className="mt-4 flex flex-col gap-4 text-sm text-gray-500" action={action} noValidate>
      Please enter your password to delete your account:
      <Input type="password" name="password" label="Password" errors={errors.password} />
      <Button type="submit" variant="red">
        Confirm delete
      </Button>
    </form>
  );
};

export default DeleteEmailUser;
