import Input from 'components/input';
import SubmitButton from 'components/submit-button';
import { useAuthAction } from 'hooks/use-auth-action';
import { deleteEmailUserAction } from 'lib/firebase/auth/server-actions';
import { authService } from 'lib/firebase/auth/service';
import { useRouter } from 'next/navigation';
import { Routes } from 'routes';

type AuthActionData = Record<'password', string>;

const DeleteEmailUser: React.FC = () => {
  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: deleteEmailUserAction,
    clientAction: async (data: AuthActionData) => {
      return await authService.deleteEmailUser(data.password);
    },
    onSuccess: () => {
      router.push(Routes.SignIn);
    }
  });

  return (
    <form className="mt-4 flex flex-col gap-4 text-sm text-gray-500" action={action} noValidate>
      Please enter your password to delete your account:
      <Input type="password" name="password" label="Password" errors={errors.password} />
      <SubmitButton variant="red">Confirm delete</SubmitButton>
    </form>
  );
};

export default DeleteEmailUser;
