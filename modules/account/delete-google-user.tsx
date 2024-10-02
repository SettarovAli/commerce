import Button from '@/components/button';
import { deleteGoogleUser } from '@/lib/firebase/auth/actions';
import { Routes } from '@/routes';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const DeleteGoogleUser: React.FC = () => {
  const router = useRouter();

  const handleDeleteGoogleUser = useCallback(async () => {
    const { success, notification } = await deleteGoogleUser();
    if (!success) {
      if (notification) toast.error(notification);
    } else {
      if (notification) toast.success(notification);
      router.push(Routes.SignIn);
    }
  }, [router]);

  return (
    <div className="mt-4 flex flex-col gap-4 text-sm text-gray-500">
      <Button type="button" onClick={handleDeleteGoogleUser} variant="red">
        Confirm delete
      </Button>
    </div>
  );
};

export default DeleteGoogleUser;
