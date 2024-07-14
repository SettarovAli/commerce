import Button from '@/components/button';
import { deleteUserFromFirestore } from '@/lib/firebase/auth/delete-user';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const DeleteGoogleUser: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDeleteGoogleUser = useCallback(() => {
    deleteUserFromFirestore(router, setIsLoading);
  }, [router]);

  return (
    <div className="mt-4 flex flex-col gap-4 text-sm text-gray-500">
      <Button type="button" onClick={handleDeleteGoogleUser} isLoading={isLoading} variant="red">
        Confirm delete
      </Button>
    </div>
  );
};

export default DeleteGoogleUser;
