'use client';

import Input from '@/components/input';
import SubmitButton from '@/components/submit-button';
import { useAuthAction } from '@/hooks/use-auth-action';
import { resetPasswordAction } from '@/lib/firebase/auth/server-actions';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';

type Props = {
  actionCode: string;
};

const ResetPasswordForm: React.FC<Props> = (props) => {
  const { actionCode } = props;

  const router = useRouter();

  const { action, errors } = useAuthAction({
    authAction: resetPasswordAction.bind(null, actionCode),
    onSuccess: () => {
      router.push(Routes.SignIn);
    }
  });

  return (
    <form className="mx-auto max-w-3xl space-y-6" action={action} noValidate>
      <Input type="password" name="new-password" label="New password" errors={errors.newPassword} />
      <SubmitButton>Reset Password</SubmitButton>
    </form>
  );
};

export default ResetPasswordForm;
