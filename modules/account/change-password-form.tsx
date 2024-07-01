import Button from '@/components/button';
import Input from '@/components/input';
import { updateUserPassword } from '@/lib/firebase/auth/password';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  return (
    <form className="mt-4 flex flex-col gap-4 text-sm text-gray-500">
      Please enter your password to delete your account:
      <Input
        label="Current Password"
        name="current-password"
        value={currentPassword}
        onChange={setCurrentPassword}
        type="password"
      />
      <Input
        label="New Password"
        name="new-password"
        value={newPassword}
        onChange={setNewPassword}
        type="password"
      />
      <Button
        type="submit"
        onClick={() => updateUserPassword(currentPassword, newPassword, setIsLoading, router)}
        disabled={isLoading}
      >
        Confirm password change
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
