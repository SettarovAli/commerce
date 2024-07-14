import Button from '@/components/button';
import Input from '@/components/input';
import { updateUserPassword } from '@/lib/firebase/auth/password';
import { ValidationError, ValidationFields, handleValidation } from '@/lib/zod';
import { useState } from 'react';
import { z } from 'zod';

const Schema = z.object({
  currentPassword: ValidationFields.PASSWORD,
  newPassword: ValidationFields.PASSWORD
});

type Props = {
  onCloseModal: () => void;
};

const ChangePasswordForm: React.FC<Props> = (props) => {
  const { onCloseModal } = props;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError<typeof Schema>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidation({
      data: { currentPassword, newPassword },
      schema: Schema,
      onError: setErrors,
      onSuccess: (res) => {
        updateUserPassword(res.currentPassword, res.newPassword, setIsLoading, onCloseModal);
        setErrors({});
      }
    });
  };

  return (
    <form
      className="mt-4 flex flex-col gap-4 text-sm text-gray-500"
      onSubmit={handleSubmit}
      noValidate
    >
      Please enter your password to delete your account:
      <Input
        label="Current Password"
        name="password"
        value={currentPassword}
        onChange={setCurrentPassword}
        type="password"
        error={errors.currentPassword}
      />
      <Input
        label="New Password"
        name="new-password"
        value={newPassword}
        onChange={setNewPassword}
        type="password"
        error={errors.newPassword}
      />
      <Button type="submit" isLoading={isLoading}>
        Confirm password change
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
