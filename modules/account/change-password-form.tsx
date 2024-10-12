import Input from 'components/input';
import SubmitButton from 'components/submit-button';
import { useAuthAction } from 'hooks/use-auth-action';
import { updatePasswordAction } from 'lib/firebase/auth/server-actions';
import { authService } from 'lib/firebase/auth/service';

type Props = {
  onCloseModal: () => void;
};

type AuthActionData = Record<'password' | 'newPassword', string>;

const ChangePasswordForm: React.FC<Props> = (props) => {
  const { onCloseModal } = props;

  const { action, errors } = useAuthAction({
    authAction: updatePasswordAction,
    clientAction: async (data: AuthActionData) => {
      return await authService.updatePassword(data.password, data.newPassword);
    },
    onSuccess: () => {
      onCloseModal();
    }
  });

  return (
    <form className="mt-4 flex flex-col gap-4 text-sm text-gray-500" action={action} noValidate>
      Please enter your password to delete your account:
      <Input type="password" name="password" label="Current Password" errors={errors.password} />
      <Input type="password" name="new-password" label="New Password" errors={errors.newPassword} />
      <SubmitButton>Confirm password change</SubmitButton>
    </form>
  );
};

export default ChangePasswordForm;
