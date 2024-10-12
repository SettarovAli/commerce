import Button from 'components/button';
import { authService } from 'lib/firebase/auth/service';
import { handleAuthActionResult } from 'lib/firebase/auth/utils/handle-auth-action-result';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Routes } from 'routes';

const DeleteGoogleUser: React.FC = () => {
  const router = useRouter();

  const handleDeleteGoogleUser = useCallback(async () => {
    const authActionResult = await authService.deleteGoogleUser();
    handleAuthActionResult({
      authActionResult,
      onSuccess: () => {
        router.push(Routes.SignIn);
      }
    });
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
