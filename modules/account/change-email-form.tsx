import Button from '@/components/button';
import Input from '@/components/input';
import { updateUserEmail } from '@/lib/firebase/auth/email';
import { ValidationError, ValidationFields, handleValidation } from '@/lib/zod';
import { User } from 'firebase/auth';
import { useState } from 'react';
import { z } from 'zod';

const Schema = z.object({
  email: ValidationFields.EMAIL,
  newEmail: ValidationFields.EMAIL,
  password: ValidationFields.PASSWORD
});

type ChangeEmailFormProps = {
  user: User;
};

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ user }) => {
  const [email, setEmail] = useState(user?.email as string);
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError<typeof Schema>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidation({
      data: { email, newEmail, password },
      schema: Schema,
      onError: setErrors,
      onSuccess: (res) => {
        updateUserEmail(res.email, res.newEmail, res.password, setIsLoading);
        setErrors({});
      }
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Current Email address"
        name="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <Input
        label="New Email address"
        name="new-email"
        value={newEmail}
        onChange={setNewEmail}
        error={errors.newEmail}
      />
      <Input
        label="Password"
        name="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <Button type="submit" isLoading={isLoading}>
        Change Email
      </Button>
    </form>
  );
};

export default ChangeEmailForm;
