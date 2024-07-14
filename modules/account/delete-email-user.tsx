import Button from '@/components/button';
import Input from '@/components/input';
import { deleteUserFromFirestore } from '@/lib/firebase/auth/delete-user';
import { ValidationError, ValidationFields, handleValidation } from '@/lib/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const Schema = z.object({
  password: ValidationFields.PASSWORD
});

const DeleteEmailUser: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError<typeof Schema>>({});

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidation({
      data: { password },
      schema: Schema,
      onError: setErrors,
      onSuccess: (res) => {
        deleteUserFromFirestore(router, setIsLoading, res.password);
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
        label="Password"
        name="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <Button type="submit" isLoading={isLoading} variant="red">
        Confirm delete
      </Button>
    </form>
  );
};

export default DeleteEmailUser;
