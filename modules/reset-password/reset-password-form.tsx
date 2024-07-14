'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { resetPassword } from '@/lib/firebase/auth/password';
import { ValidationError, ValidationFields, handleValidation } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const Schema = z.object({
  newPassword: ValidationFields.PASSWORD
});

type Props = {
  actionCode: string;
};

const ResetPasswordForm: React.FC<Props> = (props) => {
  const { actionCode } = props;

  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError<typeof Schema>>({});

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidation({
      data: { newPassword },
      schema: Schema,
      onError: setErrors,
      onSuccess: (res) => {
        resetPassword(actionCode, res.newPassword, setIsLoading, router);
        setErrors({});
      }
    });
  };

  return (
    <form className="mx-auto max-w-3xl space-y-6" onSubmit={handleSubmit} noValidate>
      <Input
        label="New password"
        name="new-password"
        type="password"
        value={newPassword}
        onChange={setNewPassword}
        error={errors.newPassword}
      />
      <Button type="submit" isLoading={isLoading}>
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
