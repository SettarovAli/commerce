import Button from '@/components/button';
import Input from '@/components/input';
import { auth } from '@/lib/firebase';
import { deleteUserFromFirestore } from '@/lib/firebase/auth/delete-user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteUserForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isEmailUser = auth?.currentUser?.providerData.some(
    (provider) => provider.providerId === 'password'
  );
  const isGoogleUser = auth?.currentUser?.providerData.some(
    (provider) => provider.providerId === 'google.com'
  );

  if (isGoogleUser) {
    return (
      <div className="mt-4 flex flex-col gap-4 text-sm text-gray-500">
        <Button
          type="button"
          onClick={() => deleteUserFromFirestore(router, false, true, setIsLoading)}
          disabled={isLoading}
          variant="red"
        >
          Confirm delete
        </Button>
      </div>
    );
  }

  if (isEmailUser) {
    return (
      <div className="mt-4 flex flex-col gap-4 text-sm text-gray-500">
        Please enter your password to delete your account:
        <Input label="Password" name="password" value={password} onChange={setPassword} />
        <Button
          type="button"
          onClick={() => deleteUserFromFirestore(router, true, false, setIsLoading, password)}
          disabled={isLoading}
          variant="red"
        >
          Confirm delete
        </Button>
      </div>
    );
  }

  return;
};

export default DeleteUserForm;
