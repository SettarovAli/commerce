import Button from '@/components/button';
import Input from '@/components/input';
import { useAuthAction } from '@/hooks/use-auth-action';
import { updateUserPassword } from '@/lib/firebase/auth/actions';
import { updatePasswordAction } from '@/lib/firebase/auth/server-actions';

type Props = {
  onCloseModal: () => void;
};

const ChangePasswordForm: React.FC<Props> = (props) => {
  const { onCloseModal } = props;

  const { action, errors } = useAuthAction({
    authAction: updatePasswordAction,
    clientAction: async (data: Record<'password' | 'newPassword', string>) => {
      return await updateUserPassword(data.password, data.newPassword);
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
      <Button type="submit">Confirm password change</Button>
    </form>
  );
};

export default ChangePasswordForm;
