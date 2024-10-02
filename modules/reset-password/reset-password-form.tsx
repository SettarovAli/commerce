'use client';

import Button from '@/components/button';
import Input from '@/components/input';
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
      <Button type="submit">Reset Password</Button>
    </form>
  );
};

export default ResetPasswordForm;
