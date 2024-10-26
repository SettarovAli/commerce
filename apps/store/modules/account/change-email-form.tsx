import Input from 'components/input';
import SubmitButton from 'components/submit-button';
import { useAuthAction } from 'hooks/use-auth-action';
import { updateEmailAction } from 'lib/firebase/auth/server-actions';
import { authService } from 'lib/firebase/auth/service';
import { useRouter } from 'next/navigation';
import { Routes } from 'routes';

type AuthActionData = Record<'newEmail' | 'password', string>;

const ChangeEmailForm: React.FC = () => {
  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: updateEmailAction,
    clientAction: async (data: AuthActionData) => {
      return await authService.updateEmail(data.newEmail, data.password);
    },
    onSuccess: () => {
      router.push(Routes.SignIn);
    }
  });

  return (
    <form className="flex flex-col gap-4" action={action} noValidate>
      <Input type="email" name="new-email" label="New email address" errors={errors.newEmail} />
      <Input type="password" name="password" label="Password" errors={errors.password} />
      <SubmitButton>Change Email</SubmitButton>
    </form>
  );
};

export default ChangeEmailForm;
